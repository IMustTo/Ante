<template>
  <a class="weui-cell weui-cell_access" href="javascript:;">
    <div class="weui-cell__hd">
      <img v-if="imguri" :src="imguri"></div>

    <div class="weui-cell__bd">
      <p>{{ name }}</p>
      <slot></slot>
    </div>

    <div v-if="caption" class="weui-cell__ft">{{ caption }}</div>
  </a>
</div>

</template>

<script>
export default {
  name: 'cell-access',
  props: ['name', 'caption', 'imguri', 'go', 'isLink'],
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
</style>