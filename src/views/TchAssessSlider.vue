<template>

  <right-slider @tapEvt="$router.go(-1)">
    <bottom-fix>
      <area-center slot="bottom">
        <weui-btn mini>提交</weui-btn>
      </area-center>
    </bottom-fix>
  </right-slider>

</transition>
</template>

<script>
import BottomFix from '../components/layout/BottomFix';
import RightSlider from '../components/layout/RightSlider';

import AreaCenter from '../components/area/AreaCenter';

import WeuiBtn from '../components/button/WeuiBtn';

export default {
  components: {
    BottomFix,
    RightSlider,
    AreaCenter,
    WeuiBtn,
  },
};
</script>

<style>

</style>
