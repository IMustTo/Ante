<template>
<div class="weui-cell" @click="$emit('tapEvt')">
  <div class="weui-cell__hd">
    <img v-if="imguri" :src="imguri">
    <slot name="icon"></slot>
  </div>

  <div class="weui-cell__bd">
      <p>{{ name }}</p>
      <slot></slot>
  </div>

  <slot name="descimg"></slot>

  <div class="weui-cell__ft">
    {{ caption }}
    <slot name="desc"></slot>
  </div>
</div>
</template>

<script>
export default {
  name: 'cell-base',
  props: {
    name: {
      type: String,
      default: '',
    },
    caption: {
      type: String,
      default: '',
    },
    imguri: {
      type: String,
      default: '',
    },
  },
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