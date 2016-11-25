<template>
<div class="page">
  
  <template v-for="item in group">
    <cell-title :title="item.title" v-if="item.title"></cell-title>

    <cell-wapper>
      <template v-for="(star, index) in item.stars">
        <star-cell
          @tapEvt="showOneStar"
          :id="index"
          :icon="star.icon"
          :name="star.name"
          :count="star.count">
        </star-cell>
      </template>
    </cell-wapper>
  </template>

  <cell-wapper>
    <cell-access name="得星纪录" @tapEvt="showRecord"></cell-access>
  </cell-wapper>

  <cell-filler></cell-filler>
</div>
</template>

<script>
import CellTitle from '../components/cell/CellTitle';
import CellWapper from '../components/cell/CellWapper';
import CellAccess from '../components/cell/CellAccess';
import CellFiller from '../components/cell/CellFiller';
import StarCell from '../components/star/StarCell';

export default {
  name: 'star-record',
  components: {
    CellTitle,
    CellWapper,
    CellAccess,
    CellFiller,
    StarCell,
  },

  data() {
    return {
      group: [
        {
          stars: [
            { icon: 'gold', name: '海洋金星', count: 2 },
            { icon: 'all', name: '海洋全能星', count: 1 },
            { icon: 'silver', name: '海洋银星', count: 1 },
          ],
        },
        {
          title: '海洋风采星',
          stars: [
            { icon: 'hm', name: '海马之星', count: 1 },
            { icon: 'qe', name: '企鹅之星', count: 10 },
            { icon: 'sh', name: '珊瑚之星', count: 4 },
            { icon: 'zy', name: '章鱼之星', count: 3 },
          ],
        },
        {
          title: '自定义星',
          stars: [
            { icon: 'zdy', name: '希望之星', count: 1 },
          ],
        },
        {
          title: '基础星',
          stars: [
            { icon: 'blue', name: '身心健康', count: 1 },
            { icon: 'green', name: '品格情怀', count: 10 },
            { icon: 'pink', name: '创新思维', count: 4 },
            { icon: 'purple', name: '调皮捣蛋', count: 3 },
          ],
        },
      ],
    };
  },

  methods: {
    showOneStar(id) {
      this.$router.push(`/StarRecordOne/${id}`);
    },

    showRecord() {
      console.log('xxxx');
    },
  },
};
</script>
