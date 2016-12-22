<template>
<div class="ante-tab-btns">
  <div class="ante-tab-btn-group">

    <template v-for="(name, index) in tabbar">
      <tab-btn
        :w="w"
        :checked="checked === index"
        :name="name"
        :index="index"
        @tapEvt="tapTab">
      </tab-btn>
    </template>

  </div>
  <div class="ante-tab-page">
    <slot></slot>
  </div>
</div>
</template>

<script>
import TabBtn from '../button/TabBtn';

export default {
  name: 'tab-bar',
  props: {
    tabbar: {
      w: {
        type: Number,
        default: 100,
      },
      type: Array,
      default: [],
    },
  },

  data() {
    return {
      checked: 0,
    };
  },

  components: {
    TabBtn,
  },

  methods: {
    tapTab(index) {
      this.checked = index;
      this.$emit('tapEvt', index);
    },
  },
};
</script>

<style scoped>
.ante-tab-btns {
  text-align: center;
  font-size: 0;
}
.ante-tab-btn-group {
  display: inline-block;
  border-radius: 5px;
  overflow: hidden;
  font-size: 16px;
}
.ante-tab-page {
  text-align: left;
  padding: 0 10px;
}
</style>