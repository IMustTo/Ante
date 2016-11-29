<template>
<div class="page">

  <nav-bar :navbar="navBar" @tapEvt="changePanel">
    <cell-wapper v-if="currNav === 0">
      <template v-for="item in records">
        <cell-access :id="item.id" :name="item.name" @tapEvt="showDetail">
          <star-icon slot="icon" :icon="item.icon" :right="8"></star-icon>
          <p class="ante-cell-desc">{{ item.date }}</p>
          <p class="ante-cell-desc">{{ item.desc }}</p>
        </cell-access>
      </template>
    </cell-wapper>

    <cell-wapper v-if="currNav === 1">
      <template v-for="item in myRecords">
        <cell-access :id="item.id" :name="item.name" @tapEvt="showDetail">
          <star-icon slot="icon" :icon="item.icon" :right="8"></star-icon>
          <p class="ante-cell-desc">{{ item.date }}</p>
          <p class="ante-cell-desc">{{ item.desc }}</p>
        </cell-access>
      </template>
    </cell-wapper>
  </nav-bar>

</div>
</template>

<script>
import StarIcon from '../components/star/StarIcon';
import NavBar from '../components/layout/NavBar';

export default {
  name: 'star-record-list',
  components: {
    StarIcon,
    NavBar,
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

      myRecords: [
        { id: '1', name: '基础星 + 1', date: '2016-12-11', desc: '哈哈哈', icon: 'blue' },
        { id: '1', name: '基础星 + 1', date: '2016-12-11', desc: '哈哈哈', icon: 'blue' },
        { id: '1', name: '基础星 + 1', date: '2016-12-11', desc: '哈哈哈', icon: 'blue' },
      ],

      navBar: ['全部记录', '我评价的'],

      currNav: 0,
    };
  },

  methods: {
    showDetail(id) {
      this.$router.push(`/StarRecordDetail/${id}`);
    },

    changePanel(index) {
      this.currNav = index;
    },
  },
};
</script>

<style>

</style>
