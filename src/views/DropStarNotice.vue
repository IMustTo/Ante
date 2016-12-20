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
    <weui-btn @tapEvt="submit">申请恢复</weui-btn>
  </p>

  <weui-toast v-if="showSuc">已申请</weui-toast>
</div>
</template>

<script>
import ArticleTitle from '../components/article/ArticleTitle';
import ArticleInfo from '../components/article/ArticleInfo';
import { dateFormat } from '../utils';

const StarNameMap = {
  101: '身心健康基础星',
  102: '品格情怀基础星',
  103: '创新思维基础星',
  104: '审美雅趣基础星',
  105: '人文表达基础星',
  106: '箭鱼之星',
  107: '白鲸之星',
  108: '海豚之星',
  109: '珊瑚之星',
  110: '海狮之星',
  111: '尼莫之星',
  112: '企鹅之星',
  113: '章鱼之星',
  114: '水母之星',
  115: '海马之星',
  117: '海洋银星',
  118: '海洋全能星',
  119: '海洋金星',
};

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
      return this.info.type
        ? StarNameMap[this.info.type]
        : '';
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
      this.$http.post('core/evaluestar/cancelrecord/applyOrApprove', {
        id: this.$route.params.id,
        status: '102',
      }).then(res => res.json())
      .then(({ resultCode }) => {
        if (resultCode === 'JSPE-200') {
          this.showSuc = true;
        }
      });
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