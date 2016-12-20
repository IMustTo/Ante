<template>
<div class="page">
  <weui-textarea placeholder="申请恢复撤星原因"
    @inputEvt="comment">
  </weui-textarea>
  <cell-title tip>填写申请原因，提交到班主任进行审核</cell-title>

  <area-base>
    <weui-btn :disabled="!canSubmit" @tapEvt="submit">提交</weui-btn>
  </area-base>

  <weui-toast v-if="showSuc">已申请</weui-toast>
</div>
</template>

<script>
import WeuiTextarea from '../components/input/WeuiTextarea';
import AreaBase from '../components/area/AreaBase';

export default {
  name: 'reapply-star',
  components: {
    WeuiTextarea,
    AreaBase,
  },

  data() {
    return {
      reason: '',

      showSuc: false,
    };
  },

  computed: {
    canSubmit() {
      return this.reason;
    },
  },

  methods: {
    comment(value) {
      this.reason = value;
    },

    submit() {
      this.$http.post('core/evaluestar/cancelrecord/applyOrApprove', {
        id: this.$route.params.id,
        status: '102',
        applyRemark: this.reason,
      }).then(res => res.json())
      .then(({ resultCode }) => {
        if (resultCode === 'JSPE-200') {
          this.showSuc = true;
        }
      });
    },
  },
};
</script>