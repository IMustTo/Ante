<template>
<div class="weui-loadmore" :class="cls">
  <i v-if="loading" class="weui-loading"></i>
  <span v-if="loading" class="weui-loadmore__tips">正在加载</span>
  <span v-if="!loading" class="weui-loadmore__tips"><slot></slot></span>
</div>
</template>

<script>
export default {
  name: 'load-more',
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    cls() {
      return {
        'weui-loadmore_line': !this.loading,
      };
    },
  },
};
</script>
