<template>
<div class="page">
  <nav-menu :menus="menus" @tapEvt="tapNav"></nav-menu>

  <honor-area>
    <tab-bar :tabbar="tabBar" @tapEvt="changePanel">

      <template v-for="(list, i) in avatars">
        <avatar-list  v-if="i === currTab">
          <template v-for="(item, index) in list">
            <avatar-cell
              @tapEvt="checkAvatar"
              :id="index"
              :name="item.name"
              :ban="item.ban"
              :date="item.date"
              :avatar="item.avatar">
            </avatar-cell>
          </template>
        </avatar-list>
      </template>

    </tab-bar>
  </honor-area>

</div>
</template>

<script>
import NavMenu from '../components/button/NavMenu';
import HonorArea from '../components/area/HonorArea';
import TabBar from '../components/layout/TabBar';
import AvatarList from '../components/list/AvatarList';
import AvatarCell from '../components/avatar/AvatarCell';

export default {
  name: 'honnor-hall',
  components: {
    NavMenu,
    HonorArea,
    TabBar,
    AvatarList,
    AvatarCell,
  },

  data() {
    return {
      menus: [
        { title: '全校', btns: [{ id: 1, name: '全校' }, { id: 2, name: '2016级1班' }] },
        { title: '全部学期', btns: [{ id: 1, name: '全部学期' }, { id: 2, name: '2016年上学期' }] },
      ],
      currTab: 0,
      tabBar: ['金星殿堂', '全能星殿堂', '银星殿堂'],

      avatars: [
        [
          { id: 1, name: '王小明', avatar: '//avatars3.githubusercontent.com/u/7122313?v=3&s=460', ban: '2016级2班' },
          { id: 1, name: '王小明', avatar: '//avatars3.githubusercontent.com/u/7122313?v=3&s=460', ban: '2016级2班' },
          { id: 1, name: '王小明', avatar: '//avatars3.githubusercontent.com/u/7122313?v=3&s=460', ban: '2016级2班' },
          { id: 1, name: '王小明', avatar: '//avatars3.githubusercontent.com/u/7122313?v=3&s=460', ban: '2016级2班' },
        ],
        [
          { id: 1, name: '哈哈哈', avatar: '//avatars3.githubusercontent.com/u/7122313?v=3&s=460', ban: '2016级2班' },
          { id: 1, name: '哈哈哈', avatar: '//avatars3.githubusercontent.com/u/7122313?v=3&s=460', ban: '2016级2班' },
          { id: 1, name: '哈哈哈', avatar: '//avatars3.githubusercontent.com/u/7122313?v=3&s=460', ban: '2016级2班' },
          { id: 1, name: '哈哈哈', avatar: '//avatars3.githubusercontent.com/u/7122313?v=3&s=460', ban: '2016级2班' },
        ],
        [
          { id: 1, name: '呵呵呵', avatar: '//avatars3.githubusercontent.com/u/7122313?v=3&s=460', ban: '2016级2班' },
          { id: 1, name: '呵呵呵', avatar: '//avatars3.githubusercontent.com/u/7122313?v=3&s=460', ban: '2016级2班' },
          { id: 1, name: '呵呵呵', avatar: '//avatars3.githubusercontent.com/u/7122313?v=3&s=460', ban: '2016级2班' },
          { id: 1, name: '呵呵呵', avatar: '//avatars3.githubusercontent.com/u/7122313?v=3&s=460', ban: '2016级2班' },
        ],
      ],
    };
  },

  methods: {
    tapNav(indexId) {
      const [i, id] = indexId.split('_'); // '${i}_${id}'
      const { btns } = this.menus[i];

      btns.some((item) => {
        if (item.id == id) { // eslint-disable-line
          this.menus[i].title = item.name;
          return true;
        }

        return false;
      });
    },

    changePanel(index) {
      this.currTab = index;
    },

    checkAvatar(id) {
      this.$router.push(`/StdShow/${id}`);
    },
  },
};
</script>

<style>

</style>