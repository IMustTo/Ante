<template>
<div class="page">
  <nav-bar v-if="userType === 2" :navbar="navBar" @tapEvt="changePanel">
    <tch-analysis ref="tch" v-show="currNav === 0"></tch-analysis>
    <prt-analysis ref="prt" v-show="currNav === 1"></prt-analysis>
  </nav-bar>

  <tch-analysis ref="tch" v-if="userType === 0"></tch-analysis>
  <prt-analysis ref="prt" v-if="userType === 1"></prt-analysis>
</div>
</template>

<script>
import NavBar from '../components/layout/NavBar';
import TchAnalysis from './TchAnalysis';
import PrtAnalysis from './PrtAnalysis';

export default {
  name: 'common-analysis',
  components: {
    NavBar,
    TchAnalysis,
    PrtAnalysis,
  },

  data() {
    return {
      currNav: 0,
      navBar: ['教师端', '家长端'],

      // 0：教师 1：家长 2：家长加教师
      userType: 0,
    };
  },

  created() {
    const identityList = WWW_CONFIG.identityList || [];

    // 家长
    if (identityList.some(item => item.code === '102')) {
      this.userType = 1;

      // 家长还有其他身份
      if (identityList.some(item => item.code !== '102')) {
        this.userType = 2;
      }
    } else {
      this.userType = 0;
    }
  },

  methods: {
    changePanel(index) {
      this.currNav = index;
    },
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$refs.prt.init();
    });
  },
};
</script>
