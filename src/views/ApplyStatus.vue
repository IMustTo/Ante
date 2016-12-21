<template>
<div class="page">
  <weui-msg :title="statusDesc" :desc="desc">
    <weui-btn @tapEvt="applyGet" v-if="status === '102'">申请得星</weui-btn>
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
    };
  },

  computed: {
    statusDesc() {
      let word = '';

      switch (this.status) {
        case '102':
          word = '审批通过';
          break;
        case '103':
          word = '申请被驳回';
          break;
        case '105':
          word = '申请被驳回';
          break;
        case '106':
          word = '审批通过';
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
          word = `你申请的自定义星“${this.starName}没有通过审批`;
          break;
        case '105':
          word = `${this.studentName}同学的得星申请已驳回`;
          break;
        case '106':
          word = `${this.studentName}同学获得一颗自定义星“${this.starName}`;
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
      });
    },

    applyGet() {
      this.$router.push(`/CustomStarGet/${this.$route.params.id}`);
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