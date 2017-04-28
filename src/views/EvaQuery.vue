<template>
<div class="page">
  <nav-choose @org="changeOrg" @term="changeTerm"></nav-choose>

  <div class="star-group" v-for="star in stars">
    <div class="star-title">{{ star.typeName }}  {{ star.totalQty }}颗</div>

    <div class="star-items">
      <div v-for="item in star.detailTypeList"
        class="star-item">{{ item.typeName }}：{{ item.totalQty }}颗</div>
    </div>
  </div>
  
  <cell-wapper v-show="!stars.length">
    <empty-cell>暂无数据</empty-cell>
  </cell-wapper>
</div>
</template>

<script>
import NavChoose from 'src/modules/NavChoose';
import EmptyCell from 'components/cell/EmptyCell';

export default {
  name: 'eva-query',

  components: {
    NavChoose,
    EmptyCell,
  },

  data() {
    return {
      stars: [],
      orgId: 0,
      termId: 0,
    };
  },

  created() {
    this.init();
  },

  methods: {
    init() {
      this.queryByParams()
        .then(res => (this.stars = res));
    },

    queryByParams() {
      const params = {};
      if (this.orgId) params.orgId = this.orgId;
      if (this.termId) {
        switch (this.termId) {
          case -1:
            params.month = 1;
            break;
          case -3:
            params.month = 3;
            break;
          default:
            params.term = this.termId;
        }
      }

      return this.$http
        .post('/core/evaluestar/statistics/findByOrgAndDate', params)
        .then(res => res.json())
        .then(({ resultBean }) => resultBean);
    },

    changeOrg(orgId) {
      this.orgId = orgId;
    },

    changeTerm(termId) {
      this.termId = termId;
    },
  },

  watch: {
    orgId() {
      this.init();
    },
    termId() {
      this.init();
    },
  },
};
</script>

<style scoped>
.star-group {
  padding: 10px 15px;
  background-color: #fdfdfd;
}
.star-group {
  border-top: 1px solid #f0f0f0;
}
.star-title {
  font-weight: 900;
}
.star-items {
  font-size: 0;
}
.star-item {
  width: 50%;
  display: inline-block;
  font-size: 14px;
  padding: 5px 0;
  vertical-align: top;
}
</style>