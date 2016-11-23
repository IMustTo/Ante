<template>
<div class="page">
  <icon-btn-group :btns="iconBtns" @tapIconBtn="goNewPage">
  </icon-btn-group>

  <cell-title
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
import CellTitle from '../components/cell/CellTitle';

export default {
  name: 'tch-home',

  data() {
    return {
      iconBtns: [
        { name: '评价', icon: '', cls: 'active' },
        { name: '分析', icon: '', go: 'TchAnalysis' },
        { name: '标准', icon: '', go: 'base' },
        { name: '荣誉殿堂', icon: '', go: 'xxx' },
        { name: '审批', icon: '', go: 'ttt' },
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
          { name: '评价', go: 'TchAssess' },
          { name: '分析', go: 'TchAssess' },
          { name: '标准', go: 'TchAssess' },
          { name: '荣誉殿堂', go: 'TchAssess' },
          { name: '审批', go: 'TchAssess' },
        ],
      ],
      titleStyle: {
        color: '#333',
      },
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