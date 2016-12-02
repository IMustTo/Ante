<template>
<div class="weui-uploader" v-show="images && images.length">
  <div class="weui-uploader__bd">
    <ul class="weui-uploader__files">
      <li class="weui-uploader__file"
        v-for="(item, index) in images"
        :key="item.id"
        :style="{ 'background-image': `url('${item.attachmentUrl}')` }">
        <div class="ante-delete-img-btn"
          :data-index="index"
          @click="$emit('deleteEvt', $event.target.dataset.index)">
          <i class="anteicon icon-chahao"></i>
        </div>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
export default {
  name: 'image-cell',
  props: {
    images: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.weui-uploader__file {
  position: relative;
}
.ante-delete-img-btn {
  position: absolute;
  height: 30px;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #000;
  opacity: 0.6;
  text-align: center;
}
.ante-delete-img-btn .icon-chahao {
  color: #fff;
  text-align: center;
  line-height: 30px;
  font-size: 20px;
}
</style>
