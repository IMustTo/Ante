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
              :checked="star.checked"
              :desc="star.desc">
            </star-item>
          </template>
        </cell-wapper>
      </template>

      <cell-title title="评价"></cell-title>
      <weui-textarea placeholder="写一下评语（非必填）" icon
        @tapcamera="selectImg"
        @inputEvt="comment">

        <image-cell slot="images"
          @deleteEvt="deleteImg"
          :images="images"></image-cell>
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
import ImageCell from '../components/image/ImageCell';
import uploadImg from '../mixins/wx.uploadImg';

export default {
  components: {
    BottomFix,
    RightSlider,
    AreaCenter,
    WeuiTextarea,
    StarItem,
    ImageCell,
  },

  mixins: [uploadImg],

  data() {
    return {
      // 评价项 [{ title: '', stars: [{ id: 1, desc: '' }] }],
      group: [],

      // 打星的评价id [1]
      starItems: [],
      // 评论
      commentContent: '',
      // 附件
      images: [],

      showSuc: false,
      timeout: null,

    };
  },

  computed: {
    ...mapGetters({
      assessType: 'getCheckedAssess',
      students: 'getCheckedStudents',
    }),

    canCommit() {
      return (
        // this.assessType &&
        // this.assessType.type &&
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
      let req = this.assessType.type === '0'
        ? { evalueType: '101' }
        : { type: this.assessType.type };

      if (/ketang/.test(this.$route.fullPath)) {
        req = { evalueType: '106' };
      }

      this.$http
        .post('core/evaluestar/standard/findList', req)
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
          group[typeMap[type]].stars.push({ id, desc: content, checked: false });
        } else {
          // 当前的长度就是下一个的index
          typeMap[type] = group.length;

          group.push({
            title: name,
            stars: [{ id, desc: content, checked: false }],
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

    // 选择图片
    selectImg() {
      this.uploadImg({ max: 9 })
        .then(({ resultBean = [] }) => {
          this.images = this.images.concat(resultBean);
        });
    },
    // 删除一张图片
    deleteImg(index) {
      this.images.splice(index, 1);
    },

    // 保存评价
    saveAssess() {
      const attachIdList = [];
      this.images.forEach(item => attachIdList.push(item.id));

      this.$http
        .post('core/evaluestar/saveEvalueStar', {
          standardIdList: this.starItems,
          studentOrgList: this.students,
          evalueRemark: this.commentContent,
          attachIdList,
        })
        .then(() => {
          this.tipSuccess();
        });
    },

    // 成功提示
    tipSuccess() {
      this.showSuc = true;

      this.timeout = setTimeout(() => {
        this.leave();
      }, 1500);
    },

    // 返回评价选择页
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
