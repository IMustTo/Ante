<template>
<div class="weui-grids ante-icon-btn-group">

  <template v-for="item in btns">
    <icon-btn
      @tapIconBtn="tapIconBtn"
      :btnProp="item">
    </icon-btn>
  </template>

</div>
</template>

<script>
import IconBtn from './IconBtn';

export default {
  name: 'icon-btn-group',

  // btns: [{ icon, name }, ...],
  props: ['btns'],

  components: {
    IconBtn,
  },

  methods: {
    tapIconBtn(e) {
      this.$emit('tapIconBtn', e);
    },
  },
};
</script>

<style scoped>
.ante-icon-btn-group {
  background-color: #ff540c;
}
</style>
