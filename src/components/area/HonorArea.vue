<template>
<div class="ante-honor-area">
  <div class="ante-honor-logo"></div>
  <div class="weui-cells ante-honor-content">
    <slot></slot>
  </div>
</div>
</template>

<script>
export default {
  name: 'honor-area',
};
</script>

<style scoped>
.ante-honor-area {
  position: relative;
  padding-top: 92px;
}
.ante-honor-logo {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 135px;
  z-index: 1;
  -webkit-background-size: 80%;
  background-size: 80%;
  background-repeat: no-repeat;
  background-position: center center;
  background-image: url('../../assets/images/honor-hall.png');
}
.ante-honor-content {
  margin: 0;
  padding-top: 44px;
  background-color: #fff;
}
.ante-honor-area .ante-avatar-list {
  margin-bottom: 0;
}
</style>