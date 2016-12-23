<template>
<div class="ante-big-star">
  <div class="ante-big-star-inner" :class="iconCls" :style="imgbg"></div>
</div>
</template>

<script>
export default {
  name: 'big-star',
  props: {
    icon: {
      type: String,
      default: '',
    },
    img: {
      type: String,
      default: '',
    },
  },

  computed: {
    iconCls() {
      const cls = {};
      if (this.icon) {
        cls[`ante-star-large-icon-${this.icon}`] = true;
      }

      return cls;
    },

    imgbg() {
      return this.img
        ? { 'background-image': `url('${this.img}')`, 'background-size': 'cover' }
        : {};
    },
  },
};
</script>

<style scoped>
@import '../../assets/css/star.css';

.ante-big-star {
  height: 100vw;
  background-image: url('../../assets/images/bg-issue.jpg');
  background-size: cover;
  background-position: center;
}
.ante-big-star-inner {
  height: 100%;
  background-size: 85%;
  background-repeat: no-repeat;
  background-position: center center;
}
</style>
