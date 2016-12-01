<template>
<div class="ante-avatar-list anter-border-b">
  <slot></slot>
</div>
</template>

<script>
export default {
  name: 'avatar-list',
};
</script>

<style>
.ante-avatar-list {
  position: relative;
  text-align: center;
  background-color: #fff;
  padding:10px 0 20px;
  font-size: 0;
}
</style>
