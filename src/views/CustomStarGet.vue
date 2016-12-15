<template>
<div class="page">
  <bottom-fix>
    <cell-wapper>
      <cell-base name="学生" :caption="studentName"></cell-base>
      <cell-base name="自定义星" :caption="star.name">
        <div slot="descimg" class="ante-star-custom-default" :style="iconbg"></div>
      </cell-base>
    </cell-wapper>

    <cell-title>评价标准</cell-title>
    <cell-wapper>
      <template v-for="item in benchmarks">
        <cell-base :name="item"></cell-base>
      </template>
    </cell-wapper>

    <cell-title>申请说明</cell-title>
    <cell-wapper>
      <input-delete holder="简单说明一下申请得星的理由"
        @inputEvt="addReason">
      </input-delete>
    </cell-wapper>
    <cell-title tip>经过相关老师审批通过后可以获得一颗星星</cell-title>

    <weui-toast v-if="showSuc">申请成功</weui-toast>

    <area-center slot="bottom">
      <weui-btn mini :disabled="!canApply" @tapEvt="applyStar">申请</weui-btn>
    </area-center>
  </bottom-fix>
</div>
</template>

<script>
import BottomFix from '../components/layout/BottomFix';
import AreaCenter from '../components/area/AreaCenter';

import PickImgBtn from '../components/button/PickImgBtn';
import WeuiInput from '../components/input/WeuiInput';
import InputDelete from '../components/input/InputDelete';

export default {
  name: 'custom-star-get',
  components: {
    BottomFix,
    AreaCenter,
    PickImgBtn,
    WeuiInput,
    InputDelete,
  },

  data() {
    return {
      studentName: '',

      star: {
        name: '',
        imageUrl: '',
      },

      benchmarks: [],

      reason: '',

      showSuc: false,
    };
  },

  computed: {
    iconbg() {
      let bg = {};

      if (this.star.imageUrl) {
        bg = {
          'background-image': `url('${this.star.imageUrl}')`,
          'background-size': 'cover',
        };
      }

      return bg;
    },

    canApply() {
      return (
        this.star.id &&
        this.reason
      );
    },
  },


  methods: {
    // 查询自定义星信息
    loadStarInfo() {
      this.$http.post('core/evaluestar/starCustom/findStarCustomById', {
        starCustomId: this.$route.params.id,
      }).then(res => res.json())
      .then(({ resultBean }) => {
        const { id, name, studentName, imageUrl, customContentList } = resultBean;
        this.star = { id, name, imageUrl };
        this.studentName = studentName;
        this.benchmarks = customContentList;
      });
    },

    // 获得原因
    addReason(value) {
      this.reason = value;
    },

    // 申请得星
    applyStar() {
      this.$http.post('core/evaluestar/starCustom/updateStarCustom/104', {
        status: 104,
        id: this.star.id,
        remark: this.reason,
      }).then(res => res.json())
      .then(({ resultCode }) => {
        if (resultCode === 'JSPE-200') {
          this.tipSuccess();
        }
      });
    },

    // 成功提示
    tipSuccess() {
      this.showSuc = true;

      this.timeout = setTimeout(() => {
        this.leave();
      }, 1500);
    },

    // 返回自定义星页面
    leave() {
      if (this.timeout) {
        this.showSuc = false;
        clearTimeout(this.timeout);
        this.timeout = null;
      }

      this.$router.go(-1);
    },
  },

  beforeRouteEnter(to, from, next) {
    next(vm => vm.loadStarInfo());
  },
};
</script>
