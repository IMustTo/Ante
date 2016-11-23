<template>
<a href="javascript:;"
  class="weui-grid ante-text-btn"
  :data-go="go"
  @click="tapBtn">
    <p class="weui-grid__label">{{ name }}</p>
</a>
</template>

<script>
export default {
  props: ['name', 'go'],

  methods: {
    tapBtn() {
      const { go } = this.$el.dataset;
      this.$emit('tapTextBtn', { go });
    },
  },
};
</script>

<style scoped>
.weui-grid.ante-text-btn {
  height: 50px;
  background-color: #fff;
  padding: 15px 10px;
}
.weui-grid.ante-text-btn:active {
  background-color: #ECECEC;
}
.weui-grid.ante-text-btn .weui-grid__label {
  color: #888;
}
</style>