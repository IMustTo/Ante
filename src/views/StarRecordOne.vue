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
    <weui-btn dft>撤销</weui-btn>
  </area-base>
</div>
</template>

<script>
import CellTitle from '../components/cell/CellTitle';
import CellWapper from '../components/cell/CellWapper';
import CellBase from '../components/cell/CellBase';
import BigStar from '../components/star/BigStar';
import StarSum from '../components/star/StarSum';
import AreaBase from '../components/area/AreaBase';
import WeuiBtn from '../components/button/WeuiBtn';

export default {
  name: 'star-record-one',
  components: {
    BigStar,
    StarSum,
    CellTitle,
    CellWapper,
    CellBase,
    AreaBase,
    WeuiBtn,
  },

  data() {
    return {
      records: [
        { name: '海洋金星 + 1', date: '2015年10月23日', desc: '哈哈哈哈哈' },
        { name: '海洋金星 + 1', date: '2015年10月23日', desc: '哈哈哈哈哈' },
      ],
    };
  },
};
</script>
