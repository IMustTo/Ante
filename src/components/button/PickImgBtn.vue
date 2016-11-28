<template>
<div class="ante-pick-img"
  :class="cls"
  @click="$emit('tapEvt')"></div>
</template>

<script>
export default {
  name: 'pick-img-btn',
  props: {
    mini: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    cls() {
      return {
        'ante-pick-img-mini': this.mini,
      };
    },
  },
};
</script>

<style scoped>
.ante-pick-img {
  height: 60px;
  width: 60px;
  display: inline-block;
  border: 1px solid #dfdfdf;
}
.ante-pick-img:active {
  background-color: #f0f0f0;
}
.ante-pick-img-mini {
  width: 20px;
  height: 20px;
}
</style>