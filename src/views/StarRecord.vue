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

const StarMap = {
  101: 'blue',
  102: 'green',
  103: 'pink',
  104: 'purple',
  105: 'red',
  601: 'yellow',
  // '116': 'fc',
  106: 'jy',
  107: 'bj',
  108: 'ht',
  109: 'sh',
  110: 'hs',
  111: 'nm',
  112: 'qe',
  113: 'zy',
  114: 'sm',
  115: 'hm',
  117: 'silver',
  118: 'all',
  119: 'gold',
};

export default {
  name: 'star-record',
  components: {
    CellFiller,
    StarCell,
  },

  data() {
    return {
      group: [
        // {
        //   stars: [
        //     { icon: 'gold', name: '海洋金星', count: 2 },
        //     { icon: 'all', name: '海洋全能星', count: 1 },
        //     { icon: 'silver', name: '海洋银星', count: 1 },
        //   ],
        // },
        // {
        //   title: '海洋风采星',
        //   stars: [
        //     { icon: 'hm', name: '海马之星', count: 1 },
        //     { icon: 'qe', name: '企鹅之星', count: 10 },
        //     { icon: 'sh', name: '珊瑚之星', count: 4 },
        //     { icon: 'zy', name: '章鱼之星', count: 3 },
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
        //     { icon: 'green', name: '品格情怀', count: 10 },
        //     { icon: 'pink', name: '创新思维', count: 4 },
        //     { icon: 'purple', name: '调皮捣蛋', count: 3 },
        //   ],
        // },
      ],
    };
  },

  methods: {
    // 查询得星纪录
    loadStarRecords(studentOrg) {
      this.$http.post(`core/evaluestar/studentstar/${studentOrg}/findByStudentId`)
        .then(res => res.json())
        .then(res => this.setStarData(res.resultBean || { starCustom: [], commonStar: {} }));
    },
    // 设置星星数据
    setStarData(res) {
      const group = [];
      const haiyang = { stars: [] };
      const fengcai = { title: '海洋风采星', stars: [] };
      const zidingyi = { title: '自定义星', stars: [] };
      const jichu = { title: '基础星', stars: [] };

      const { starCustom, commonStar } = res;
      const starArr = Object.keys(commonStar);
      starArr.forEach((item) => {
        const { starType, type, typeName, leftQty, cancelQty } = commonStar[item];
        const starItem = {
          icon: StarMap[type], name: typeName, count: leftQty, cancel: cancelQty,
        };

        switch (starType) {
          case '102':
            fengcai.stars.push(starItem);
            break;
          case '103':
            haiyang.stars.push(starItem);
            break;
          default: // 101
            jichu.stars.push(starItem);
        }
      });

      starCustom.forEach(item => zidingyi.stars.push({
        name: item.typeName, count: item.leftQty, cancel: item.cancelQty,
      }));

      if (haiyang.stars.length) {
        group.push(haiyang);
      }
      if (fengcai.stars.length) {
        group.push(fengcai);
      }
      if (zidingyi.stars.length) {
        group.push(zidingyi);
      }
      if (jichu.stars.length) {
        group.push(jichu);
      }

      this.group = group;
    },

    showOneStar(id) {
      this.$router.push(`/StarRecordOne/${id}`);
    },

    showList() {
      this.$router.push(`/StarRecordList/${1}`);
    },
  },

  // 切换路由params更改状态
  beforeRouteEnter(to, from, next) {
    next(vm => vm.loadStarRecords(to.params.id));
  },
};
</script>
