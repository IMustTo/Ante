<template>
<div class="page">
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

  <cell-title v-show="stars.length">我的自定义星</cell-title>
  <cell-wapper v-show="stars.length">
    <template v-for="(star, index) in stars">
      <star-custom
        @tapEvt="applyStar"
        :id="index"
        :icon="star.icon"
        :img="star.imageUrl"
        :canApply="star.canApply"
        :name="star.name"
        :count="star.count">
      </star-custom>
    </template>
  </cell-wapper>

  <cell-wapper>
    <cell-access name="审批纪录"></cell-access>
  </cell-wapper>

  <p class="weui-btn-area">
    <weui-btn name="创建自定义星" @tapEvt="$router.push('/CustomStar')"></weui-btn>
  </p>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import CellFiller from '../components/cell/CellFiller';
import StarCustom from '../components/star/StarCustom';

export default {
  name: 'custom-star-assess',
  components: {
    CellFiller,
    StarCustom,
  },

  data() {
    return {
      stars: [
        // { icon: 'gold', name: '海洋金星', count: 2 },
        // { icon: 'all', name: '海洋全能星', count: 1 },
        // { icon: 'silver', name: '海洋银星', count: 1 },
      ],
    };
  },

  computed: {
    ...mapGetters({
      student: 'getCheckedChild',
      children: 'getChildren',
    }),
  },

  created() {
    // 第一次进入查询孩子，设置
    if (!this.student || !this.student.orgId) {
      this.loadChild()
        .then(({ resultBean }) => {
          this.initChild(resultBean);
        });
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
    // 选择孩子页面
    selectStd() {
      this.$router.push('/SelectMyChild');
    },

    // 查询自定义星纪录
    loadStarRecords() {
      if (this.student.orgId) {
        this.$http.post('core/evaluestar/starCustom/findListByStuOrgId', {
          stuOrgId: this.student.orgId,
          pageSize: 999,
          currentPage: 1,
        }).then(res => res.json())
        .then(({ resultBean }) => {
          const resultList = resultBean ? resultBean.resultList : [];
          this.stars = resultList.map((item) => {
            if (!item.imageUrl) {
              item.icon = 'zdy';
            }

            if (item.status === '106') {
              item.count = 1;
            }

            if (item.status === '102') {
              item.canApply = true;
            }

            return item;
          });
        });
      }
    },

    // 申请得星
    applyStar(index) {
      const { id } = this.stars[index];
      this.$router.push(`/CustomStarGet/${id}`);
    },
  },

  beforeRouteEnter(to, from, next) {
    next(vm => vm.loadStarRecords());
  },
  watch: {
    student() {
      this.loadStarRecords();
    },
  },
};
</script>
