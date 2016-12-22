<template>
<div class="weui-cell">
  <div class="weui-cell__bd">
    <textarea class="weui-textarea"
      v-model="value"
      :placeholder="holder"
      :rows="rows">
    </textarea>
  </div>

  <div class="ante-delete-btn" v-if="canDelete" @click="$emit('tapEvt', index)">
    <div class="ante-delete-btn-inner">
      <i class="anteicon icon-chahao"></i>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'input-delete',
  props: {
    index: {
      type: Number,
      default: 0,
    },
    holder: {
      type: String,
      default: '请输入',
    },
    rows: {
      type: Number,
      default: 2,
    },
    canDelete: {
      type: Boolean,
      default: false,
    },
    caption: {
      type: String,
      default: '',
    },
  },

  computed: {
    value: {
      set(vl) {
        this.$emit('inputEvt', vl, this.index);
      },

      get() {
        return this.caption;
      },
    },
  },
};
</script>

<style scoped>
.ante-delete-btn {
  width: 20px;
  height: 20px;
  padding: 10px 10px 10px;
}
.ante-delete-btn-inner {
  width: 18px;
  height: 18px;
  border: 1px solid #e5e5e5;
  text-align: center;
  color: #bbb;
  line-height: 18px;
}
</style>
