<template>
  <a class="weui-cell weui-cell_access" href="javascript:;"
    :class="cls"
    @click="$emit('tapEvt', id)">
    <div class="weui-cell__hd">
      <img v-if="imguri" :src="imguri">
      <slot name="icon"></slot>
    </div>

    <div class="weui-cell__bd">
      <p>{{ name }}</p>
      <slot></slot>
    </div>

    <div class="weui-cell__ft">{{ caption }}</div>
  </a>
</div>

</template>

<script>
export default {
  name: 'cell-access',
  props: {
    id: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    caption: {
      type: String,
      default: '',
    },
    imguri: {
      type: String,
      default: '',
    },
    unvisited: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    cls() {
      const bg = {};

      if (this.unvisited) {
        bg['ante-cell-unvisited'] = true;
      }

      return bg;
    },
  },
};
</script>

<style scoped>
.weui-cell img {
  width:20px;
  height: 20px;
  margin-right:5px;
  display:block;
  object-fit: cover;
  object-position: center;
}
.ante-cell-unvisited {
  background-color: #fff9e2;
}
.ante-cell-unvisited:active {
  background-color: #f2edd7
}
</style>