<template>
<div class="weui-cells weui-cells_form">
  <div class="weui-cell">
    <div class="weui-cell__bd">
      <textarea class="weui-textarea"
        @input="inputValue"
        :maxlength="maxLen"
        :placeholder="placeholder"
        :rows="rows">
      </textarea>

      <div class="weui-textarea-counter"
        v-if="count"><span>{{ len }}</span>/{{ count }}</div>

      <div v-if="icon" class="ante-textarea-btn">
        <div class="ante-textarea-btn-camera"
          @click="$emit('tapcamera')"></div>
        <slot name="images"></slot>
      </div>
    </div>

    <slot></slot>
  </div>
</div>
</template>

<script>
export default {
  name: 'weui-textarea',
  props: {
    placeholder: {
      type: String,
      default: '请输入',
    },
    rows: {
      type: Number,
      default: 3,
    },
    icon: {
      type: Boolean,
      default: false,
    },
    count: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      len: 0,
    };
  },

  computed: {
    maxLen() {
      return this.count ? this.count : Infinity;
    },
  },

  methods: {
    inputValue({ target: { value } }) {
      this.$emit('inputEvt', value);

      if (this.count) {
        this.len = value.length;
      }
    },
  },
};
</script>

<style scoped>
.ante-textarea-btn-camera {
  width: 40px;
  height: 40px;
  background-image: url('../../assets/images/icon-photo.png');
  -webkit-background-size: 70%;
  background-size: 70%;
  background-repeat: no-repeat;
  background-position: 0 center;
}
</style>
