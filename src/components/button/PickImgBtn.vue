<template>
<div class="ante-pick-img"
  :class="cls"
  :style="bgstyle"
  @click="$emit('tapEvt')">
    <i class="anteicon icon-jiahao"></i>
  </div>
</template>

<script>
export default {
  name: 'pick-img-btn',
  props: {
    mini: {
      type: Boolean,
      default: false,
    },

    bgimg: {
      type: String,
      default: '',
    },
  },

  computed: {
    cls() {
      return {
        'ante-pick-img-mini': this.mini,
      };
    },

    bgstyle() {
      return this.bgimg
        ? { 'background-image': `url('${this.bgimg}')` }
        : {};
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
  font-size: 0;
  text-align: center;
  -webkit-background-size: cover;
  background-size: cover;
  background-position: center center;
}
.ante-pick-img .icon-jiahao {
  font-size: 30px;
  color: #bbb;
  line-height: 60px;
}
.ante-pick-img:active {
  background-color: #f0f0f0;
}
.ante-pick-img-mini {
  width: 20px;
  height: 20px;
}
.ante-pick-img-mini .icon-jiahao {
  font-size: 12px;
  line-height: 20px;
}
</style>