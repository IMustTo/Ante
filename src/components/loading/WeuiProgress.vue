<template>
  <div class="weui-progress__bar" v-if="w">
    <div class="weui-progress__inner-bar js_progress" :style="stl"></div>
  </div>
</template>

<script>
export default {
  name: 'weui-progress',

  props: {
    w: Number,
    default: 0,
  },

  computed: {
    stl() {
      return {
        webkitTransform: `scaleX(${this.w})`,
        transform: `scaleX(${this.w})`,
      };
    },
  },
};
</script>

<style scoped>
.weui-progress__bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 5;
  background: none;
}
.weui-progress__inner-bar {
  width: 1%;
  -webkit-transform-origin: 0 0%;
  transform-origin: 0 0%;
}
</style>