<template>
<div class="page ante-page-white">
  <article-title>海洋星撤销通知</article-title>
  <article-info :time="time" :peoson="info.cancelPersonName" :school="school"></article-info>

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
import ArticleInfo from '../components/article/ArticleInfo';
import { dateFormat } from '../utils';
import { StarNameMap } from '../utils/starsMap';

export default {
  name: 'drop-star-notice',
  components: {
    ArticleTitle,
    ArticleInfo,
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
    time() {
      return this.info.createTime
        ? dateFormat(new Date(this.info.createTime), 'yyyy-MM-dd')
        : '';
    },

    cancelTime() {
      return this.info.createTime
        ? dateFormat(new Date(this.info.createTime), 'yyyy年MM月dd日')
        : '';
    },

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
    loadStatus() {
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
    next(vm => vm.loadStatus());
  },
};
</script>

<style>
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