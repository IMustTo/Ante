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

  <cell-title>我的自定义星</cell-title>
  <cell-wapper>
    <template v-show="stars.length" v-for="(star, index) in stars">
      <star-custom
        @tapEvt="applyStar"
        :id="index"
        :icon="star.icon"
        :img="star.imageUrl"
        :canApply="star.canApply"
        :name="star.name"
        :btnName="star.statusName"
        :count="star.count">
      </star-custom>
    </template>
    <empty-cell v-show="!stars.length">您还没有自定义星</empty-cell>
  </cell-wapper>

<!--   <cell-wapper>
    <cell-access name="审批纪录"></cell-access>
  </cell-wapper> -->

  <p class="weui-btn-area">
    <weui-btn name="创建自定义星" @tapEvt="$router.push('/CustomStar')"></weui-btn>
  </p>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import CellFiller from '../components/cell/CellFiller';
import StarCustom from '../components/star/StarCustom';
import EmptyCell from '../components/cell/EmptyCell';

export default {
  name: 'custom-star-assess',
  components: {
    CellFiller,
    StarCustom,
    EmptyCell,
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

            switch (item.status) {
              case '102':
              case '105':
                item.canApply = true;
                item.statusName = '申请得星';
                break;
              case '103':
                item.canApply = true;
                item.statusName = '重新申请';
                break;
              case '104':
                item.statusName = '待审批';
                break;
              case '106':
                item.count = 1;
                break;
              case '107':
                item.statusName = '被撤销';
                break;
              case '108':
                item.statusName = '已兑换';
                break;
              default:
            }

            return item;
          });
        });
      }
    },

    // 申请得星
    applyStar(index) {
      const { id, status } = this.stars[index];
      if (status === '103') {
        this.$router.push(`/CustomStar?oldId=${id}`);
      } else {
        this.$router.push(`/CustomStarGet/${id}`);
      }
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
