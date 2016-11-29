<template>
<div class="weui-tab">
  <div class="weui-navbar">

    <template v-for="(name, index) in navbar">
      <nav-btn
        :checked="checked === index"
        :name="name"
        :index="index"
        @tapEvt="tapNav">
      </nav-btn>
    </template>

  </div>
  <div class="weui-tab__panel">
    <slot></slot>
  </div>
</div>
</template>

<script>
import NavBtn from '../button/NavBtn';

export default {
  name: 'nav-bar',
  props: {
    navbar: {
      type: Array,
      default: [],
    },
  },

  data() {
    return {
      checked: 0,
    };
  },

  components: {
    NavBtn,
  },

  methods: {
    tapNav(index) {
      this.checked = index;
      this.$emit('tapEvt', index);
    },
  },
};
</script>

<style scoped>
.ante-page-content {
  width: 100%;
  height: 100%;
  display: none;
}

.weui-navbar + .weui-tab__panel {
  position: absolute;
  top: 50px;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0;
  height: auto;
  overflow-y: auto;
}
</style>