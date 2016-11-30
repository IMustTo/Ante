<template>
<div class="weui-cell" :class="cls">
  <div class="weui-cell__bd">
    <p>{{ name }}&nbsp;<span class="ante-red-word" v-if="showCount">{{ count }}</span></p>
  </div>

  <div class="weui-cell__ft">
    <div class="ante-reduce-btn"
      @click="reduce"><i class="anteicon icon-jianhao"></i></div>
    <div class="ante-num-wapper">{{ num }}</div>
    <div class="ante-increase-btn"
      @click="increase"><i class="anteicon icon-jiahao"></i></div>
  </div>
</div>
</template>

<script>
export default {
  name: 'cell-base',
  props: {
    i: {
      type: Number,
      default: 0,
    },
    name: {
      type: String,
      default: '',
    },
    showCount: {
      type: Boolean,
      default: true,
    },
    num: {
      type: Number,
      default: 0,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    count() {
      return `x ${this.max}`;
    },

    cls() {
      return {
        'ante-cell-num-disable': this.max === 0,
      };
    },
  },

  methods: {
    reduce() {
      if (this.num > this.min) {
        this.$emit('reduce', this.i);
      }
    },

    increase() {
      if (this.num < this.max) {
        this.$emit('increase', this.i);
      }
    },
  },
};
</script>

<style scoped>
.weui-cell__ft {
  font-size: 0;
}
.ante-reduce-btn,
.ante-num-wapper,
.ante-increase-btn {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #ccc;
  color: #555;
  height: 28px;
  min-width: 28px;
  text-align: center;
  font-size: 16px;
}
.ante-num-wapper {
  margin: 0 10px;
  line-height: 29px;
}
.ante-reduce-btn > .anteicon:before,
.ante-increase-btn > .anteicon:before {
  font-size: 16px;
  line-height: 28px;
}

.ante-cell-num-disable .ante-red-word {
  color: #888;
}
.ante-reduce-btn:active,
.ante-increase-btn:active,
.ante-cell-num-disable .ante-reduce-btn,
.ante-cell-num-disable .ante-num-wapper,
.ante-cell-num-disable .ante-increase-btn {
  background-color: #efefef;
  color: #888;
}
</style>