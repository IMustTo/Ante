<template>
<div class="page">

  <bottom-fix>
    <template v-for="cells in options">
      <cell-group :cells="cells"></cell-group>
    </template>

    <avatar-list :avatars="avatars"></avatar-list>
  
    <area-center slot="bottom">
      <weui-btn mini>评价</weui-btn>
    </area-center>
  </bottom-fix>

</div>
</template>

<script>
import AreaBase from '../components/area/AreaBase';
import AreaCenter from '../components/area/AreaCenter';
import AvatarList from '../components/list/AvatarList';
import BottomFix from '../components/layout/BottomFix';
import CellGroup from '../components/cell/CellGroup';
import WeuiBtn from '../components/button/WeuiBtn';

export default {
  name: 'tch-assess',

  components: {
    AreaBase,
    AreaCenter,
    AvatarList,
    BottomFix,
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
      avatars: [
        { id: 1, name: '王小明', avatar: '//avatars3.githubusercontent.com/u/7122313?v=3&s=460' },
        { id: 2, name: '王小明', avatar: '//avatars3.githubusercontent.com/u/7122313?v=3&s=460' },
        { id: 3, name: '王小明', avatar: '//avatars3.githubusercontent.com/u/7122313?v=3&s=460' },
        { id: 4, name: '王小明', avatar: '//avatars3.githubusercontent.com/u/7122313?v=3&s=460' },
        { id: 5, name: '王小明', avatar: '//avatars3.githubusercontent.com/u/7122313?v=3&s=460' },
        { id: 6, name: '王小明', avatar: '//avatars3.githubusercontent.com/u/7122313?v=3&s=460' },
      ],
    };
  },
};
</script>
