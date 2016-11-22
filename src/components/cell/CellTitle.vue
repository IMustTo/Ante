<template>

<div class="weui-cells__title" :style="custom">{{ title }}</div>

</template>

<script>
export default {
  props: ['title', 'custom'],
};
</script>