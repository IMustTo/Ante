<template>
  <div class="container" id="container">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>

    <weui-progress :w="w"></weui-progress>
    <weui-loading v-show="loading"></weui-loading>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import WeuiProgress from './components/loading/WeuiProgress';
import { getRouter } from './utils';

export default {
  name: 'app',

  components: {
    WeuiProgress,
  },

  data() {
    return {
      transitionName: '',
    };
  },

  computed: {
    ...mapGetters({
      w: 'getProgress',
      loading: 'getLoadingStatus',
    }),
  },

  created() {
    // 从参数中获取路由，决定跳转至那个页面
    const router = getRouter('router');
    if (router) this.$router.push(router);
  },
};
</script>

<style>
@import "./assets/css/weui.css";
@import "./assets/css/common.css";

body,
html {
  height: 100%;

  -webkit-tap-highlight-color: transparent;
}
body {
  font-family: -apple-system-font,Helvetica Neue,Helvetica,sans-serif;
}
ul {
  list-style: none;
}
.page,
body {
  background-color: #f0f0f0;
}
.container {
  overflow: hidden;
}
.container,
.page {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.page {
  z-index: 1;

  overflow-y: auto;

  -webkit-overflow-scrolling: touch;
}
</style>
