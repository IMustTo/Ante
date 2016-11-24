<template>
<div class="ante-big-star">
  <div class="ante-big-star-inner"></div>
</div>
</template>

<script>
export default {
  name: 'big-star',
  props: {

  },
};
</script>

<style scoped>
.ante-big-star {
  height: 100vw;
  background-image: url('../../assets/images/bg-issue.jpg');
  background-size: cover;
  background-position: center;
}
.ante-big-star-inner {
  height: 100%;
  background-size: 85%;
  background-repeat: no-repeat;
  background-position: center center;
  background-image: url('../../assets/images/star-all-m.png');
}
</style>
