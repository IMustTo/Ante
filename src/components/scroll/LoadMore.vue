<template>
<div class="weui-loadmore" @click="loadMore" :class="cls">
  <i v-show="loading" class="weui-loading"></i>
  <span v-show="loading" class="weui-loadmore__tips">正在加载</span>
  <span v-show="nomore && !loading" class="weui-loadmore__tips"><slot></slot></span>
  <span v-show="showTapBtn">点击加载更多</span>
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

    canTap: {
      type: Boolean,
      default: false,
    },

    nomore: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    showTapBtn() {
      return this.canTap && !this.nomore && !this.loading;
    },

    cls() {
      return {
        'weui-loadmore_line': !this.loading && this.nomore,
        'ante-loadmore-btn': this.showTapBtn,
      };
    },
  },

  methods: {
    loadMore() {
      if (this.showTapBtn) {
        this.$emit('loadmore');
      }
    },
  },
};
</script>

<style>
.ante-loadmore-btn:active {
  background-color: #ececec;
}
</style>
