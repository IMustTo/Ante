<template>
<div class="weui-navbar__item"
  :class="cls"
  @click="$emit('tapEvt', index)">{{ name }}</div>
</template>

<script>
export default {
  name: 'nav-btn',

  props: {
    name: String,
    index: Number,
    checked: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    cls() {
      return {
        'weui-bar__item_on': this.checked,
      };
    },
  },
};
</script>
