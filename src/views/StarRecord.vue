<template>
<div class="page">
  <template v-for="item in group">
    <cell-title :title="item.title" v-if="item.title"></cell-title>

    <cell-wapper>
      <template v-for="(star, index) in item.stars">
        <star-cell
          @tapEvt="showOneStar"
          :id="Number(star.type)"
          :img="star.img"
          :icon="star.icon"
          :name="star.name"
          :count="star.count"
          :cancel="star.cancel">
        </star-cell>
      </template>
    </cell-wapper>
  </template>

  <cell-wapper>
    <cell-access name="得星纪录" @tapEvt="showList"></cell-access>
  </cell-wapper>

  <cell-filler></cell-filler>
</div>
</template>

<script>
import CellFiller from '../components/cell/CellFiller';
import StarCell from '../components/star/StarCell';
import starRecords from '../mixins/starRecords';

export default {
  name: 'star-record',
  components: {
    CellFiller,
    StarCell,
  },
  mixins: [starRecords],

  data() {
    return {
      group: [
        // {
        //   stars: [
        //     { icon: 'gold', name: '海洋金星', count: 2 },
        //   ],
        // },
        // {
        //   title: '海洋风采星',
        //   stars: [
        //     { icon: 'hm', name: '海马之星', count: 1 },
        //   ],
        // },
        // {
        //   title: '自定义星',
        //   stars: [
        //     { icon: 'zdy', name: '希望之星', count: 1 },
        //   ],
        // },
        // {
        //   title: '基础星',
        //   stars: [
        //     { icon: 'blue', name: '身心健康', count: 1 },
        //   ],
        // },
      ],
    };
  },

  computed: {
    baseIcon() {
      if (this.group.length) {
        const { stars } = this.group[this.group.length - 1];
        if (['green', 'yellow', 'red', 'pink', 'blue', 'purple'].indexOf(stars[0].icon) > -1) {
          return stars[0].icon;
        }
      }

      return 'blue';
    },
  },

  methods: {
    showOneStar(type) {
      if (type < 1) {
        const starId = String(type).split('.')[1];
        this.$router.push(`/StarRecordOne/116/${this.$route.params.id}?starId=${starId}`);
      } else {
        this.$router.push(`/StarRecordOne/${type}/${this.$route.params.id}`);
      }
    },

    showList() {
      this.$router.push(`/StarRecordList/${this.$route.params.id}?base=${this.baseIcon}`);
    },
  },

  // 切换路由params更改状态
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.setStarData(to.params.id).then((group) => {
        vm.group = group;
      });
    });
  },
};
</script>
