<template>
<div class="page">
  <cell-title>驳回原因</cell-title>
  <checkbox-group>
    <template v-for="(item, index) in reasons">

      <weui-checkbox
        @changeEvt="selectReason"
        :id="index"
        :check="item.check"
        :name="item.name">

        <textarea class="weui-textarea"
          v-if="!item.name"
          v-model="item.value"
          placeholder="请输入驳回原因"
          rows="2">
        </textarea>
      </weui-checkbox>

    </template>
  </checkbox-group>

  <p class="weui-btn-area">
    <weui-btn :disabled="!canRefuse" name="驳回" @tapEvt="refuse"></weui-btn>
  </p>
</div>
</template>

<script>
import WeuiCheckbox from '../components/input/WeuiCheckbox';
import CheckboxGroup from '../components/input/CheckboxGroup';

export default {
  name: 'tch-apr-refuse',
  components: {
    CheckboxGroup,
    WeuiCheckbox,
  },

  data() {
    return {
      reasons: [
        { value: '', check: false },
        { name: '心情不好', check: false },
        { name: '我高兴！！！', check: false },
      ],
    };
  },

  computed: {
    canRefuse() {
      return this.reasons.some(item => (item.check) && (item.name || item.value));
    },
  },

  methods: {
    selectReason(i, checked) {
      if (checked) {
        this.reasons.map((item, index) => {
          if (i !== index) {
            item.check = false;
          } else {
            item.check = true;
          }

          return item;
        });
      } else {
        this.reasons[i].check = false;
      }
    },

    refuse() {
      this.$router.push('/AprRefuseSuc');
    },
  },
};
</script>
