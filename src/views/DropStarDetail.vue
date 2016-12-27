<template>
<div class="page ante-page-white">
  <article-title>{{ starName }} - {{ info.qty }}</article-title>

  <div v-show="info.studentName"
    class="ante-drop-content ante-drop-sum">{{ info.studentName }}同学被撤销了{{ info.qty }}颗 {{ starName }}
  </div>

  <div v-show="info.cancelReason"
    class="ante-drop-content">撤销原因: <span class="ante-drop-desc">{{ info.cancelReason }}</span></div>

  <div v-show="info.cancelPersonName"
    class="ante-drop-content">撤销人: <span class="ante-drop-desc">{{ info.cancelPersonName }}</span></div>

  <div v-show="cancelTime"
    class="ante-drop-content ante-drop-bottom">撤销时间: <span class="ante-drop-desc">{{ cancelTime }}</span></div>
  <cell-title tip>当学生经努力再次达到获星条件时，可申请恢复</cell-title>

  <p class="weui-btn-area">
    <weui-btn v-if="statusDesc" :disabled="!canReapply" @tapEvt="submit">{{ statusDesc }}</weui-btn>
  </p>
</div>
</template>

<script>
import ArticleTitle from '../components/article/ArticleTitle';
import { StarNameMap } from '../utils/starsMap';

export default {
  name: 'drop-star-detail',
  components: {
    ArticleTitle,
  },

  data() {
    return {
      school: WWW_CONFIG.currentCorpName,
      info: {},
      showSuc: false,
      customName: '',
    };
  },

  computed: {
    starName() {
      return this.info.type === '116'
        ? this.customName
        : (StarNameMap[this.info.type] || '');
    },

    canReapply() {
      return this.info.status === '101' || this.info.status === '104';
    },

    statusDesc() {
      let sts = '';

      switch (this.info.status) {
        case '101':
        case '104':
          sts = '申请恢复';
          break;
        case '102':
          sts = '已申请';
          break;
        case '103':
          sts = '已恢复';
          break;
        default:
      }

      return sts;
    },
  },

  methods: {
    loadDetail() {
      this.$http.post('core/evaluestar/cancelrecord/findById', {
        id: this.$route.params.id,
      }).then(res => res.json())
      .then(({ resultBean }) => {
        this.info = resultBean;
        this.customName = resultBean.starCustomName || '';
      });
    },

    submit() {
      this.$router.replace(`/ReapplyStar/${this.$route.params.id}`);
    },
  },

  beforeRouteEnter(to, from, next) {
    next(vm => vm.loadDetail());
  },
};
</script>

<style scoped>
.ante-page-white {
  background-color: #fff;
}
.ante-drop-content {
  padding: 15px;
}
.ante-drop-sum {
  padding-top: 30px;
}
.ante-drop-desc {
  color: #666;
}
.ante-drop-bottom {
  padding-bottom: 0;
}
</style>