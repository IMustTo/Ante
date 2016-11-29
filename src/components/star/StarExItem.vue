<template>
<div class="ante-star-exwapper">
  <div class="ante-star-exup" v-if="up">
    <template v-for="(item, index) in icon">
      <div class="ante-star-icon-wapper">
        <i class="anteicon icon-hecheng"></i>
      </div>
    </template>
  </div>
  <div class="ante-star-exitem">
    <div class="ante-star-exitem-icon">

      <template v-for="(item, index) in icon">
        <div class="ante-star-icon-wapper">
          <star-icon :icon="item"></star-icon>
          <div class="ante-star-name">{{ name[index] }}</div>
        </div>
      </template>

    </div>
    <div class="ante-star-exitem-bd">
      <div class="ante-star-count">
        <div class="ante-star-excount"><span>{{ count }}</span>颗</div>
        <weui-btn mini name="兑换" @tapEvt="$emit('exchange')"></weui-btn>
      </div>
      <div class="ante-star-desc">{{ desc }}</div>
    </div>
  </div>
</div>
</template>

<script>
import StarIcon from './StarIcon';

export default {
  name: 'star-ex-item',
  props: {
    up: {
      type: Boolean,
      default: true,
    },
    icon: Array,
    name: Array,
    desc: String,
    count: {
      type: Number,
      default: 0,
    },
  },
  components: {
    StarIcon,
  },
};
</script>

<style scoped>
.ante-star-exwapper {
  padding-right: 20px;
}
.ante-star-exwapper:first-child {
  padding-top: 10px;
}
.ante-star-exwapper:last-child {
  padding-bottom: 10px;
}

.ante-star-exitem {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
}
.ante-star-exitem-icon {
  width: 150px;
  text-align: center;
}
.ante-star-exitem-bd {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
}

.ante-star-exup {
  width: 150px;
  text-align: center;
  color: #6096cb;
}
.ante-star-exup i.anteicon {
  font-size: 20px;
}
.ante-star-icon-wapper {
  display: inline-block;
  width: 75px;
  text-align: center;
}
.ante-star-list-icon {
  display: inline-block;
}
.ante-star-name {
  margin-top: 5px;
  font-size: 14px;
  color: #888;
}

.ante-star-excount {
  float: left;
  line-height: 2.3;
  font-size: 13px;
}
.ante-star-excount span {
  color: #ff540a;
}
.ante-star-count > .weui-btn {
  float: right;
}
.ante-star-desc {
  color: #888;
  clear: both;
  font-size: 13px;
  padding-top: 8px;
}
</style>