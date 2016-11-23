<template>
<label class="ante-avatar-item" :for="iptid">

  <div class="ante-avatar-select">
    <img :src="avatar"/>
    <input type="checkbox" class="weui-check" :id="iptid">
    <div class="ante-avatar-select-icon">
      
    </div>
  </div>

  <div class="ante-avatar-name ellipsis-one-line">{{ name }}</div>
</label>
</template>

<script>
export default {
  name: 'avatar-item',

  props: ['id', 'avatar', 'name'],

  computed: {
    iptid() {
      return `avatar_${this.id}`;
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
  background-color: #000;
  border-radius: 10px;
  top: 11px;
  left: 6px;
  display: none;
}
.ante-avatar-item .weui-check:checked + .ante-avatar-select-icon {
  display: block;
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