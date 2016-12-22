<template>
<div class="ante-star-cell">
  <div class="ante-star-icon" :class="iconCls" :style="iconImg"></div>
  <div class="ante-star-name">{{ name }}</div>
  <div class="ante-star-count"
    v-if="count"><span>{{ count }}</span>&nbsp;颗</div>
  <weui-btn mini v-if="!count"
    @tapEvt="$emit('tapEvt', id)"
    :disabled="!canApply">{{ btnName }}</weui-btn>
</div>
</template>

<script>
export default {
  name: 'star-custom',

  props: {
    id: {
      type: Number,
      default: 0,
    },
    icon: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    count: {
      type: Number,
      default: 0,
    },
    img: {
      type: String,
      default: '',
    },
    canApply: {
      type: Boolean,
      default: false,
    },
    btnName: {
      type: String,
      default: '申请得星',
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

    iconImg() {
      const imgStyle = {};

      if (this.img) {
        imgStyle['background-image'] = `url('${this.img}')`;
      }

      return imgStyle;
    },
  },
};
</script>

<style scoped>
@import '../../assets/css/star.css';

.ante-star-cell {
  display: inline-block;
  text-align: center;
  padding: 14px 12px;
  font-size: 14px;
  vertical-align: top;
}

.ante-star-name {
  color: #888;
  line-height: 2;
}
.ante-star-count {
  line-height: 2;
}
.ante-star-count span {
  color: #ff6a29;
}
.ante-star-icon {
  display: inline-block;
  width: 78px;
  height: 78px;
  border-radius: 10px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  background-color: #fff4bb;
}

.ante-star-icon-zdy {
  background-size: 58px;
  border: 1px solid #ffd08e;
}
</style>
