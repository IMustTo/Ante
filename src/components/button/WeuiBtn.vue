<template>
<a href="javascript:;"
  class="weui-btn"
  :class="mergeCls"
  :click="tapBtn">
  {{ name }}<slot></slot>
</a>
</template>

<script>
export default {
  name: 'weui-btn',
  props: {
    name: String,
    disabled: Boolean,
    primary: Boolean,
    dft: Boolean,
    warn: Boolean,
    plain: Boolean,
    mini: Boolean,
  },

  computed: {
    mergeCls() {
      const type = this.plain
        ? 'plain-'
        : '';
      const cls = {
        'weui-btn_mini': this.mini,
        'weui-btn_warn': this.warn,
      };

      cls[`weui-btn_${type}primary`] = !this.dft && !this.warn;
      cls[`weui-btn_${type}default`] = this.dft;
      cls[`weui-btn_${type}disabled`] = this.disabled;

      return cls;
    },

    tapBtn() {
      if (this.disabled) return;

      this.$emit('btnTap');
    },
  },
};
</script>

<style>

</style>