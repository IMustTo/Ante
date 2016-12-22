<template>
<div class="page">
  <bottom-fix>
    <cell-wapper>
      <cell-base name="学生"
        :caption="student.name">
      </cell-base>
      <cell-base name="星星名称" :caption="star.name">
        <div slot="descimg" class="ante-star-custom-default" :style="iconbg"></div>
      </cell-base>
    </cell-wapper>

    <cell-title title="评价标准"></cell-title>
    <cell-wapper>
      <template v-for="item in benchmarks">
        <cell-base :name="item"></cell-base>
      </template>
    </cell-wapper>

    <cell-title v-show="reason && isCreate" title="创建原因"></cell-title>
    <cell-title v-show="reason && !isCreate" title="申请说明"></cell-title>
    <cell-wapper v-show="reason">
      <cell-base :name="reason"></cell-base>
    </cell-wapper>
    <cell-title v-show="!isCreate" tip>本审批需要班主任操作</cell-title>

    <area-center slot="bottom">
      <weui-btn v-show="needAprove" mini dft @tapEvt="reject">驳回</weui-btn>
      <weui-btn v-show="needAprove" mini @tapEvt="pass">通过</weui-btn>
      <weui-btn v-show="rejected" mini dft disabled>已驳回</weui-btn>
      <weui-btn v-show="passed" mini disabled>已通过</weui-btn>
    </area-center>
  </bottom-fix>
</div>
</template>

<script>
import BottomFix from '../components/layout/BottomFix';
import AreaCenter from '../components/area/AreaCenter';

// const StatusMap = {
//   101: '创建待审核',
//   102: '创建审批通过',
//   103: '创建审批拒绝',
//   104: '申请得星',
//   105: '申请得星拒绝',
//   106: '已得星',
//   107: '撤销得星',
//   108: '已兑换高级星',
// };

export default {
  name: 'tch-apr-dtl',
  components: {
    BottomFix,
    AreaCenter,
  },

  data() {
    return {
      type: '',
      student: {},
      star: {},
      imageUrl: '',
      benchmarks: [],
      reason: '',
      status: null,
    };
  },

  computed: {
    iconbg() {
      let bg = {};

      if (this.star.imageUrl) {
        bg = {
          'background-image': `url('${this.star.imageUrl}')`,
          'background-size': 'cover',
        };
      }

      return bg;
    },
    // 是否创建流程
    isCreate() {
      return this.type === '101';
    },

    needAprove() {
      return (
        (this.isCreate && this.status === '101') ||
        (!this.isCreate && this.status === '104')
      );
    },
    rejected() {
      return (
        (this.isCreate && this.status === '103') ||
        (!this.isCreate && this.status === '105')
      );
    },
    passed() {
      return (
        (this.isCreate && this.status !== '101' && this.status !== '103') ||
        (!this.isCreate && (
          this.status === '106' ||
          this.status === '107' ||
          this.status === '108'
        ))
      );
    },
  },

  methods: {
    loadDetail() {
      const [id, type] = this.$route.params.id.split('_');
      this.type = type;

      this.$http.post('core/evaluestar/starCustom/findStarCustomById', {
        starCustomId: id,
      }).then(res => res.json())
      .then(({ resultBean }) => {
        this.student = { id: resultBean.studentId, name: resultBean.studentName || '' };
        this.star = { id: resultBean.id, name: resultBean.name || '', imageUrl: resultBean.imageUrl || '' };
        this.imageUrl = resultBean.imageUrl || '';
        this.benchmarks = resultBean.customContentList || [];
        this.reason = resultBean.applyRemark;
        this.status = resultBean.status;
      });
    },

    reject() {
      this.$router.push(`/TchAprRefuse/${this.star.id}_${this.status}`);
    },

    // 创建自定义星批准
    pass() {
      const status = this.status === '101'
        ? '102'
        : '106';

      this.$http.post(`core/evaluestar/starCustom/updateStarCustom/${status}`, {
        status,
        id: this.star.id,
      }).then(res => res.json())
      .then(({ resultCode }) => {
        if (resultCode === 'JSPE-200') {
          this.$router.push(`/AprPassSuc/${this.star.id}`);
        }
      });
    },
  },

  beforeRouteEnter(to, from, next) {
    next(vm => vm.loadDetail());
  },
};
</script>
