<template>
<div>
  <div class="weui-mask_transparent"></div>
  <div class="weui-toast">
    <i class="weui-icon_toast" :class="icon"></i>
    <p class="weui-toast__content">{{ tip }}<slot></slot></p>
  </div>
</div>
</template>

<script>
export default {
  name: 'weui-toast',
  props: {
    tip: String,

    icon: {
      type: String,
      default: 'weui-icon-success-no-circle',
    },
  },
};
</script>

<style scoped>
.icon-gantanhao:before {
  font-size: 55px;
  line-height: 1;
}
</style>