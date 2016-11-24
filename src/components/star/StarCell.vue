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
.ante-star-icon-all {
  background-image: url('../../assets/images/star-all.png');
}
.ante-star-icon-gold {
  background-image: url('../../assets/images/star-gold.png');
}
.ante-star-icon-silver {
  background-image: url('../../assets/images/star-silver.png');
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
.ante-star-icon-bj {
  background-image: url('../../assets/images/star-bj-m.png');
}
.ante-star-icon-fc {
  background-image: url('../../assets/images/star-fc-m.png');
}
.ante-star-icon-hm {
  background-image: url('../../assets/images/star-hm-m.png');
}
.ante-star-icon-hs {
  background-image: url('../../assets/images/star-hs-m.png');
}
.ante-star-icon-ht {
  background-image: url('../../assets/images/star-ht-m.png');
}
.ante-star-icon-jy {
  background-image: url('../../assets/images/star-jy-m.png');
}
.ante-star-icon-nm {
  background-image: url('../../assets/images/star-nm-m.png');
}
.ante-star-icon-qe {
  background-image: url('../../assets/images/star-qe-m.png');
}
.ante-star-icon-sh {
  background-image: url('../../assets/images/star-sh-m.png');
}
.ante-star-icon-sm {
  background-image: url('../../assets/images/star-sm-m.png');
}
.ante-star-icon-zy {
  background-image: url('../../assets/images/star-zy-m.png');
}

.ante-star-icon-zdy {
  background-image: url('../../assets/images/star-zdy-m.png');
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
.ante-star-icon-blue {
  background-image: url('../../assets/images/star-blue-m.png');
}
.ante-star-icon-green {
  background-image: url('../../assets/images/star-green-m.png');
}
.ante-star-icon-pink {
  background-image: url('../../assets/images/star-pink-m.png');
}
.ante-star-icon-purple {
  background-image: url('../../assets/images/star-purple-m.png');
}
.ante-star-icon-red {
  background-image: url('../../assets/images/star-red-m.png');
}
.ante-star-icon-yellow {
  background-image: url('../../assets/images/star-yellow-m.png');
}
</style>
