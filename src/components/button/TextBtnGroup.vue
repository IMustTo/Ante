<template>
<div class="weui-grids ante-text-btn-group">

  <template v-for="item in btns">
    <text-btn
      @tapTextBtn="tapTextBtn"
      :name="item.name"
      :go="item.go">
    </text-btn>
  </template>

</div>
</template>

<script>
import TextBtn from './TextBtn';

export default {
  name: 'text-btn-group',

  // btns: [{ name, go }, ...],
  props: ['btns'],

  components: {
    TextBtn,
  },

  methods: {
    tapTextBtn(e) {
      this.$emit('tapTextBtn', e);
    },
  },
};
</script>

<style scoped>
.weui-grids:before{
  display: none;
}
.ante-text-btn-group {
  margin-top: 15px;
}
.weui-cells__title + .ante-text-btn-group {
  margin-top: 0;
}
</style>
