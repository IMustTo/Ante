<template>
<div class="page">
  <cell-wapper>
    <template v-for="item in records">
      <cell-access :id="item.id" :name="item.name" @tapEvt="showDetail">
        <div slot="icon" class="ante-star-icon"></div>
        <star-icon slot="icon" :icon="item.icon" :right="8"></star-icon>
        <p class="ante-cell-desc">{{ item.date }}</p>
        <p class="ante-cell-desc">{{ item.desc }}</p>
      </cell-access>
    </template>
  </cell-wapper>
</div>
</template>

<script>
import CellWapper from '../components/cell/CellWapper';
import CellAccess from '../components/cell/CellAccess';
import StarIcon from '../components/star/StarIcon';

export default {
  name: 'star-record-list',
  components: {
    CellWapper,
    CellAccess,
    StarIcon,
  },

  data() {
    return {
      records: [
        { id: '1', name: '海洋基础星+2', date: '2016-12-11', desc: '呵呵呵呵呵', icon: 'hm' },
        { id: '1', name: '海洋基础星+2', date: '2016-12-11', desc: '呵呵呵呵呵', icon: 'sh' },
        { id: '1', name: '海洋基础星+2', date: '2016-12-11', desc: '呵呵呵呵呵', icon: 'qe' },
        { id: '1', name: '海洋基础星+2', date: '2016-12-11', desc: '呵呵呵呵呵', icon: 'blue' },
        { id: '1', name: '海洋基础星+2', date: '2016-12-11', desc: '呵呵呵呵呵', icon: 'all' },
      ],
    };
  },

  methods: {
    showDetail(id) {
      this.$router.push(`/StarRecordDetail/${id}`);
    },
  },
};
</script>

<style>

</style>
