<template>
<label class="weui-cell weui-check__label ante-star-item" :for="iptid">
  <div class="weui-cell__bd">
    <p>{{ desc }}</p>
  </div>

  <div class="weui-cell__hd">
    <input type="checkbox"
      class="weui-check ante-star-check"
      v-model="value"
      :id="iptid">
    <div class="ante-star-icon"></div>
  </div>
</label>
</template>

<script>
export default {
  name: 'star-item',

  props: {
    id: Number,
    desc: String,
    checked: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    value: {
      set(vl) {
        this.$emit('changeEvt', this.id, vl);
      },
      get() {
        return this.checked;
      },
    },

    iptid() {
      return `star_${this.id}`;
    },
  },
};
</script>

<style scoped>
.ante-star-item .weui-cell__bd {
  color: #666;
}
.ante-star-icon {
  background-image: url('../../assets/images/star-none-128.png');
  width: 45px;
  height: 45px;
  background-position: center;
  background-size: cover;
  margin-left: 10px;
}
.ante-star-item .ante-star-check:checked + .ante-star-icon {
  background-image: url('../../assets/images/star-yellow-m.png');
}
</style>