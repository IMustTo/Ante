<template>
<div class="page">
  <cell-wapper>
    <cell-access
      name="被评价人"
      :caption="selectedChild.name || '请选择'"
      @tapEvt="pick"></cell-access>

    <transition
      enter-active-class="animated flipInX"
      leave-active-class="animated flipOutX">
      <cell-access v-if="showStar" name="得星纪录"
        :caption="stars"
        @tapEvt="showStars">
      </cell-access>
    </transition>
  </cell-wapper>

</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'tch-analysis',

  components: {

  },

  data() {
    return {
      starNum: -1,
    };
  },

  computed: {
    ...mapGetters({
      child: 'getCheckedChild',
    }),

    selectedChild() {
      return {
        id: this.child.id || 0,
        name: this.child.name || '请选择',
      };
    },

    stars() {
      return `${this.starNum || 0}颗`;
    },

    // 显示星星数量
    showStar() {
      return this.selectedChild.id && this.starNum > -1;
    },
  },

  methods: {
    pick() {
      this.$router.push('/SelectChild');
    },

    loadStarsByChild() {
      this.$http
        .post('core/evaluestar/studentstar/findAnalysisById', {
          orgId: this.child.id,
        })
        .then(response => response.json())
        .then(({ resultBean }) => {
          // TODO
          console.log(resultBean);
        });
    },

    showStars() {
      if (this.people.stars) {
        this.$router.push(`/StarRecord/${this.people.id}`);
      }
    },
  },

  watch: {
    child: {
      handler() {
        this.starNum = -1;
        this.loadStarsByChild();
      },
      deep: true,
    },
  },
};
</script>