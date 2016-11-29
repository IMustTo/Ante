<template>
<div class="page">
  <bottom-fix>
    <cell-wapper>
      <cell-base name="学生"
        :caption="student.name">
      </cell-base>
      <cell-base name="星星名称"
        :caption="star.name">
      </cell-base>
    </cell-wapper>

    <cell-title title="评价标准"></cell-title>
    <cell-wapper>
      <template v-for="item in benchmarks">
        <cell-base :name="item"></cell-base>
      </template>
    </cell-wapper>

    <cell-title title="创建原因"></cell-title>
    <cell-wapper>
      <cell-base :name="reason"></cell-base>
    </cell-wapper>
    <cell-title tip>本审批需要班主任操作</cell-title>

    <area-center slot="bottom">
      <weui-btn mini dft @tapEvt="reject">驳回</weui-btn>
      <weui-btn mini @tapEvt="pass">通过</weui-btn>
    </area-center>
  </bottom-fix>
</div>
</template>

<script>
import BottomFix from '../components/layout/BottomFix';
import AreaCenter from '../components/area/AreaCenter';

export default {
  name: 'tch-apr-dtl',
  components: {
    BottomFix,
    AreaCenter,
  },

  data() {
    return {
      student: {
        name: '王侠名',
        id: 1,
      },
      star: {
        name: '开心快乐星',
      },

      benchmarks: [
        '身体健康',
        '顽皮捣蛋',
        '欺师灭祖，哇哈哈哈',
      ],

      reason: '我就试试，没别的想法',
    };
  },

  methods: {
    reject() {
      this.$router.push('/TchAprRefuse');
    },

    pass() {
      this.$router.push('/AssessPass');
    },
  },
};
</script>

<style>

</style>