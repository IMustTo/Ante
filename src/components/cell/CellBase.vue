<template>
<div class="weui-cell">
  <div class="weui-cell__hd">
  <img v-if="imguri" :src="imguri"></div>

  <div class="weui-cell__bd">
      <p>{{ name }}</p>
  </div>

  <div v-if="caption" class="weui-cell__ft">
    {{ caption }}
  </div>
</div>
</template>

<script>
export default {
  name: 'cell-base',
  props: ['name', 'caption', 'imguri'],
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
</style>