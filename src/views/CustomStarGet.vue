<template>
<div class="page">
  <bottom-fix>
    <cell-wapper>
      <cell-access name="学生" :caption="student.name"></cell-access>
      <cell-access name="自定义星" :caption="star.name"></cell-access>
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
      student: {
        id: 1,
        name: '王小明',
      },

      star: {
        id: 1,
        name: '开心快乐星',
      },

      benchmarks: [
        '身体健康',
        '顽皮捣蛋',
        '欺师灭祖，哇哈哈哈',
      ],

      reason: '',
    };
  },

  computed: {
    canApply() {
      return (
        this.student.id &&
        this.star.id &&
        this.reason
      );
    },
  },

  methods: {
    addReason(value) {
      this.reason = value;
    },

    applyStar() {

    },
  },
};
</script>

<style>

</style>