<template>
<div class="ante-avatar-list anter-border-b">

    <template v-if="avatars" v-for="item in avatars">
      <avatar-item
        :id="item.id"
        :name="item.name"
        :avatar="item.avatar">
      </avatar-item>
    </template>

    <slot></slot>

</div>
</template>

<script>
import AvatarItem from './AvatarItem';

export default {
  name: 'avatar-list',

  props: ['avatars'],

  components: {
    AvatarItem,
  },
};
</script>

<style>
.ante-avatar-list {
  position: relative;
  text-align: center;
  background-color: #fff;
  padding:10px 0 20px;
  font-size: 0;
  margin-bottom: 20px;
}
</style>
