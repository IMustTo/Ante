<template>
<div class="ante-area-center">
  <div class="ante-area-center-content">
    <slot></slot>
  </div>
</div>
</template>

<script>
export default {
  name: 'area-center',
};
</script>

<style>
.ante-area-center {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.ante-area-center-content {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  font-size: 0;
}
</style>
