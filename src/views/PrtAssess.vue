<template>
<div class="page">
  <bottom-fix>
    <cell-wapper>
      <cell-access name="学生"
        v-if="children.length > 1"
        :caption="student.studentName"
        @tapEvt="selectStd">
      </cell-access>
      <cell-base name="学生"
        v-if="children.length < 2"
        :caption="student.studentName">
      </cell-base>
    </cell-wapper>
    <cell-title title="家庭评价"></cell-title>
    <cell-wapper>
      <template v-for="star in items">
        <star-item
          @changeEvt="change"
          :id="star.id"
          :desc="star.content">
        </star-item>
      </template>
    </cell-wapper>

    <cell-title tip>每个家庭每个评价周期可以给自己家孩子评<span class="ante-red-word">5</span>颗星，剩余<span class="ante-red-word">{{ maxStar }}</span>颗星</cell-title>

    <weui-toast icon="anteicon icon-gantanhao"
      v-if="maxStar === 0">评价机会已用完</weui-toast>

    <area-center slot="bottom">
      <weui-btn mini
        :disabled="!canSubmit"
        @tapEvt="submit">提交</weui-btn>
    </area-center>
  </bottom-fix>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import BottomFix from '../components/layout/BottomFix';
import AreaCenter from '../components/area/AreaCenter';
import StarItem from '../components/list/StarItem';

export default {
  name: 'prt-assess',
  components: {
    BottomFix,
    AreaCenter,
    StarItem,
  },

  data() {
    return {
      items: [
        // { id: 1, content: '生活自理', checked: false },
        // { id: 2, content: '讲究卫生', checked: false },
        // { id: 3, content: '分担家务', checked: false },
        // { id: 4, content: '生活规律', checked: false },
      ],

      maxStar: 5,

      showSuc: false,
    };
  },

  computed: {
    ...mapGetters({
      student: 'getCheckedChild',
      children: 'getChildren',
    }),

    canSubmit() {
      return (
        this.student &&
        this.student.orgId &&
        this.items.some(item => item.checked) &&
        this.items.filter(item => item.checked).length <= this.maxStar
      );
    },
  },

  created() {
    if (!this.student || !this.student.orgId) {
      this.loadChild()
        .then(({ resultBean }) => this.initChild(resultBean))
        .then(() => {
          this.loadListByStd()
            .then(res => this.countStar(res));
        });

      this.loadAssessItems();
    }
  },

  methods: {
    ...mapActions([
      'setChildOrg',
      'checkOneChild',
    ]),

    // 查询孩子
    loadChild() {
      return this.$http.post('system/user/findChildByOperatorId', {
        rootOrgId: WECHAT_CONFIG.currentRootOrgId,
        operatorId: WWW_CONFIG.loginUser.operatorId,
      })
      .then(response => response.json());
    },
    // 首次设置孩子
    initChild(children) {
      this.setChildOrg({ children });
      if (children.length) this.checkOneChild({ child: children[0] });
    },
    // 选择孩子
    selectStd() {
      this.$router.push('/SelectMyChild');
    },

    // 查询得星纪录
    loadListByStd() {
      return this.$http.post('core/evaluestar/starrecord/findListCurrMonth', {
        studentOrg: this.student.orgId,
      }).then(res => res.json());
    },
    // 计算星星数
    countStar({ resultBean = [] }) {
      this.maxStar = 5 - resultBean.length;
    },

    // 查询点评项
    loadAssessItems() {
      this.$http
        .post('core/evaluestar/standard/findList', {
          evalueType: this.$route.params.id,
        })
        .then(response => response.json())
        .then(({ resultBean = [] }) => {
          this.items = resultBean.map((item) => {
            item.checked = false;
            return item;
          });
        });
    },

    // 选择一颗星星
    change(id, checked) {
      this.items.some((item, i) => {
        if (item.id === id) {
          this.items[i].checked = checked;
          return true;
        }

        return false;
      });
    },

    // 提交评价
    submit() {
      const starItems = [];
      this.items.forEach((item) => {
        if (item.checked) {
          starItems.push(item.id);
        }
      });

      this.$http.post('core/evaluestar/saveEvalueStar', {
        standardIdList: starItems,
        studentOrgList: this.student.orgId,
      })
      .then(res => res.json())
      .then(({ resultCode }) => {
        if (resultCode === 'JSPE-200') {
          this.$router.replace('/AssessSuc');
        }
      });
    },
  },

  // 切换路由params更改状态
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (vm.student.orgId) {
        vm.loadListByStd()
          .then(res => vm.countStar(res));
        vm.loadAssessItems();
      }
    });
  },
};
</script>
