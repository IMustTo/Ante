<template>
<div class="page">
  <weui-msg title="评价成功">
    <weui-btn v-if="showBtn" @tapEvt="back">确定</weui-btn>
  </weui-msg>
</div>
</template>

<script>
import WeuiBtn from '../components/button/WeuiBtn';
import WeuiMsg from '../components/message/WeuiMsg';

export default {
  name: 'assess-suc',
  components: {
    WeuiBtn,
    WeuiMsg,
  },

  data() {
    return {
      showBtn: true,
    };
  },

  created() {
    if (/SchoolAssess/.test(location.href)) {
      this.showBtn = false;
    }
  },

  methods: {
    back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.page {
  background-color: #fff;
}
</style>