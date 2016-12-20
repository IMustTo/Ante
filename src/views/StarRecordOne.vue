<template>
<div class="page">
  <big-star></big-star>
  <star-sum name="海洋金星" :count="3"></star-sum>
  <cell-title tip>哈哈哈哈哈哈哈</cell-title>

  <cell-wapper>
    <template v-for="item in records">
      <cell-base :name="item.name">
        <p class="ante-cell-desc">{{ item.date }}</p>
        <p class="ante-cell-desc">{{ item.desc }}</p>
      </cell-base>
    </template>
  </cell-wapper>

  <area-base>
    <weui-btn dft @tapEvt="dropStar">撤销</weui-btn>
  </area-base>
</div>
</template>

<script>
import BigStar from '../components/star/BigStar';
import StarSum from '../components/star/StarSum';
import AreaBase from '../components/area/AreaBase';

export default {
  name: 'star-record-one',
  components: {
    BigStar,
    StarSum,
    AreaBase,
  },

  data() {
    return {
      type: '',
      orgId: '',
      records: [
        { name: '海洋金星 + 1', date: '2015年10月23日', desc: '哈哈哈哈哈' },
        { name: '海洋金星 + 1', date: '2015年10月23日', desc: '哈哈哈哈哈' },
      ],
    };
  },

  methods: {
    dropStar() {
      this.$router.push(`/DropStar/${this.type}/${this.orgId}`);
    },
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.type = to.params.type;
      vm.orgId = to.params.id;
      // vm.records = []; TODO
    });
  },
};
</script>
