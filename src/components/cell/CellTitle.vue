<template>

<div class="weui-cells__title" :style="custom">
  <i v-if="tip || warn" class="ante-title-icon" :class="cls"></i>
  {{ title }}
  <slot></slot>
</div>

</template>

<script>
export default {
  name: 'cell-title',
  props: {
    title: String,
    custom: Object,
    warn: {
      type: Boolean,
      default: false,
    },
    tip: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    cls() {
      return {
        'weui-icon-info-circle': this.tip,
        'weui-icon-warn': this.warn,
      };
    },
  },
};
</script>

<style scoped>
.ante-title-icon {
  font-size: 0;
}
.ante-title-icon:before {
  position: relative;
  top: -2px;
  font-size: 16px;
  margin: 0;
}
</style>