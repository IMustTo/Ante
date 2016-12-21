<template>
<div class="page">
  <div class="ante-page-white">
    <article-title>{{ info.studentName }}同学申请恢复海洋星</article-title>
    <article-info :time="time" :peoson="info.cancelPersonName" :school="school"></article-info>

    <div v-show="info.studentName"
      class="ante-drop-content ante-drop-sum">{{ info.studentName }}同学申请恢复已被撤销的{{ starName }}
    </div>

    <div v-show="info.applyRemark"
      class="ante-drop-content">申请理由: <span class="ante-drop-desc">{{ info.applyRemark }}</span></div>
  </div>

  <cell-title>海洋星撤销记录</cell-title>
  <cell-wapper>
    <div v-show="cancelTime" class="ante-drop-content">撤销时间: <span class="ante-drop-desc">{{ cancelTime }}</span></div>

    <div v-show="info.cancelPersonName"
      class="ante-drop-content">撤销人: <span class="ante-drop-desc">{{ info.cancelPersonName }}</span></div>

    <div v-show="info.qty"
      class="ante-drop-content">撤销数量: <span class="ante-drop-desc">{{ info.qty }}颗</span></div>

    <div v-show="info.cancelReason"
      class="ante-drop-content">撤销原因: <span class="ante-drop-desc">{{ info.cancelReason }}</span></div>
  </cell-wapper>
  <cell-title tip>当学生经努力再次达到获星条件时，可以予以恢复已经撤销的星星</cell-title>

  <p class="weui-btn-area">
    <weui-btn v-if="canApr" @tapEvt="pass('103')">通过</weui-btn>
    <weui-btn v-if="canApr" dft @tapEvt="pass('104')">驳回</weui-btn>

    <weui-btn v-if="!canApr" disabled :dft="info.status === '104'">{{ statusDesc }}</weui-btn>
  </p>

  <weui-toast v-if="showSuc">已处理</weui-toast>
</div>
</template>

<script>
import ArticleTitle from '../components/article/ArticleTitle';
import ArticleInfo from '../components/article/ArticleInfo';
import { dateFormat } from '../utils';
import { StarNameMap } from '../utils/starsMap';

export default {
  name: 'tch-apr-reapply',
  components: {
    ArticleTitle,
    ArticleInfo,
  },

  data() {
    return {
      type: '',
      id: '',
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

    canApr() {
      return this.info.status === '102';
    },

    statusDesc() {
      let sts = '';

      switch (this.info.status) {
        case '103':
          sts = '已恢复';
          break;
        case '104':
          sts = '已驳回';
          break;
        default:
      }

      return sts;
    },
  },

  methods: {
    loadStatus() {
      this.$http.post('core/evaluestar/cancelrecord/findById', {
        id: this.id,
      }).then(res => res.json())
      .then(({ resultBean }) => {
        this.info = resultBean;
      });
    },

    // 103通过，104驳回
    pass(status) {
      this.$http.post('core/evaluestar/cancelrecord/applyOrApprove', {
        id: this.id,
        status,
      }).then(res => res.json())
      .then(({ resultCode }) => {
        if (resultCode === 'JSPE-200') {
          this.tipSuccess();
        }
      });
    },

    // 成功提示
    tipSuccess() {
      this.showSuc = true;

      this.timeout = setTimeout(() => {
        this.leave();
      }, 1500);
    },

    // 返回评价选择页
    leave() {
      if (this.timeout) {
        this.showSuc = false;
        clearTimeout(this.timeout);
        this.timeout = null;
      }

      this.$router.go(-1);
    },
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.type = to.params.type;
      vm.id = to.params.id;

      vm.loadStatus();
    });
  },
};
</script>

<style>
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
