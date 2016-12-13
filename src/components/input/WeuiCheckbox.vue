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
  name: 'weui-checkbox',

  props: {
    id: {
      type: Number,
      default: 0,
    },
    index: {
      type: String,
      default: '',
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
        this.$emit('changeEvt', this.id, value, this.name, this.index);
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