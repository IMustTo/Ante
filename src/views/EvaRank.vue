<template>
<div class="page">
  <cell-title>{{ title }}排行榜</cell-title>
  <cell-wapper>
    <cell-base v-for="item in rank"
      :name="item.className"
      :caption="String(item.totalQty)">
      <div slot="icon" class="red-font">{{ item.index }}</div>
    </cell-base>

    <empty-cell v-show="!rank.length">暂无相关数据</empty-cell>
  </cell-wapper>
</div>
</template>

<script>
import EmptyCell from 'components/cell/EmptyCell';

export default {
  components: { EmptyCell },
  data() {
    return {
      rank: [],
      title: '',
    };
  },

  methods: {
    init() {
      const { type } = this.$route.query;

      switch (type) {
        case '105':
          this.title = '海洋全能星';
          break;
        case '104':
          this.title = '海洋金星';
          break;
        case '103':
          this.title = '海洋银星';
          break;
        default:
          this.title = '';
      }
      this.loadData();
    },

    loadData() {
      const { id, type } = this.$route.query;
      this.$http.post('core/evaluestar/statistics/findRankingList', {
        starType: type,
        termId: id,
      }).then(res => res.json())
      .then(({ resultBean }) => {
        const res = [];
        resultBean.forEach((item, index) => {
          if (res[index - 1] && res[index - 1].totalQty === item.totalQty) {
            res.push({
              index: res[index - 1].index,
              ...item,
            });
          } else {
            res.push({
              index: index + 1 < 10 ? `0${index + 1}` : index + 1,
              ...item,
            });
          }
        });

        this.rank = res;
      });
    },
  },

  // 切换路由params更改状态
  beforeRouteEnter(to, from, next) {
    next(vm => vm.init());
  },
};
</script>

<style>
.red-font {
  color: red;
  font-size: 20px;
  width: 40px;
  text-align: center;
  font-style: italic;
}
</style>