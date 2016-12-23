<template>
<div class="page">
  <cell-wapper>
    <cell-num name="撤销数量"
      @reduce="reduce"
      @increase="increase"
      :num="num"
      :max="max"
      :min="0">
    </cell-num>
  </cell-wapper>

  <weui-textarea placeholder="撤销原因"
    @inputEvt="comment">
  </weui-textarea>

  <cell-title tip>撤销后改星由班主任保管，当队员经努力再次达到获星条件时，再发回。</cell-title>

  <area-base>
    <weui-btn :disabled="!canSubmit" @tapEvt="submit">提交</weui-btn>
  </area-base>

  <weui-toast v-if="showSuc">撤销成功</weui-toast>
</div>
</template>

<script>
import WeuiTextarea from '../components/input/WeuiTextarea';
import AreaBase from '../components/area/AreaBase';
import CellNum from '../components/cell/CellNum';

export default {
  name: 'drop-star',
  components: {
    WeuiTextarea,
    AreaBase,
    CellNum,
  },

  data() {
    return {
      type: '',
      orgId: '',

      max: 0,
      num: 0,
      reason: '',

      showSuc: false,
    };
  },

  computed: {
    canSubmit() {
      return this.num && this.reason;
    },
  },

  methods: {
    reduce() {
      this.num--;
    },
    increase() {
      this.num++;
    },

    comment(value) {
      this.reason = value;
    },

    submit() {
      const req = {
        qty: this.num,
        type: this.type,
        cancelReason: this.reason,
        studentOrg: this.orgId,
      };

      if (this.$route.query.starId) {
        req.customStarId = this.$route.query.starId;
      }

      this.$http.post('core/evaluestar/cancelrecord/save', req)
        .then(res => res.json())
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

    // 返回评价选择页
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
    next((vm) => {
      vm.type = to.params.type;
      vm.orgId = to.params.id;
      vm.max = Number(to.query.count);
    });
  },
};
</script>