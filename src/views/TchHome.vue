<template>
<div class="page">
  <icon-btn-group :btns="btns" @tapIconBtn="tap"></icon-btn-group>
</div>
</template>

<script>
import IconBtnGroup from '../components/buttons/IconBtnGroup';

export default {
  name: 'home-page',

  data() {
    return {
      btns: [
        { name: '评价', icon: '', cls: 'active' },
        { name: '分析', icon: '', go: 'TchAnalysis' },
        { name: '标准', icon: '', go: 'base' },
        { name: '荣誉殿堂', icon: '', go: 'xxx' },
        { name: '审批', icon: '', go: 'ttt' },
      ],
    };
  },

  components: {
    IconBtnGroup,
  },

  methods: {
    tap({ go }) {
      this.$router.push(go);
    },
  },
};
</script>