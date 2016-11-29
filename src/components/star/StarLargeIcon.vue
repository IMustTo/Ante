<template>
<div class="ante-star-large-icon"
  :class="iconCls"
  :style="customStyle">
</div>
</template>

<script>
export default {
  name: 'star-large-icon',

  props: {
    icon: String,
    w: {
      type: Number,
      default: 0,
    },
    h: {
      type: Number,
      default: 0,
    },
    top: {
      type: Number,
      default: 0,
    },
    left: {
      type: Number,
      default: 0,
    },
    right: {
      type: Number,
      default: 0,
    },
    bottom: {
      type: Number,
      default: 0,
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

    customStyle() {
      const stl = {
        margin: `${this.top}px ${this.right}px ${this.bottom}px ${this.left}px`,
      };

      if (this.w) {
        stl.width = `${this.w}px`;
        stl.height = `${this.h || this.w}px`;
      }

      return stl;
    },
  },
};
</script>

<style scoped>
@import '../../assets/css/star.css';

.ante-star-large-icon {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center center;
}
.ante-star-large-icon-all,
.ante-star-large-icon-gold,
.ante-star-large-icon-silver,
.ante-star-large-icon-bj,
.ante-star-large-icon-fc,
.ante-star-large-icon-hm,
.ante-star-large-icon-hs,
.ante-star-large-icon-ht,
.ante-star-large-icon-jy,
.ante-star-large-icon-nm,
.ante-star-large-icon-qe,
.ante-star-large-icon-sh,
.ante-star-large-icon-sm,
.ante-star-large-icon-zy,
.ante-star-large-icon-zdy,
.ante-star-large-icon-blue,
.ante-star-large-icon-green,
.ante-star-large-icon-pink,
.ante-star-large-icon-purple,
.ante-star-large-icon-red,
.ante-star-large-icon-yellow {
  background-size: 80%;
}
</style>
