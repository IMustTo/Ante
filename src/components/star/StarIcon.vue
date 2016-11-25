<template>
<div class="ante-star-list-icon"
  :class="iconCls"
  :style="customStyle">
</div>
</template>

<script>
export default {
  name: 'star-icon',

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
        cls[`ante-star-icon-${this.icon}`] = true;
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

.ante-star-list-icon {
  width: 65px;
  height: 65px;
  border-radius: 10px;
  background-repeat: no-repeat;
  background-position: center center;
}
.ante-star-icon-all,
.ante-star-icon-gold,
.ante-star-icon-silver {
  background-size: cover;
}

.ante-star-icon-bj,
.ante-star-icon-fc,
.ante-star-icon-hm,
.ante-star-icon-hs,
.ante-star-icon-ht,
.ante-star-icon-jy,
.ante-star-icon-nm,
.ante-star-icon-qe,
.ante-star-icon-sh,
.ante-star-icon-sm,
.ante-star-icon-zy,
.ante-star-icon-zdy,
.ante-star-icon-blue,
.ante-star-icon-green,
.ante-star-icon-pink,
.ante-star-icon-purple,
.ante-star-icon-red,
.ante-star-icon-yellow {
  background-size: 45px;
}
</style>
