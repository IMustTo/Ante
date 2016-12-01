<template>
<div class="page">
  <icon-btn-group :btns="iconBtns" @tapIconBtn="goNewPage">
  </icon-btn-group>

  <cell-title
    v-if="!isParent"
    :custom="titleStyle"
    title="海洋星评价系统">
  </cell-title>

  <template v-for="btns in textBtns">
    <text-btn-group :btns="btns" @tapTextBtn="goNewPage">
    </text-btn-group>
  </template>
</div>
</template>

<script>
import { mapActions } from 'vuex';
import IconBtnGroup from '../components/button/IconBtnGroup';
import TextBtnGroup from '../components/button/TextBtnGroup';

export default {
  name: 'tch-home',

  data() {
    return {
      iconBtns: [],
      textBtns: [],
      titleStyle: {
        color: '#333',
      },
    };
  },

  components: {
    IconBtnGroup,
    TextBtnGroup,
  },

  created() {
    this.$http
      .post('core/evaluestar/standard/findIndexListByUserIdentity')
      .then(response => response.json())
      .then(({ resultBean }) => {
        this.addIconBtns(resultBean);
        this.addTextBtn(resultBean);
      });
  },

  methods: {
    addIconBtns(res) {
      const iconBtns = [];

      if (res.hasEvalues) {
        iconBtns.push({ name: '评价', icon: 'icon-pingjia', cls: 'active' });
      }
      if (res.hasAnalysis) {
        iconBtns.push({ name: '分析', icon: 'icon-fenxi', go: '/TchAnalysis' });
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
                item.go = '/ClassAssess';
              }
              // 校内评价 && 扫码
              if (item.evalueType === '107') {
                item.go = 'scan';
              }
              // 家庭评价
              if (item.evalueType === '108') {
                item.go = '/PrtAssess';
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
      this.$router.push(go);
    },

    ...mapActions([
      'setAssessType',
    ]),
  },
};
</script>