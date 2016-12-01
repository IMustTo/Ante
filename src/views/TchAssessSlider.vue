<template>
  <right-slider @tapEvt="$router.go(-1)">
    <bottom-fix>

      <template v-for="list in group">
        <cell-title :title="list.title"></cell-title>

        <cell-wapper>
          <template v-for="star in list.stars">
            <star-item
              @changeEvt="change"
              :id="star.id"
              :desc="star.desc">
            </star-item>
          </template>
        </cell-wapper>
      </template>

      <cell-title title="评价"></cell-title>
      <weui-textarea placeholder="写一下评语（非必填）"
        @inputEvt="comment">
      </weui-textarea>

      <weui-toast v-if="showSuc">评价成功</weui-toast>

      <area-center slot="bottom">
        <weui-btn mini
          :disabled="!canCommit"
          @tapEvt="saveAssess">提交</weui-btn>
      </area-center>

    </bottom-fix>
  </right-slider>
</template>

<script>
import { mapGetters } from 'vuex';
import BottomFix from '../components/layout/BottomFix';
import RightSlider from '../components/layout/RightSlider';

import AreaCenter from '../components/area/AreaCenter';
import StarItem from '../components/list/StarItem';
import WeuiTextarea from '../components/input/WeuiTextarea';

import WeuiToast from '../components/toast/WeuiToast';

export default {
  components: {
    BottomFix,
    RightSlider,
    AreaCenter,
    WeuiTextarea,
    StarItem,
    WeuiToast,
  },

  data() {
    return {
      // 评价项 [{ title: '', stars: [{ id: 1, desc: '' }] }],
      group: [],

      // 打星的评价id [1]
      starItems: [],

      showSuc: false,
      timeout: null,

      commentContent: '',
    };
  },

  computed: {
    ...mapGetters({
      assessType: 'getCheckedAssess',
      students: 'getCheckedStudents',
    }),

    canCommit() {
      return (
        this.assessType &&
        this.assessType.type &&
        this.students &&
        this.students.length &&
        this.starItems &&
        this.starItems.length
      );
    },
  },

  created() {
    this.loadAssessItems();
  },

  methods: {
    // 查询点评项
    loadAssessItems() {
      this.$http
        .post('core/evaluestar/standard/findList', {
          type: this.assessType.type,
        })
        .then(response => response.json())
        .then(({ resultBean }) => {
          this.setGroupByRes(resultBean);
        });
    },

    // 把查出来的点评项封装成合适的数据
    setGroupByRes(res) {
      const group = [];
      const typeMap = Object.create(null); // { 101: 0 }, type对应groupItem的index

      res.forEach(({ id, type, name, content }) => {
        if (!isNaN(typeMap[type])) {
          group[typeMap[type]].stars.push({ id, desc: content });
        } else {
          // 当前的长度就是下一个的index
          typeMap[type] = group.length;

          group.push({
            title: name,
            stars: [{ id, desc: content }],
          });
        }
      });

      this.group = group;
    },

    // 选中或者取消一颗星星
    change(id, checked) {
      if (checked) {
        this.starItems.push(id);
      } else {
        this.starItems.splice(this.starItems.indexOf(id), 1);
      }
    },

    // 评论
    comment(value) {
      this.commentContent = value;
    },

    // 保存评价
    saveAssess() {
      // const req = new FormData();
      // this.starItems.forEach(item => req.append('standardIdList', item));
      // this.students.forEach(item => req.append('studentOrgList', item));

      // const req = `standardIdList=
      // ${this.starItems.join('&standardIdList=')}&studentOrgList=
      // ${this.students.join('&studentOrgList=')}`;

      // this.$http
      //   .post('core/evaluestar/saveEvalueStar{?standardIdList*}{&studentOrgList*}', {}, {
      //     params: {
      //       standardIdList: this.starItems,
      //       studentOrgList: this.students,
      //     },
      //   })
      //   .then(() => {
      //     this.tipSuccess();
      //   });

      // this.$resource('core/evaluestar/saveEvalueStar{?standardIdList*}{&studentOrgList*}')
      //   .save({
      //     standardIdList: this.starItems,
      //     studentOrgList: this.students,
      //   }, {}).then(() => {
      //     this.tipSuccess();
      //   });
      this.$http
        .post('core/evaluestar/saveEvalueStar', {
          standardIdList: this.starItems,
          studentOrgList: this.students,
        })
        .then(() => {
          this.tipSuccess();
        });
    },

    tipSuccess() {
      this.showSuc = true;

      this.timeout = setTimeout(() => {
        this.leave();
      }, 1500);
    },

    leave() {
      if (this.timeout) {
        this.showSuc = false;
        clearTimeout(this.timeout);
        this.timeout = null;
      }

      this.$router.go(-1);
    },
  },
};
</script>

<style>

</style>
