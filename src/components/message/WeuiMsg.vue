<template>
<div class="weui-msg">
  <div class="weui-msg__icon-area">
    <i class="weui-icon_msg" :class="cls"></i>
  </div>
  <div class="weui-msg__text-area">
    <h2 class="weui-msg__title">{{ title }}</h2>
    <p class="weui-msg__desc">{{ desc }}<slot name="desc"></slot></p>
  </div>
  <div class="weui-msg__opr-area">
    <p class="weui-btn-area">
      <slot></slot>
    </p>
  </div>
</div>
</template>

<script>
export default {
  name: 'weui-msg',

  props: {
    title: {
      type: String,
      default: '',
    },
    desc: {
      type: String,
      default: '',
    },

    // waiting, info, warn, success
    icon: {
      type: String,
      default: 'success',
    },
  },

  computed: {
    cls() {
      const iconClass = {};

      if (this.icon === 'fail') {
        iconClass['weui-icon-warn'] = true;
        iconClass['weui-icon_msg-primary'] = true;
      } else {
        iconClass[`weui-icon-${this.icon}`] = true;
      }

      return iconClass;
    },
  },
};
</script>
