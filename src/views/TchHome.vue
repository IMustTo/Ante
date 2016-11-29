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
import IconBtnGroup from '../components/button/IconBtnGroup';
import TextBtnGroup from '../components/button/TextBtnGroup';

export default {
  name: 'tch-home',

  data() {
    return {
      iconBtns: [
        { name: '评价', icon: 'icon-pingjia', cls: 'active' },
        { name: '分析', icon: 'icon-fenxi', go: '/TchAnalysis' },
        { name: '标准', icon: 'icon-wbdiconbook', go: 'base' },
        { name: '荣誉殿堂', icon: 'icon-jiangbei', go: '/HonorHall' },
        { name: '审批', icon: 'icon-shenpi', go: '/TchApprove' },
        { name: '扫码评价', icon: 'icon-scan', go: '' },
      ],
      textBtns: [
        [
          { name: '评价', go: '/TchAssess/1' },
          { name: '分析', go: 'TchAssess' },
          { name: '标准', go: 'TchAssess' },
          { name: '荣誉殿堂', go: 'TchAssess' },
          { name: '审批', go: 'TchAssess' },
        ],
        [
          { name: '课堂评价', go: '/ClassAssess' },
          { name: '分析', go: 'TchAssess' },
          { name: '标准', go: 'TchAssess' },
          { name: '荣誉殿堂', go: 'TchAssess' },
          { name: '审批', go: 'TchAssess' },
        ],
      ],
      titleStyle: {
        color: '#333',
      },

      isParent: true,
    };
  },

  components: {
    IconBtnGroup,
    TextBtnGroup,
  },

  created() {
    // TODO IF 家长
    if (this.isParent) {
      this.iconBtns = [
        { name: '评价', icon: 'icon-pingjia', cls: 'active' },
        { name: '分析', icon: 'icon-fenxi', go: '/PrtAnalysis' },
        { name: '标准', icon: 'icon-wbdiconbook', go: 'base' },
        { name: '荣誉殿堂', icon: 'icon-jiangbei', go: '/HonorHall' },
        { name: '自定义星', icon: 'icon-star', go: '/CustomStar' },
      ];

      this.textBtns = [
        [{ name: '家庭评价', go: '/PrtAssess' }],
        [{ name: '自定义星评价', go: '/CustomStarAssess' }],
      ];
    }
  },

  methods: {
    goNewPage({ go }) {
      this.$router.push(go);
    },
  },
};
</script>