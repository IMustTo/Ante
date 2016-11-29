<template>
<div class="page">
  <cell-wapper>
    <cell-access
      name="撤销数量"
      :caption="numStr"
      @tapEvt="selectNum">
    </cell-access>
  </cell-wapper>

  <weui-textarea placeholder="撤销原因"
    @inputEvt="comment">
  </weui-textarea>

  <cell-title tip>撤销后改星由班主任保管，当队员经努力再次达到获星条件时，再发回。</cell-title>

  <area-base>
    <weui-btn @tapEvt="submit">提交</weui-btn>
  </area-base>
</div>
</template>

<script>
import WeuiTextarea from '../components/input/WeuiTextarea';
import AreaBase from '../components/area/AreaBase';

export default {
  name: 'drop-star',
  components: {
    WeuiTextarea,
    AreaBase,
  },

  data() {
    return {
      num: 1,
      reason: '',
    };
  },

  computed: {
    numStr() {
      return `${this.num || 0}颗`;
    },
  },

  methods: {
    selectNum() {

    },

    comment(value) {
      this.reason = value;
    },

    submit() {

    },
  },
};
</script>

<style>

</style>