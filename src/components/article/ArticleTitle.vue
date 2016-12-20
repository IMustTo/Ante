<template>
<h1 class="ante-article-title"><slot></slot></h1>
</template>

<script>
export default {
  name: 'article-title',
};
</script>

<style>
.ante-article-title {
  padding: 15px;
  text-align: left !important;
  font-size: 24px;
  color: #000000;
  line-height: 35px;
  overflow-wrap: break-word;
  word-wrap: break-word;
  -webkit-hyphens: auto;
  -ms-hyphens: auto;
  hyphens: auto;
}
</style>