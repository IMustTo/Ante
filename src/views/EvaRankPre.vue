<template>
<div class="page">
  <cell-wapper>
    <cell-access name="查询类型"
      :caption="star.name || '请选择'"
      @tapEvt="showSelectType = true"/>
    <cell-access name="查询学期"
      :caption="term.name || '请选择'"
      @tapEvt="showSelectTerm = true"/>
  </cell-wapper>

  <div class="weui-btn-area">
    <weui-btn name="查询" @tapEvt="showDetail" :disabled="disabled"></weui-btn>
  </div>

  <action-sheet
    :sheets="starMap"
    v-show="showSelectType"
    @cancel="showSelectType = false"
    @tapItem="selectItem" >
  </action-sheet>

  <action-sheet
    :sheets="termNames"
    v-show="showSelectTerm"
    @cancel="showSelectTerm = false"
    @tapItem="selectTerm" >
  </action-sheet>
</div>
</template>

<script>
export default {
  data() {
    return {
      star: {},
      starMap: ['海洋全能星', '海洋金星', '海洋银星'],
      typeMap: ['105', '104', '103'],
      showSelectType: false,

      term: {},
      termNames: [],
      terms: [],
      showSelectTerm: false,
    };
  },

  computed: {
    disabled() {
      return !this.star.type || !this.term.id;
    },
  },

  created() {
    this.loadTerms();
  },

  methods: {
    init() {
      this.star = {};
      this.term = {};
    },
    loadTerms() {
      return this.$http
        .post('core/evaluestar/starStudentTerm/findAllTerm')
        .then(res => res.json())
        .then(({ resultBean }) => {
          this.termNames = resultBean.map(item => item.name);
          this.terms = resultBean;
        });
    },

    selectItem(index) {
      this.star = { name: this.starMap[index], type: this.typeMap[index] };
      this.showSelectType = false;
    },

    selectTerm(index) {
      this.term = { name: this.termNames[index], id: this.terms[index].id };
      this.showSelectTerm = false;
    },

    showDetail() {
      this.$router.push(`/EvaRank?type=${this.star.type}&id=${this.term.id}`);
    },
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (from.path === '/EvaTrend') {
        vm.init();
      }
    });
  },
};
</script>