<template>
<div class="page">

  <bottom-fix>
    <template v-for="cells in options">
      <cell-group :cells="cells"></cell-group>
    </template>

    <avatar-list v-if="avatars.length">
      <template v-for="(item, index) in avatars">
        <avatar-item
          @changeEvt="checkAvatar"
          :check="item.check"
          :id="index"
          :name="item.name"
          :avatar="item.avatar">
        </avatar-item>
      </template>
    </avatar-list>
  
    <area-center slot="bottom">
      <weui-btn mini plain
        @tapEvt="selectAll"><i class="ante-icon-inbtn"
          :class="checkAllBtnCls"></i>&emsp;全选</weui-btn>
      <weui-btn mini :disabled="!canAssess" @tapEvt="showSliderPage">评价</weui-btn>
    </area-center>
  </bottom-fix>

  <transition enter-active-class="slideIn" leave-active-class="slideOut">
    <router-view></router-view>
  </transition>

</div>
</template>

<script>
import BottomFix from '../components/layout/BottomFix';
import RightSlider from '../components/layout/RightSlider';

import AreaBase from '../components/area/AreaBase';
import AreaCenter from '../components/area/AreaCenter';

import AvatarList from '../components/list/AvatarList';
import AvatarItem from '../components/list/AvatarItem';
import CellGroup from '../components/cell/CellGroup';

export default {
  name: 'tch-assess',

  components: {
    AreaBase,
    AreaCenter,
    AvatarList,
    AvatarItem,
    BottomFix,
    RightSlider,
    CellGroup,
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
        { id: 1, name: '王小明', check: false, avatar: '//avatars3.githubusercontent.com/u/7122313?v=3&s=460' },
        { id: 2, name: '王小明', check: false, avatar: '//avatars3.githubusercontent.com/u/7122313?v=3&s=460' },
        { id: 3, name: '王小明', check: false, avatar: '//avatars3.githubusercontent.com/u/7122313?v=3&s=460' },
        { id: 4, name: '王小明', check: false, avatar: '//avatars3.githubusercontent.com/u/7122313?v=3&s=460' },
        { id: 5, name: '王小明', check: false, avatar: '//avatars3.githubusercontent.com/u/7122313?v=3&s=460' },
        { id: 6, name: '王小明', check: false, avatar: '//avatars3.githubusercontent.com/u/7122313?v=3&s=460' },
        { id: 11, name: '王小明', check: false, avatar: '//avatars3.githubusercontent.com/u/7122313?v=3&s=460' },
        { id: 12, name: '王小明', check: false, avatar: '//avatars3.githubusercontent.com/u/7122313?v=3&s=460' },
        { id: 13, name: '王小明', check: false, avatar: '//avatars3.githubusercontent.com/u/7122313?v=3&s=460' },
        { id: 14, name: '王小明', check: false, avatar: '//avatars3.githubusercontent.com/u/7122313?v=3&s=460' },
        { id: 15, name: '王小明', check: false, avatar: '//avatars3.githubusercontent.com/u/7122313?v=3&s=460' },
        { id: 16, name: '王小明', check: false, avatar: '//avatars3.githubusercontent.com/u/7122313?v=3&s=460' },
      ],

      checkedAvatar: [],

      showSlider: false,
    };
  },

  computed: {
    checkAllBtnCls() {
      const checked = !!(this.avatars.length &&
        (this.checkedAvatar.length === this.avatars.length));

      return {
        'weui-icon-success': checked,
        'weui-icon-circle': !checked,
      };
    },

    canAssess() {
      return !!(this.avatars.length && this.checkedAvatar.length);
    },
  },

  methods: {
    checkAvatar(index, value) {
      this.avatars[index].check = value;
      const { id } = this.avatars[index];

      if (value) {
        this.checkedAvatar.push(id);
      } else {
        const i = this.checkedAvatar.indexOf(id);
        this.checkedAvatar.splice(i, 1);
      }
    },

    selectAll() {
      let check = true;
      if (this.avatars.length === this.checkedAvatar.length) {
        check = false;
      }

      this.checkedAvatar = [];
      this.avatars.forEach(({ id }, index) => {
        this.avatars[index].check = check;

        if (check) this.checkedAvatar.push(id);
      });
    },

    showSliderPage() {
      // const path = this.$router.fullPath;
      this.showSlider = this.$router.push({ name: 'slider' });
    },
  },
};
</script>

<style scoped>
.ante-icon-inbtn {
  font-size: 14px;
  position: absolute;
  left: 10px;
  top: 7px;
}
</style>