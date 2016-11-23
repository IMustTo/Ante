<template>
<div class="ante-layout-right-slider">
  <div @click="$emit('tapEvt')" class="ante-mask"></div>
  <div class="ante-layout-content">
    <slot></slot>
  </div>
</div>
</template>

<script>
export default {
  name: 'right-slider',
};
</script>

<style scoped>
.ante-layout-right-slider {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.ante-layout-right-slider .ante-layout-content {
  position: absolute;
  top: 0;
  left: 50px;
  right: 0;
  bottom: 0;
  background-color: #f0f0f0;
}
</style>
