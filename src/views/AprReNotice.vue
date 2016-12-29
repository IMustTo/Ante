<template>
<div class="page">
  <weui-msg :title="statusDesc" :desc="desc">
    <weui-btn v-if="!passed" :disabled="applying" @tapEvt="goList">重新申请</weui-btn>
  </weui-msg>
</div>
</template>

<script>
import WeuiMsg from '../components/message/WeuiMsg';

export default {
  name: 'apr-re-notice',
  components: {
    WeuiMsg,
  },

  data() {
    return {
      info: {},
      showSuc: false,
    };
  },

  computed: {
    passed() {
      return this.info.status === '103';
    },

    applying() {
      return this.info.status === '102';
    },

    statusDesc() {
      let sts = '';

      switch (this.info.status) {
        case '101':
          sts = '星星被撤销';
          break;
        case '104':
          sts = '驳回申请';
          break;
        case '102':
          sts = '申请中';
          break;
        case '103':
          sts = '申请通过';
          break;
        default:
      }

      return sts;
    },

    desc() {
      let word = '';

      switch (this.info.status) {
        case '104':
          word = `${this.info.studentName}同学的恢复得星申请被驳回`;
          break;
        case '103':
          word = `${this.info.studentName}同学重新获得了被撤销的海洋星`;
          break;
        default:
          word = '';
      }

      return word;
    },
  },

  methods: {
    loadStatus() {
      this.$http.post('core/evaluestar/cancelrecord/findById', {
        id: this.$route.params.id,
      }).then(res => res.json())
      .then(({ resultBean }) => {
        this.info = resultBean;
      });
    },

    submit() {
      this.$router.replace(`/ReapplyStar/${this.$route.params.id}`);
    },

    goList() {

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