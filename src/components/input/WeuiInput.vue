<template>
  <div class="weui-cell">
    <div class="weui-cell__hd">
      <label class="weui-label">{{ name }}</label>
    </div>
    <div class="weui-cell__bd">
      <input class="weui-input"
        :type="tp"
        :placeholder="holder"
        @input="$emit('inputEvt', $event.target.value)"></div>
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
  },


};
</script>

<style scoped>
.weui-input {
  text-align: right;
}
</style>