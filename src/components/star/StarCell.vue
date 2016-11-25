<template>
<div class="ante-star-cell" @click="$emit('tapEvt', id)">
  <div class="ante-star-icon" :class="iconCls"></div>
  <div class="ante-star-name">{{ name }}</div>
  <div class="ante-star-count"><span>{{ count }}</span>&nbsp;颗</div>
</div>
</template>

<script>
export default {
  name: 'star-cell',

  props: ['id', 'icon', 'name', 'count'],

  computed: {
    iconCls() {
      const cls = {};
      if (this.icon) {
        cls[`ante-star-icon-${this.icon}`] = true;
      }

      return cls;
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
}
.ante-star-cell:active {
  background-color: #dfdfdf;
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
  width: 78px;
  height: 78px;
  border-radius: 10px;
  background-repeat: no-repeat;
  background-position: center center;
}
.ante-star-icon-all,
.ante-star-icon-gold,
.ante-star-icon-silver {
  width: 80px;
  height: 80px;
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
.ante-star-icon-zy {
  background-size: 58px;
  border: 1px solid #d6e5f1;
  background-color: #e5f3ff;
}

.ante-star-icon-zdy {
  background-size: 58px;
  border: 1px solid #ffd08e;
  background-color: #fff4bb;
}

.ante-star-icon-blue,
.ante-star-icon-green,
.ante-star-icon-pink,
.ante-star-icon-purple,
.ante-star-icon-red,
.ante-star-icon-yellow {
  background-size: 58px;
}
</style>
