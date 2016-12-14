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
        <weui-btn name="扫描二维码" @tapEvt="scanQrcode()"></weui-btn>
      </p>
    </template>

    <bottom-fix v-if="currNav === 1">
      <cell-wapper>
        <cell-base name="周期" :caption="cycle"></cell-base>
        <cell-access name="组织"
          @tapEvt="$router.push('/SelectClass')"
          :caption="currClass.name"></cell-access>
      </cell-wapper>

      <area-center slot="bottom">
        <weui-btn mini :disabled="!canAssess" @tapEvt="assess">批量评价</weui-btn>
      </area-center>
    </bottom-fix>
  </nav-bar>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import NavBar from '../components/layout/NavBar';
import BottomFix from '../components/layout/BottomFix';
import AreaCenter from '../components/area/AreaCenter';
import scan from '../mixins/scan';
import { dateFormat } from '../utils';

export default {
  name: 'class-assess',
  components: {
    NavBar,
    BottomFix,
    AreaCenter,
  },
  mixins: [scan],

  data() {
    return {
      currNav: 0,
      navBar: ['电子白板评价', '手机端评价'],

      cycle: dateFormat(new Date(), 'yyyy年MM月'),
    };
  },

  computed: {
    ...mapGetters({
      checkedClass: 'getCheckedClass',
    }),

    currClass() {
      let cls = {};

      if (this.checkedClass.id) {
        cls = this.checkedClass;
      }

      return cls;
    },

    canAssess() {
      return this.checkedClass && this.checkedClass.id;
    },
  },

  created() {
    if (!this.checkedClass || !this.checkedClass.id) {
      this.loadDefaultOrg();
    }
  },

  methods: {
    ...mapActions([
      'checkOneClass',
    ]),

    changePanel(index) {
      this.currNav = index;
    },

    // 查询默认班级
    loadDefaultOrg() {
      this.$http
        .post('core/evaluestar/findDefaultOrg')
        .then(response => response.json())
        .then(({ resultBean }) => {
          const org = {
            name: resultBean.orgName || '',
            id: resultBean.orgId || 0,
          };
          this.checkOneClass({ org });
        });
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
