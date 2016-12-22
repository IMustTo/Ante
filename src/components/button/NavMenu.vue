<template>
<ul class="ante-nav-mune">
  <template v-for="(li, index) in menus">
    <li>
      <div class="ante-nav-mune-curr"
        :data-id="index"
        @click="choose">{{ li.title }}
        <i class="anteicon" :class="icons[index]"></i>
      </div>

      <ul class="ante-nav-mune-inner" v-if="activeMenu == index">
        <template v-for="item in li.btns">
          <li :data-id="`${index}_${item.id}`"
            @click="chooseItem">{{ item.name }}</li>
        </template>
      </ul>

    </li>
  </template>
</ul>
</template>

<script>
export default {
  props: {
    menus: {
      type: Array,
    },
  },

  data() {
    return {
      activeMenu: 99,
    };
  },

  computed: {
    dfticon() {
      const icons = [];
      this.menus.forEach(() => {
        icons.push('icon-xiajiantou');
      });

      return icons;
    },

    icons() {
      const icons = [].concat(this.dfticon);
      if (icons[this.activeMenu]) {
        icons[this.activeMenu] = 'icon-shangjiantou';
      }

      return icons;
    },
  },

  methods: {
    choose({ target: { dataset: { id } } }) {
      if (this.activeMenu === id) {
        this.activeMenu = 99;
      } else {
        this.activeMenu = id;
      }
    },

    chooseItem({ target: { dataset: { id } } }) {
      this.activeMenu = 99;

      this.$emit('tapEvt', id);
    },
  },
};
</script>

<style scoped>
.ante-nav-mune {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.ante-nav-mune li {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;

  height: 44px;
  line-height: 44px;
  text-align: center;
  background-color: #fff;
  position: relative;
}
.ante-nav-mune > li:not(:last-child):after {
  content: " ";
  position: absolute;
  bottom: 0;
  top: 0;
  right: 0;
  width: 1px;
  border-right: 1px solid #D9D9D9;
  color: #D9D9D9;
  -webkit-transform-origin: 50% 0;
  transform-origin: 50% 0;
  -webkit-transform: scaleX(0.5);
  transform: scaleX(0.5);
}
.ante-nav-mune-curr {
  color: #888;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.ante-nav-mune-inner {
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  box-shadow: 1px 1px 5px #bbb;
  z-index: 100;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.ante-nav-mune-inner > li:active {
  background-color: #dfdfdf;
}
.ante-nav-mune-inner > li:not(:last-child):after {
  content: " ";
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 1px solid #D9D9D9;
  color: #D9D9D9;
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
</style>