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

    <cell-title title="身心健康"></cell-title>
    <cell-wapper>
      <template v-for="(item, index) in hasStars">
        <cell-num
          @reduce="reduce"
          @increase="increase"
          :i="index"
          :num="item.num"
          :max="item.max"
          :min="item.min"
          :name="item.name">
        </cell-num>
      </template>
    </cell-wapper>

    <p class="weui-btn-area">
      <weui-btn name="兑换" @tapEvt="exchange"></weui-btn>
    </p>
  </div>
</template>

<script>
import StarLargeIcon from '../components/star/StarLargeIcon';
import CellNum from '../components/cell/CellNum';

export default {
  name: 'star-upgrade',
  components: {
    StarLargeIcon,
    CellNum,
  },

  data() {
    return {
      star: {
        id: 1,
        name: '章鱼星',
        icon: 'zy',
      },

      hasStars: [
        { id: 1, name: '海马之星', num: 0, max: 3, min: 0 },
        { id: 2, name: '海豚之星', num: 0, max: 2, min: 0 },
      ],
    };
  },

  methods: {
    // 查询风采星
    // evaluestar/seaStar/findSeaStarTypeList
    reduce(i) {
      this.hasStars[i].num--;
    },
    increase(i) {
      this.hasStars[i].num++;
    },

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