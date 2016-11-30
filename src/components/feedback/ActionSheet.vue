<template>
<div>
  <div class="weui-mask" id="iosMask" style="opacity: 1;"></div>

  <div class="weui-actionsheet weui-actionsheet_toggle">
    <div class="weui-actionsheet__menu">
      <template v-for="(item, index) in sheets">
        <div class="weui-actionsheet__cell"
          :data-index="index"
          @click="tapItem">{{ item }}</div>
      </template>
    </div>
    <div class="weui-actionsheet__action">
      <div @click="$emit('cancel')" class="weui-actionsheet__cell">取消</div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'action-sheet',
  props: {
    sheets: {
      type: Array,
    },
  },

  methods: {
    tapItem({ target: { dataset: { index } } }) {
      this.$emit('tapItem', index);
    },
  },
};
</script>
