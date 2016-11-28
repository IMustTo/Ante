<template>
<div class="ante-layout-bottom-fix">
  <div class="ante-layout-content">
    <slot></slot>
    <slot name="content"></slot>
  </div>

  <div class="ante-layout-bottom">
    <slot name="bottom"></slot>
  </div>
</div>
</template>

<script>
export default {
  name: 'bottom-fix',
};
</script>

<style scoped>
.ante-layout-bottom-fix,
.ante-layout-bottom-fix .ante-layout-content,
.ante-layout-bottom-fix .ante-layout-bottom {
  position: absolute;
  right: 0;
  left: 0;
}
.ante-layout-bottom-fix {
  top: 0;
  bottom: 0;
}
.ante-layout-bottom-fix .ante-layout-content {
  top: 0;
  bottom: 50px;
  overflow-y: auto;
  padding-bottom: 20px;
}
.ante-layout-bottom-fix .ante-layout-bottom {
  height: 50px;
  bottom: 0;
  box-shadow: -2px 0 10px #888;
  background-color: #fff;
}
.ante-layout-bottom-fix .ante-layout-bottom:before {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 1px;
  border-top: 1px solid #D9D9D9;
  color: #D9D9D9;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
</style>