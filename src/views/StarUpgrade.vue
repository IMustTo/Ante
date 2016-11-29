<template>
  <div class="page">
    <cell-wapper>
      <cell-access name="我要兑换" :caption="star.name"></cell-access>
    </cell-wapper>

    <cell-title title="兑换说明"></cell-title>
    <cell-wapper>
      <div class="ante-icon-wapper">
        <star-large-icon :icon="star.icon"></star-large-icon>
      </div>
      <div class="ante-star-condition">兑换章鱼星需要<span>120</span>颗【人文表达】基础星</div>
      <div class="ante-star-desc">(呵呵呵呵呵呵呵)</div>
    </cell-wapper>

    <p class="weui-btn-area">
      <weui-btn name="兑换" @tapEvt="exchange"></weui-btn>
    </p>
  </div>
</template>

<script>
import StarLargeIcon from '../components/star/StarLargeIcon';

export default {
  name: 'star-upgrade',
  components: {
    StarLargeIcon,
  },

  data() {
    return {
      star: {
        id: 1,
        name: '章鱼星',
        icon: 'zy',
      },
    };
  },

  methods: {
    exchange() {

    },
  },
};
</script>

<style>
.ante-icon-wapper {
  height: 150px;
  padding: 0 80px;
}
.ante-star-condition {
  color: #666;
  padding: 10px 15px;
}
.ante-star-condition span {
  color: #ff540a;
}
.ante-star-desc {
  color: #666;
  font-size: 12px;
  padding: 0 15px 20px;
}
</style>