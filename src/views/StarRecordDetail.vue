<template>
<div class="page">
  <template v-for="list in group">
    <cell-title>{{ list.title }}</cell-title>
    
    <cell-wapper>
      <template v-for="item in list.data">
        <count-item :desc="item.desc" :count="item.count"></count-item>
      </template>
    </cell-wapper>
  </template>
</div>
</template>

<script>
import CellTitle from '../components/cell/CellTitle';
import CellWapper from '../components/cell/CellWapper';
import CountItem from '../components/list/CountItem';

export default {
  name: 'star-record-detail',
  components: {
    CellTitle,
    CellWapper,
    CountItem,
  },

  data() {
    return {
      group: [
        {
          title: '身心健康',
          data: [
            { desc: '呵呵呵呵呵', count: '2' },
            { desc: '呵呵呵呵呵', count: '3' },
          ],
        },
        {
          title: '品格情怀',
          data: [
            { desc: '呵呵呵呵呵', count: '2' },
            { desc: '呵呵呵呵呵', count: '3' },
          ],
        },
      ],
    };
  },
};
</script>

<style>

</style>