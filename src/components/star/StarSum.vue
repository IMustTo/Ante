<template>
<div class="weui-cells ante-star-sum">
  {{ name }} <span>&nbsp;{{ count }}&nbsp;</span> 颗
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
  },
};
</script>

<style scoped>
.ante-star-sum {
  margin: 0;
  text-align: center;
  padding: 10px 15px;
}
.ante-star-sum span {
  color: #ff540a;
}
</style>
