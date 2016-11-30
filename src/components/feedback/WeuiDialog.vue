<template>
<div class="js_dialog" style="opacity: 1;">
  <div class="weui-mask"></div>
  <div class="weui-dialog">
    <div class="weui-dialog__hd">
      <strong class="weui-dialog__title">{{ title }}</strong>
    </div>
    <div class="weui-dialog__bd">{{ content }}<slot></slot></div>
    <div class="weui-dialog__ft">
      <a v-if="!single"
        @click="$emit('cancel')"
        href="javascript:;"
        class="weui-dialog__btn weui-dialog__btn_default">{{ cancel }}</a>
      <a @click="$emit('ok')"
        href="javascript:;"
        class="weui-dialog__btn weui-dialog__btn_primary">{{ ok }}</a>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'weui-dialog',
  props: {
    title: {
      type: String,
      default: '温馨提示',
    },
    content: {
      type: String,
      default: '已完成',
    },
    ok: {
      type: String,
      default: '确认',
    },
    cancel: {
      type: String,
      default: '取消',
    },
    single: {
      type: Boolean,
      default: false,
    },
  },
};
</script>