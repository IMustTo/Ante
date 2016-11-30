<template>
<ul id="selectclass_content">
  <li class="ui-selector-item selector-class" :class="cls">
    <h3 class="ui-border-b">
      <p>{{ name }}</p>
    </h3>

    <template v-if="children.length" v-for="item in children">
      <ui-select-item
        :name="item.name"
        :id="item.id"
        :children="item.children">
      </ui-select-item>
    </template>

  </li>
</ul>
</template>

<script>
export default {
  name: 'ui-select-item',
  props: {
    name: {
      type: String,
      default: '',
    },

    id: {
      type: Number,
      default: 0,
    },

    children: {
      type: Array,
      default: [],
    },
  },

  data() {
    return {
      active: false,
    };
  },

  computed: {
    cls() {
      return {
        'ante-active': this.active,
      };
    },
  },

  methods: {
    tapTitle() {
      this.active = !this.active;
      this.$emit('tapEvt', this.id);
    },
  },
};
</script>