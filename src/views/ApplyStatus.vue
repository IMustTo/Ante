<template>
<div class="page">
  <weui-msg :title="statusDesc" :desc="desc" :icon="icon">
    <weui-btn @tapEvt="applyGet" v-if="status === '102'">申请得星</weui-btn>

    <weui-btn @tapEvt="applyGet" v-if="status === '105'">重新申请</weui-btn>
    <weui-btn @tapEvt="close" v-if="status === '105'">关闭</weui-btn>
  </weui-msg>
</div>
</template>

<script>
import WeuiMsg from '../components/message/WeuiMsg';

export default {
  name: 'apply-status',
  components: {
    WeuiMsg,
  },

  data() {
    return {
      studentName: '',
      starName: '',
      status: '',

      remark: '',
    };
  },

  computed: {
    icon() {
      let type = '';

      switch (this.status) {
        case '103':
        case '105':
          type = 'fail';
          break;
        default:
          type = 'success';
      }

      return type;
    },
    statusDesc() {
      let word = '';

      switch (this.status) {
        case '102':
        case '106':
          word = '审批通过';
          break;
        case '103':
        case '105':
          word = '申请被驳回';
          break;
        case '104':
          word = '已申请';
          break;
        default:
          word = '';
      }

      return word;
    },
    desc() {
      let word = '';

      switch (this.status) {
        case '102':
          word = `你申请的自定义星“${this.starName}”已经通过审批，可以使用了`;
          break;
        case '103':
          word = `你申请的自定义星“${this.starName}”没有通过审批：${this.remark}`;
          break;
        case '104':
          word = `你已经申请获得自定义星“${this.starName}”，等待班主任审批通过后可获得`;
          break;
        case '105':
          word = `${this.studentName}同学的得星申请被驳回：${this.remark}`;
          break;
        case '106':
          word = `${this.studentName}同学获得一颗自定义星“${this.starName}”`;
          break;
        default:
          word = '';
      }

      return word;
    },
  },

  methods: {
    loadStatus() {
      this.$http.post('core/evaluestar/starCustom/findStarCustomById', {
        starCustomId: this.$route.params.id,
      }).then(res => res.json())
      .then(({ resultBean }) => {
        this.studentName = resultBean.studentName || '';
        this.starName = resultBean.name || '';
        this.status = resultBean.status;
        this.remark = resultBean.approveRemark;
      });
    },

    applyGet() {
      this.$router.push(`/CustomStarGet/${this.$route.params.id}`);
    },

    close() {
      try { wx.closeWindow(); } catch (e) { console.log(e); }
    },
  },

  beforeRouteEnter(to, from, next) {
    next(vm => vm.loadStatus());
  },
};
</script>

<style scoped>
.page {
  background-color: #fff;
}
</style>