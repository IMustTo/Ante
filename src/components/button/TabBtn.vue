<template>
<div class="ante-tab-btn"
  :class="cls"
  :style="stl"
  @click="$emit('tapEvt', index)">{{ name }}</div>
</template>

<script>
export default {
  name: 'tab-btn',

  props: {
    w: {
      type: Number,
      default: 100,
    },
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
        'ante-tab-btn-on': this.checked,
      };
    },

    stl() {
      return {
        width: `${this.w}px`,
      };
    },
  },
};
</script>

<style scoped>
.ante-tab-btn {
  display: inline-block;
  text-align: center;
  height: 34px;
  line-height: 34px;
  background-color: #7cb7f6;
  color: #fff;
  position: relative;
}
.ante-tab-btn:not(:last-child):after {
  content: " ";
  position: absolute;
  bottom: 0;
  top: 0;
  right: 0;
  width: 1px;
  border-right: 1px solid #70a9e7;
  color: #70a9e7;
  -webkit-transform-origin: 50% 0;
  transform-origin: 50% 0;
  -webkit-transform: scaleX(0.5);
  transform: scaleX(0.5);
}
.ante-tab-btn.ante-tab-btn-on {
  background-color: #67a8ee;
}
</style>