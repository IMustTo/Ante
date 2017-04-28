<template>
<div class="page">
  <cell-wapper>
    <div class="weui-grids">
      <a href="javascript:;" class="weui-grid"
        @click="$router.push(item.path)"
        v-for="item in btns" :key="item.path">
        <div class="weui-grid__icon">
          <img :src="item.img" alt=""></div>
        <p class="weui-grid__label">{{ item.name }}</p>
      </a>
    </div>
  </cell-wapper>
</div>
</template>

<script>
export default {
  data() {
    return {
      btns: [
        { path: '/EvaQuery', name: '评价查询', img: require('../assets/images/eva-query.png') },
        { path: '/EvaLine', name: '评价趋势分析', img: require('../assets/images/eva-line.png') },
        { path: '/EvaRadar', name: '评价雷达图分析', img: require('../assets/images/eva-radar.png') },
        { path: '/EvaRankPre', name: '评价排行榜', img: require('../assets/images/eva-rank.png') },
      ],
    };
  },
};
</script>