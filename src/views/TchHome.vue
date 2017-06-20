<template>
<div class="page ante-page-withb">
  <icon-btn-group :btns="iconBtns" @tapIconBtn="goNewPage">
  </icon-btn-group>

  <cell-title
    v-if="!isParent"
    :custom="titleStyle">海洋星评价系统 (<span class="ante-red-word">点击分类进行评价</span>)
  </cell-title>

  <template v-for="btns in textBtns">
    <text-btn-group :btns="btns" @tapTextBtn="goNewPage">
    </text-btn-group>
  </template>

  <cell-title tip
    v-if="hasCancelStar"
    :custom="titleStyle">有海洋星被撤销，再次达标后可申请恢复，<span class="ante-link-word"
      @click="$router.push('/DropStarList/0/0')">查看记录</span>
  </cell-title>
</div>
</template>

<script>
import { mapActions } from 'vuex';
import IconBtnGroup from '../components/button/IconBtnGroup';
import TextBtnGroup from '../components/button/TextBtnGroup';
import scan from '../mixins/wx.scan';

export default {
  name: 'tch-home',

  data() {
    return {
      iconBtns: [],
      textBtns: [],
      titleStyle: {
        color: '#333',
      },

      hasCancelStar: false,
    };
  },

  components: {
    IconBtnGroup,
    TextBtnGroup,
  },

  mixins: [scan],

  created() {
    this.$http
      .post('core/evaluestar/standard/findIndexListByUserIdentity')
      .then(response => response.json())
      .then(({ resultBean }) => {
        this.addIconBtns(resultBean);
        this.addTextBtn(resultBean);
      });

    this.loadHasCancel();
  },

  methods: {
    // 查询是否有撤销星星纪录
    loadHasCancel() {
      if (WWW_CONFIG.identityList.some(item => item.code === '102')) {
        this.$http.post('core/evaluestar/cancelrecord/hasCancelStarsByParentId')
          .then(res => res.json())
          .then(({ resultBean }) => (this.hasCancelStar = !!resultBean));
      }
    },

    addIconBtns(res) {
      const iconBtns = [];

      // if (res.hasEvalues) {
      //   iconBtns.push({ name: '评价', icon: 'icon-pingjia', cls: 'active' });
      // }
      if (res.hasAnalysis) {
        iconBtns.push({ name: '学生分析', icon: 'icon-fenxi', go: '/TchAnalysis' });
      }
      if (res.hasExchange) {
        iconBtns.push({ name: '兑换', icon: 'icon-duihuan', go: '/PrtAnalysis' });
      }
      if (res.hasStandard) {
        iconBtns.push({ name: '标准', icon: 'icon-wbdiconbook', go: 'base' });
      }
      if (res.hasStarStudent) {
        iconBtns.push({ name: '荣誉殿堂', icon: 'icon-jiangbei', go: '/HonorHall' });
      }
      if (res.hasApprove) {
        iconBtns.push({ name: '审批', icon: 'icon-shenpi', go: '/TchApprove' });
      }
      if (res.hasCustom) {
        iconBtns.push({ name: '自定义星', icon: 'icon-star', go: '/CustomStar' });
      }
      if (res.hasScan) {
        iconBtns.push({ name: '扫码评价', icon: 'icon-scan', go: 'scan' });
      }
      if (res.hasStatistics) {
        iconBtns.push({ name: '评价统计', icon: 'icon-fenxi', go: '/EvaTrend' });
      }

      this.iconBtns = iconBtns;
    },

    addTextBtn(res) {
      const textBtns = [];
      const assessType = [];

      Object.keys(res).forEach((item) => {
        if (!isNaN(item)) {
          textBtns.push(
            res[item].map((item) => {
              if (item.evalueType === '101') {
                item.go = `/TchAssess/${item.type}`;
                // 加到类型里
                assessType.push(item);
              }
              // 课堂评价
              if (item.evalueType === '106') {
                item.go = '/TchAssess/ketang';
              }
              // 校内评价 && 扫码
              if (item.evalueType === '107') {
                item.go = 'scan';
              }
              // 家庭评价
              if (item.evalueType === '108') {
                item.go = '/PrtAssess/108';
              }
              // 自定义星
              if (item.evalueType === '10000') {
                item.go = '/CustomStarAssess';
              }
              return item;
            })
          );
        }
      });

      this.textBtns = textBtns;
      this.setAssessType({ types: assessType });
    },

    goNewPage({ go }) {
      if (go === 'scan') {
        this.scanQrcode();
      } else if (go === 'base') {
        location.href = 'http://m.i3618.com.cn/core-web/pages/mobile/share.jsp?id=1110908';
      } else {
        this.$router.push(go);
      }
    },

    ...mapActions([
      'setAssessType',
    ]),
  },
};
</script>