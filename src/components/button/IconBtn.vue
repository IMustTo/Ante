<template>

<a href="javascript:;"
  class="weui-grid ante-icon-btn"
  :data-go="btnProp.go"
  :class="btnProp.cls"
  @click="tapBtn">

    <div class="weui-grid__icon">
      <i class="anteicon" :class="btnProp.icon"></i>
    </div>
    <p class="weui-grid__label">{{ btnProp.name }}</p>

</a>

</template>

<script>
export default {
  name: 'icon-btn',
  props: ['btnProp'],

  methods: {
    tapBtn() {
      if (this.btnProp && this.btnProp.go && !this.btnProp.cls) {
        const { go } = this.$el.dataset;
        this.$emit('tapIconBtn', { go });
      }
    },
  },
};
</script>

<style scoped>
.ante-icon-btn {
  background-color: #ff540c;
  height: 120px;
  padding: 30px 0;
}
.ante-icon-btn.active,
.ante-icon-btn.weui-grid:active {
  background-color: #e24402;
}
.ante-icon-btn i.anteicon {
  font-size: 26px;
  line-height: 26px;
  color: #fff;
}
.ante-icon-btn .weui-grid__label {
  color: #fff;
  font-size: 17px;
  margin-top: 10px;
}
.ante-icon-btn.weui-grid:before {
  border-right: 1px solid #e24402;
  color: #e24402;
}
.ante-icon-btn.weui-grid:after {
  border-bottom: 1px solid #e24402;
  color: #e24402;
}
</style>