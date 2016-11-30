<template>

</template>

<script>
import UiSelectItem from './UiSelectItem';

export default {
  name: 'ui-selector',

  props: {
    data: {
      type: Array,
      default: [],
    },
  },

  components: {
    UiSelectItem,
  },
};
</script>

<style>

</style>