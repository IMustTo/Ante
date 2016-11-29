<template>
<div class="page">
  <bottom-fix>
    <cell-wapper>
      <cell-access name="学生"
        :caption="student.name"
        @tapEvt="selectStd">
      </cell-access>
      <weui-input name="星星名称" holder="给星星起个名字吧" @inputEvt="nameStar">
      </weui-input>
      <cell-base name="上传标志">
        <pick-img-btn slot="desc" @tapEvt="selectImg"></pick-img-btn>
      </cell-base>
    </cell-wapper>

    <cell-title title="评价标准"></cell-title>
    <cell-wapper>
      <template v-for="(item, index) in benchmarks">
        <input-delete
          holder="请输入一条评价标准"
          @tapEvt="deleteBenchmark"
          @inputEvt="inputBenchmark"
          :index="index"
          :canDelete="item.canDelete">
        </input-delete>
      </template>

      <cell-base name="增加一条" @tapEvt="addBenchmark">
        <pick-img-btn slot="icon" mini></pick-img-btn>
        <span slot="icon">&nbsp;</span>
      </cell-base>
    </cell-wapper>

    <cell-title title="创建原因"></cell-title>
    <cell-wapper>
      <input-delete holder="请输入创建这颗星星的原因"
        @inputEvt="addReason">
      </input-delete>
    </cell-wapper>
    <cell-title tip>经过相关老师审批通过才能生效</cell-title>

    <area-center slot="bottom">
      <weui-btn mini :disabled="!canCreate" @tapEvt="create">申请创建</weui-btn>
    </area-center>
  </bottom-fix>
</div>
</template>

<script>
import BottomFix from '../components/layout/BottomFix';
import AreaCenter from '../components/area/AreaCenter';
import WeuiInput from '../components/input/WeuiInput';
import InputDelete from '../components/input/InputDelete';
import PickImgBtn from '../components/button/PickImgBtn';

export default {
  name: 'custom-star',
  components: {
    AreaCenter,
    BottomFix,
    WeuiInput,
    InputDelete,
    PickImgBtn,
  },

  data() {
    return {
      student: {
        name: '王小明',
        id: 1,
      },
      starName: '',

      benchmarks: [
        { value: '' },
      ],

      reason: '',
    };
  },

  computed: {
    canCreate() {
      return (
        this.student.id &&
        this.starName &&
        this.benchmarks.some(item => item.value) &&
        this.reason
      );
    },
  },

  methods: {
    nameStar(value) {
      this.starName = value;
    },

    selectStd() {
      // TODO
    },

    selectImg() {
      // TODO
    },

    addBenchmark() {
      this.benchmarks.push({ value: '', canDelete: true });
    },

    deleteBenchmark(index) {
      this.benchmarks.splice(index, 1);
    },

    inputBenchmark(value, index) {
      this.benchmarks[index].value = value;
    },

    addReason(value) {
      this.reason = value;
    },

    create() {
      // TODO
    },
  },
};
</script>

<style>

</style>