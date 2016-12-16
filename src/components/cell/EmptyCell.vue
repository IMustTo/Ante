<template>
<div class="ante-empty-wapper">
  <div class="ante-empty-img"></div>
  <div class="ante-empry-tip"><slot></slot></div>
</div>
</template>

<script>
export default {
  name: 'empty-cell',
};
</script>

<style>
.ante-empty-img {
  background-image: url('../../assets/images/no-content.png');
  -webkit-background-size: 100px auto;
  background-size: 100px auto;
  background-position: center 20px;
  background-repeat: no-repeat;
  height: 94px;
  width: 100%;
}
.ante-empry-tip {
  font-size: 16px;
  text-align: center;
  color: #888;
  padding: 5px 15px 15px;
}
</style>
