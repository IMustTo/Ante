<template>
<div class="weui-cells ante-star-sum">
  {{ name }}
  <span class="ante-red-word">&nbsp;{{ count }}&nbsp;</span> 颗
  <span v-if="cancel">(撤销{{ cancel }}颗)</span>
</div>
</template>

<script>
export default {
  name: 'star-sum',

  props: {
    name: {
      type: String,
    },
    count: {
      type: Number,
      default: 0,
    },
    cancel: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style scoped>
.ante-star-sum {
  margin: 0;
  text-align: center;
  padding: 10px 15px;
}
</style>
