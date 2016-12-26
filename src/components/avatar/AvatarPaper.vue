<template>
<div class="ante-avatar-paper" :style="stl"></div>
</template>

<script>
export default {
  name: 'avatar-paper',
  props: ['uri'],

  computed: {
    stl() {
      return {
        'background-image': `url('${this.uri}?x-oss-process=image/resize,m_fill,h_380,w_320')`,
      };
    },
  },
};
</script>

<style scoped>
.ante-avatar-paper {
  width: 160px;
  height: 190px;
  box-shadow: 5px 5px 10px #333;
  display: inline-block;
  background-position: center;
  background-size: cover;
}
</style>