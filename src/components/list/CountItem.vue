<template>
<div class="weui-cell">
  <div class="weui-cell__hd">
  <img v-if="imguri" :src="imguri"></div>

  <div class="weui-cell__bd">
      <p>{{ desc }}</p>
      <slot></slot>
  </div>

  <div v-if="count" class="weui-cell__ft">
    X&nbsp;{{ count }}
  </div>
</div>
</template>

<script>
export default {
  name: 'count-item',
  props: ['desc', 'imguri', 'count'],
};
</script>

<style scoped>
.weui-cell img {
  width:20px;
  height: 20px;
  margin-right:5px;
  display:block;
  object-fit: cover;
  object-position: center;
}
.weui-cell__bd {
  color: #666;
}
.weui-cell__ft {
  color: #333;
}
</style>