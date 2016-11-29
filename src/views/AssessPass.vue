<template>
<div class="page">
  <weui-msg title="审批完成" :desc="desc">
    <weui-btn @tapEvt="goList">返回列表</weui-btn>
  </weui-msg>
</div>
</template>

<script>
import WeuiMsg from '../components/message/WeuiMsg';

export default {
  name: 'assess-pass',
  components: {
    WeuiMsg,
  },

  data() {
    return {
      desc: '王小明的自定义星“开心快乐星”审批通过',
    };
  },

  methods: {
    goList() {
      this.$router.push('/TchApprove');
    },
  },
};
</script>

<style scoped>
.page {
  background-color: #fff;
}
</style>