<template>
<div class="page">

  <template v-for="cells in options">
    <cell-group :cells="cells"></cell-group>
  </template>

  <area-base :top="40">
    <weui-btn>主按钮</weui-btn>
    <weui-btn warn>警示</weui-btn>
    <weui-btn disabled dft>默认 disabled</weui-btn>
    <weui-btn mini>小按钮</weui-btn>
  </area-base>

</div>
</template>

<script>
import AreaBase from '../components/area/AreaBase';
import CellGroup from '../components/cell/CellGroup';
import WeuiBtn from '../components/button/WeuiBtn';

export default {
  name: 'tch-assess',

  components: {
    AreaBase,
    CellGroup,
    WeuiBtn,
  },

  data() {
    return {
      options: [
        [
          {
            name: '周期',
            caption: '2016年8月',
            go: '',
            isLink: true,
          },
          {
            name: '评价类型',
            caption: '人文表达',
            go: '',
            isLink: true,
          },
        ],
        [
          {
            name: '组织',
            caption: '2016级三班',
            go: '',
            isLink: true,
          },
        ],
      ],
    };
  },
};
</script>
