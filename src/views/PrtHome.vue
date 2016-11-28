<template>
<div class="page">
  <icon-btn-group :btns="iconBtns" @tapIconBtn="goNewPage">
  </icon-btn-group>

  <template v-for="btns in textBtns">
    <text-btn-group :btns="btns" @tapTextBtn="goNewPage">
    </text-btn-group>
  </template>
</div>
</template>

<script>
import IconBtnGroup from '../components/button/IconBtnGroup';
import TextBtnGroup from '../components/button/TextBtnGroup';
import CellTitle from '../components/cell/CellTitle';

export default {
  name: 'prc-home',

  data() {
    return {
      iconBtns: [
        { name: '评价', icon: 'icon-pingjia', cls: 'active' },
        { name: '分析', icon: 'icon-fenxi', go: '/TchAnalysis' },
        { name: '标准', icon: 'icon-wbdiconbook', go: 'base' },
        { name: '荣誉殿堂', icon: 'icon-jiangbei', go: '/HonorHall' },
        { name: '自定义星', icon: 'icon-shenpi', go: '/CustomStar' },
      ],
      textBtns: [
        [
          { name: '家庭评价', go: '/PrtAssess/1' },
        ],
        [
          { name: '自定义星评价', go: '/CustomStar' },
        ],
      ],
    };
  },

  components: {
    IconBtnGroup,
    TextBtnGroup,
    CellTitle,
  },

  methods: {
    goNewPage({ go }) {
      this.$router.push(go);
    },
  },
};
</script>