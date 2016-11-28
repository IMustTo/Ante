<template>
<div class="page">
  <nav-menu :menus="menus" @tapEvt="tapNav"></nav-menu>
</div>
</template>

<script>
import NavMenu from '../components/button/NavMenu';

export default {
  name: 'honnor-hall',
  components: {
    NavMenu,
  },

  data() {
    return {
      menus: [
        { title: '全校', btns: [{ id: 1, name: '全校' }, { id: 2, name: '2016级1班' }] },
        { title: '全部学期', btns: [{ id: 1, name: '全部学期' }, { id: 2, name: '2016年上学期' }] },
      ],
    };
  },

  methods: {
    tapNav(indexId) {
      const [i, id] = indexId.split('_');
      const { btns } = this.menus[i];

      btns.some((item) => {
        if (item.id == id) { // eslint-disable-line
          this.menus[i].title = item.name;
          return true;
        }

        return false;
      });
    },
  },
};
</script>

<style>

</style>