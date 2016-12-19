<template>
<div class="page ante-page-withb">
  <cell-wapper>
    <star-ex-item
      @exchange="exchangeStar('105')"
      :up="false"
      :count="goldStar.leftQty"
      :cancel="goldStar.cancelQty"
      :canExchange="goldStar.canExchange"
      :icon="['gold']"
      :name="['海洋金星']"
      desc="5颗海洋全能星可成为“金星少年”进入金星少年殿堂">
    </star-ex-item>

    <star-ex-item
      @exchange="exchangeStar('104')"
      :count="allStar.leftQty"
      :cancel="allStar.cancelQty"
      :canExchange="allStar.canExchange"
      :icon="['all']"
      :name="['海洋全能星']"
      desc="5颗海洋银星可兑换一颗海洋全能星，并进入金能星殿堂进行风采展示">
    </star-ex-item>

    <star-ex-item
      @exchange="exchangeStar('103')"
      :count="silverStar.leftQty"
      :cancel="silverStar.cancelQty"
      :canExchange="silverStar.canExchange"
      :icon="['silver']"
      :name="['海洋银星']"
      desc="8颗海洋风采星可兑换一颗海洋银星，并进入海洋银星殿堂进行风采展示 ( 或者6颗海洋风采星加一颗自定义星可兑换一颗海洋银星 )">
    </star-ex-item>

    <star-ex-item isFc
      @exchange="exchangeStar('102')"
      :fc="fcStar.leftQty"
      :fccancel="fcStar.cancelQty"
      :zdy="zdyStar.leftQty"
      :zdycancel="zdyStar.cancelQty"
      :icon="['fc', 'zdy']"
      :name="['海洋风采星', '自定义星']"
      btnName="兑换风采星"
      desc="基础星可兑换海洋风采星，兑换标准：身心健康80颗，品格情怀120颗，人文表达120颗，审美雅趣100颗，创新思维40颗">
    </star-ex-item>
  </cell-wapper>
</div>
</template>

<script>
import StarExItem from '../components/star/StarExItem';

export default {
  name: 'star-exchange',
  components: {
    StarExItem,
  },

  data() {
    return {
      goldStar: {},
      allStar: {},
      silverStar: {},
      fcStar: {},
      zdyStar: {},
      baseStar: {},
    };
  },

  methods: {
    loadStarNum() {
      this.$http.post('core/evaluestar/studentstar/findGroupByStarType', {
        studentOrg: this.$route.params.id,
      }).then(res => res.json())
      .then(({ resultBean }) => this.setStarData(resultBean));
    },

    setStarData(res) {
      const types = Object.keys(res);

      types.forEach((item) => {
        switch (item) {
          case '106':
            this.zdyStar = res[item];
            break;
          case '105':
            this.goldStar = res[item];
            break;
          case '104':
            this.allStar = res[item];
            break;
          case '103':
            this.silverStar = res[item];
            break;
          case '102':
            this.fcStar = res[item];
            break;
          default:
            this.baseStar = res[item];
        }
      });
    },

    exchangeStar(type) {
      this.$router.push(`/StarUpgrade/${type}/${this.$route.params.id}`);
    },
  },

  beforeRouteEnter(to, from, next) {
    next(vm => vm.loadStarNum());
  },
};
</script>