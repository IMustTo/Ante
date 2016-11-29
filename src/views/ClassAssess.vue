<template>
<div class="page">
  <nav-bar :navbar="navBar" @tapEvt="changePanel">
    <template v-if="currNav === 0">
      <cell-wapper>
        <div class="ante-desc">
          <p>在链接电子白板的电脑上打开下面来链接</p>
          <a href="//www.baidu.com">www.baidu.com</a>
          <p>然后点击下方按钮扫描电脑端二维码即可</p>
        </div>
      </cell-wapper>

      <p class="weui-btn-area">
        <weui-btn name="扫描二维码" @tapEvt="scan"></weui-btn>
      </p>
    </template>

    <bottom-fix v-if="currNav === 1">
      <cell-wapper>
        <cell-access name="周期" :caption="cycle"></cell-access>
        <cell-access name="组织" :caption="org.name"></cell-access>
      </cell-wapper>

      <area-center slot="bottom">
        <weui-btn mini :disabled="!canAssess" @tapEvt="assess">批量评价</weui-btn>
      </area-center>
    </bottom-fix>
  </nav-bar>
</div>
</template>

<script>
import NavBar from '../components/layout/NavBar';
import BottomFix from '../components/layout/BottomFix';
import AreaCenter from '../components/area/AreaCenter';

export default {
  name: 'class-assess',
  components: {
    NavBar,
    BottomFix,
    AreaCenter,
  },

  data() {
    return {
      currNav: 0,
      navBar: ['电子白板评价', '手机端评价'],

      cycle: '2016-8',
      org: {
        id: 1,
        name: '2016级3班',
      },
    };
  },

  computed: {
    canAssess() {
      return this.cycle && this.org.id;
    },
  },

  methods: {
    changePanel(index) {
      this.currNav = index;
    },

    scan() {

    },

    assess() {

    },
  },
};
</script>

<style scoped>
.ante-desc {
  padding: 10px 15px;
  color: #888;
}
</style>
