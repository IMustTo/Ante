<template>
<label class="weui-cell weui-check__label" :for="iptid">
  <div class="weui-cell__hd">
    <input type="checkbox"
      class="weui-check"
      v-model="checked"
      :id="iptid"><i class="weui-icon-checked"></i>
  </div>
  <div class="weui-cell__bd">
    <p>{{ name }}</p>
    <slot></slot>
  </div>
</label>
</template>

<script>
export default {
  name: 'weui-radio',

  props: {
    id: {
      type: Number,
      default: 0,
    },
    name: {
      type: String,
      default: '',
    },
    check: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    iptid() {
      return `radio_${this.id}`;
    },

    checked: {
      get() {
        return this.check;
      },

      set(value) {
        this.$emit('changeEvt', this.id, value);
      },
    },
  },
};
</script>

<style scoped>
.weui-cell__ft {
  width: 24px;
}
</style>