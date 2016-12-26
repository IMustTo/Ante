<template>
<div class="page">
  <cell-wapper>
    <template v-for="item in records">
      <cell-base :name="item.name">
        <!-- <star-icon slot="icon" :icon="item.icon" :right="8"></star-icon> -->
        <p class="ante-cell-desc">{{ item.date }}</p>
        <p class="ante-cell-desc">{{ item.desc }}</p>
      </cell-base>
    </template>

    <empty-cell v-show="!records.length">本月还没有提交过家庭评价</empty-cell>
  </cell-wapper>
</div>
</template>

<script>
import EmptyCell from '../components/cell/EmptyCell';
import { dateFormat } from '../utils';

export default {
  name: 'prt-assess-records',
  components: {
    EmptyCell,
  },

  data() {
    return {
      orgId: '',
      records: [],
    };
  },

  methods: {
    init() {
      this.orgId = this.$route.params.id;
      this.records = [];
      this.loadListByStd()
        .then(({ resultBean = [] }) => {
          this.records = resultBean.map((item) => {
            item.name = `${item.typeName} + ${item.qty}`;
            item.date = dateFormat(new Date(item.gainTime), 'yyyy年MM月dd日 hh:mm');
            item.desc = item.standardContent;
            return item;
          });
        });
    },

    loadListByStd() {
      return this.$http.post('core/evaluestar/findFamilyEvalueRecord', {
        stuOrgId: this.orgId,
      }).then(res => res.json());
    },
  },

  beforeRouteEnter(to, from, next) {
    next(vm => vm.init());
  },
};
</script>