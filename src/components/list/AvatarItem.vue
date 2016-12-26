<template>
<label class="ante-avatar-item" :for="iptid">

  <div class="ante-avatar-select">
    <img :src="smallAvatar"/>
    <input type="checkbox" class="weui-check" :id="iptid"
      v-model="checkStatus">
    <div class="ante-avatar-select-icon">
      <div class="ante-avatar-mask"></div>
      <i class="anteicon icon-duihao"></i>
    </div>
  </div>

  <div class="ante-avatar-name ellipsis-one-line">{{ name }}</div>
</label>
</template>

<script>
export default {
  name: 'avatar-item',

  props: {
    id: {
      type: Number,
    },
    avatar: {
      type: String,
    },
    name: {
      type: String,
    },
    check: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    iptid() {
      return `avatar_${this.id}`;
    },

    smallAvatar() {
      return `${this.avatar}?x-oss-process=image/resize,m_fill,h_130,w_130`;
    },

    checkStatus: {
      get() {
        return this.check;
      },

      set(value) {
        this.$emit('changeEvt', this.id, value);
      },
    },
  },
};
</script>

<style>
.ante-avatar-item {
  display: inline-block;
  font-size: 0;
  width: 75px;
}
.ante-avatar-select {
  position: relative;
}
.ante-avatar-item img {
  width: 63px;
  height: 63px;
  border-radius: 10px;
  object-fit: cover;
  object-position: center;
  margin: 10px 0 5px;
  border: 1px solid #e5e5e5;
}
.ante-avatar-select-icon {
  position: absolute;
  width: 63px;
  height: 63px;
  border-radius: 10px;
  top: 11px;
  left: 6px;
  display: none;
  overflow: hidden;
  color: #fff;
}
.ante-avatar-item .weui-check:checked + .ante-avatar-select-icon {
  display: block;
}
.ante-avatar-mask {
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.5;
  border-radius: 10px;
}
.ante-avatar-select-icon .icon-duihao {
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  font-size: 24px;
}
.ante-avatar-name {
  font-size: 14px;
  color: #444;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 5px;
}
</style>