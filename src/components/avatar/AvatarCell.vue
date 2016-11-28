<template>
<div class="ante-avatar-item" @click="$emit('tapEvt', id)">

  <div class="ante-avatar-select">
    <img :src="avatar"/>
  </div>

  <div class="ante-avatar-name ellipsis-one-line">{{ name }}</div>
  <div class="ante-avatar-ban ellipsis-one-line">{{ ban }}</div>
  <div class="ante-avatar-date ellipsis-one-line">{{ date }}</div>
</div>
</template>

<script>
export default {
  name: 'avatar-cell',
  props: {
    id: {
      type: Number,
      default: 0,
    },
    avatar: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    ban: {
      type: String,
      default: '',
    },
    date: {
      type: String,
      default: '',
    },
  },
};
</script>

<style scoped>
.ante-avatar-item {
  display: inline-block;
  font-size: 0;
  width: 80px;
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
.ante-avatar-name {
  font-size: 14px;
  color: #444;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 22px;
}
.ante-avatar-ban {
  font-size: 14px;
  color: #888;
  height: 22px;
}
.ante-avatar-date {
  font-size: 12px;
  color: #888;
  height: 19px;
}
</style>