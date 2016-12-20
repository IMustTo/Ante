<template>
  <div class="ante-article-info">
    <span v-if="time">{{ time }}</span>
    <span v-if="person">{{ person }}</span>
    <span v-if="school" class="ante-span-school">{{ school }}</span>
    <span v-if="label" class="ante-span-label">{{ label }}</span>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'article-info',
  props: {
    time: {
      type: String,
      default: '',
    },
    person: {
      type: String,
      default: '',
    },
    school: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
  },
};
</script>

<style>
.ante-article-info {
  padding: 0 15px;
  font-size: 15px;
}
.ante-article-info span:not(:last-child) {
  padding-right: 0.4em;
  color: #888;
}
.ante-span-school {
  padding-left: 0.4em;
  padding-right: 0.8em;
  color: #576b95;
}
.ante-span-label {
  display: inline-block;
  padding: 0 0.4em;
  border-radius: 0.2em;
  background-color: #ffbe26;
  color: #fff;
}
</style>