<template>
<div class="page ui-selector">
  <cell-title>选择学生</cell-title>
  <cell-wapper>

    <ui-select-item
      @changeEvt="selectClass"
      @tapEvt="tapLi"
      option="102"
      :group="orgs">
    </ui-select-item>

  </cell-wapper>

  <p class="weui-btn-area">
    <weui-btn name="确定"
      :disabled="!canConfrim"
      @tapEvt="confirm"></weui-btn>
  </p>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import UiSelectItem from '../components/input/UiSelectItem';
import singleOrg from '../mixins/singleOrg';

export default {
  name: 'select-student',
  components: {
    UiSelectItem,
  },

  mixins: [singleOrg],

  computed: {
    ...mapGetters({
      orgs: 'getStudents',
    }),

    canConfrim() {
      return !!this.selectedOrg.id;
    },
  },

  created() {
    this.loadRootOrg();
  },

  methods: {
    ...mapActions([
      'setStudents',
      'checkOneStudent',
    ]),

    // single-org mixin必须实现这个方法
    setOrgs(orgs) {
      this.setStudents({ students: orgs });
    },

    confirm() {
      const { id, name } = this.selectedOrg;
      this.checkOneStudent({ student: { id, name } });
      this.$router.go(-1);
    },
  },
};
</script>
