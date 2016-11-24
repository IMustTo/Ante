<template>

  <right-slider @tapEvt="$router.go(-1)">
    <bottom-fix>

      <template v-for="list in group">
        <cell-title :title="list.title"></cell-title>

        <cell-wapper>
          <template v-for="star in list.stars">
            <star-item
              @changeEvt="change"
              :id="star.id"
              :desc="star.desc">
            </star-item>
          </template>
        </cell-wapper>
      </template>

      <cell-title title="评价"></cell-title>
      <weui-textarea placeholder="写一下评语（非必填）"
        @inputEvt="comment">
      </weui-textarea>

      <weui-toast v-if="showSuc">评价成功</weui-toast>

      <area-center slot="bottom">
        <weui-btn mini @tapEvt="tipSuccess">提交</weui-btn>
      </area-center>

    </bottom-fix>
  </right-slider>

</template>

<script>
import BottomFix from '../components/layout/BottomFix';
import RightSlider from '../components/layout/RightSlider';

import AreaCenter from '../components/area/AreaCenter';
import CellTitle from '../components/cell/CellTitle';
import CellWapper from '../components/cell/CellWapper';
import WeuiBtn from '../components/button/WeuiBtn';
import StarItem from '../components/list/StarItem';
import WeuiTextarea from '../components/input/WeuiTextarea';

import WeuiToast from '../components/toast/WeuiToast';

export default {
  components: {
    BottomFix,
    RightSlider,
    AreaCenter,
    CellTitle,
    CellWapper,
    WeuiBtn,
    WeuiTextarea,
    StarItem,
    WeuiToast,
  },

  data() {
    return {
      group: [
        {
          title: '身心健康',
          stars: [
            { id: 1, desc: '顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶' }, { id: 2, desc: '顶顶顶顶顶顶顶顶' },
          ],
        },
        { title: '品格情怀', stars: [] },
      ],

      showSuc: false,
      timeout: null,

      commentContent: '',
    };
  },

  methods: {
    change(id, checked) {
      console.log(id);
      console.log(checked);
    },

    comment(value) {
      this.commentContent = value;
    },

    tipSuccess() {
      this.showSuc = true;

      this.timeout = setTimeout(() => {
        this.leave();
      }, 1500);
    },

    leave() {
      if (this.timeout) {
        this.showSuc = false;
        clearTimeout(this.timeout);
        this.timeout = null;
      }

      this.$router.go(-1);
    },
  },
};
</script>

<style>

</style>
