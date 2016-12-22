<template>
  <div class="weui-cell">
    <div class="weui-cell__hd">
      <label class="weui-label">{{ name }}</label>
    </div>
    <div class="weui-cell__bd">
      <input class="weui-input" type="text"
        :placeholder="holder"
        v-model="value"></div>
  </div>
</template>

<script>
export default {
  name: 'weui-input',
  props: {
    name: String,
    tp: {
      type: String,
      default: 'text',
    },
    holder: {
      type: String,
      default: '请输入',
    },
    caption: {
      type: String,
      default: '',
    },
  },

  computed: {
    value: {
      set(vl) {
        this.$emit('inputEvt', vl);
      },

      get() {
        return this.caption;
      },
    },
  },
};
</script>

<style scoped>
.weui-input {
  text-align: right;
}
</style>