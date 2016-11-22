<template>
<div class="ante-area-base" :style="topStyle">
  <slot></slot>
</div>
</template>

<script>
export default {
  name: 'area-base',

  props: {
    top: Number,
  },

  computed: {
    topStyle() {
      if (!this.top) return {};

      return {
        marginTop: `${this.top}px`,
      };
    },
  },
};
</script>

<style scoped>
.ante-area-base {
  padding: 0 15px;
  margin: 15px 0;
}
.ante-area-base + .ante-area-base {
  margin-top: 0;
}
</style>