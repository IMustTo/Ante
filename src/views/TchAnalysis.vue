<template>
<div class="page">
  <cell-wapper>
    <cell-access
      name="被评价人"
      :caption="student.name || '请选择'"
      @tapEvt="pick"></cell-access>

    <transition
      enter-active-class="animated flipInX"
      leave-active-class="animated flipOutX">
      <cell-access v-if="canShowStar"
        name="得星纪录"
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
      student: 'getCheckedStudent',
    }),

    stars() {
      return `${this.starNum || 0}颗`;
    },

    // 显示星星数量
    canShowStar() {
      return this.student.id;
    },
  },

  methods: {
    pick() {
      this.$router.push('/SelectStudent');
    },

    loadStarsByChild() {
      this.$http
        .post('core/evaluestar/studentstar/findAnalysisById', {
          orgId: this.student.id,
        })
        .then(response => response.json())
        .then(({ resultBean }) => {
          // TODO
          console.log(resultBean);
        });
    },

    showStars() {
      this.$router.push(`/StarRecord/${this.student.id}`);
    },
  },
};
</script>