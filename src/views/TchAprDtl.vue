<template>
<div class="page">
  <bottom-fix>
    <cell-wapper>
      <cell-base name="学生"
        :caption="student.name">
      </cell-base>
      <cell-base name="星星名称"
        :caption="star.name">
      </cell-base>
    </cell-wapper>

    <cell-title title="评价标准"></cell-title>
    <cell-wapper>
      <template v-for="item in benchmarks">
        <cell-base :name="item"></cell-base>
      </template>
    </cell-wapper>

    <cell-title v-show="reason" title="创建原因"></cell-title>
    <cell-wapper v-show="reason">
      <cell-base :name="reason"></cell-base>
    </cell-wapper>
    <cell-title tip>本审批需要班主任操作</cell-title>

    <area-center slot="bottom">
      <weui-btn mini dft @tapEvt="reject">驳回</weui-btn>
      <weui-btn mini @tapEvt="pass">通过</weui-btn>
    </area-center>
  </bottom-fix>
</div>
</template>

<script>
import BottomFix from '../components/layout/BottomFix';
import AreaCenter from '../components/area/AreaCenter';

export default {
  name: 'tch-apr-dtl',
  components: {
    BottomFix,
    AreaCenter,
  },

  data() {
    return {
      student: {},
      star: {},
      imageUrl: '',
      benchmarks: [],
      reason: '',
    };
  },

  methods: {
    loadDetail() {
      this.$http.post('core/evaluestar/starCustom/findStarCustomById', {
        starCustomId: this.$route.params.id,
      }).then(res => res.json())
      .then(({ resultBean }) => {
        this.student = { id: resultBean.studentId, name: resultBean.studentName || '' };
        this.star = { id: resultBean.id, name: resultBean.name || '' };
        this.imageUrl = resultBean.imageUrl || '';
        this.benchmarks = resultBean.customContentList || [];
        this.reason = resultBean.applyRemark;
      });
    },

    reject() {
      this.$router.push('/TchAprRefuse');
    },

    pass() {
      this.$http.post('core/evaluestar/starCustom/updateStarCustom/102', {
        status: 102,
        id: this.star.id,
      }).then(res => res.json())
      .then(({ resultCode }) => {
        if (resultCode === 'JSPE-200') {
          this.$router.push('/AssessSuc');
        }
      });
    },
  },

  beforeRouteEnter(to, from, next) {
    next(vm => vm.loadDetail());
  },
};
</script>

<style>

</style>