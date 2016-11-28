<template>
<div class="ante-status-box" :class="cls">{{ name }}<slot></slot></div>
</template>

<script>
export default {
  name: 'status-box',
  props: {
    name: String,
    code: String,
    // 待审批
    pending: {
      type: Boolean,
      default: false,
    },
    // 已通过
    passed: {
      type: Boolean,
      default: false,
    },
    // 已拒绝
    refused: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    cls() {
      return {
        'ante-status-box-pending': this.pending || this.code === 'pending',
        'ante-status-box-passed': this.passed || this.code === 'passed',
        'ante-status-box-refused': this.refused || this.code === 'refused',
      };
    },
  },
};
</script>

<style scoped>
.ante-status-box {
  height: 19px;
  line-height: 19px;
  padding: 0 9px;
  border-radius: 10px;
  color: #fff;
  font-size: 14px;
  display: inline-block;
  position: relative;
  top: -2px;
  line-height: 21px;
}
.ante-status-box-pending {
  background-color: #67c0ff;
}
.ante-status-box-passed {
  background-color: #5dca91;
}
.ante-status-box-refused {
  background-color: #f12c20;
}

</style>