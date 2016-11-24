<template>
<div class="page">
  <cell-wapper>
    <cell-access
      name="被评价人"
      :caption="people.name || '请选择'"
      @tapEvt="pick"></cell-access>

    <transition
      enter-active-class="animated flipInX"
      leave-active-class="animated flipOutX">
      <cell-access v-if="people.id" name="得星纪录"
        :caption="stars"
        @tapEvt="showStars">
      </cell-access>
    </transition>
  </cell-wapper>

</div>
</template>

<script>
import CellWapper from '../components/cell/CellWapper';
import CellAccess from '../components/cell/CellAccess';

export default {
  name: 'tch-analysis',

  components: {
    CellWapper,
    CellAccess,
  },

  data() {
    return {
      people: {
        id: 1,
        name: '王大明',
        stars: 1,
      },
    };
  },

  computed: {
    stars() {
      return `${this.people.stars || 0}颗`;
    },
  },

  methods: {
    pick() {

    },

    showStars() {
      if (this.people.stars) {
        this.$router.push(`/StarRecord/${this.people.id}`);
      }
    },
  },
};
</script>