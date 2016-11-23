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
        width: `${this.w}%`,
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
}
</style>