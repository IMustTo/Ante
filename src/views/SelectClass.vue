<template>
<div class="page ui-selector">
  <cell-title>选择班级</cell-title>
  <cell-wapper>

    <ui-select-item
      @changeEvt="selectClass"
      @tapEvt="tapLi"
      option="103"
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
  name: 'select-class',
  components: {
    UiSelectItem,
  },

  mixins: [singleOrg],

  computed: {
    ...mapGetters({
      orgs: 'getClassOrg',
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
      'setClassOrg',
      'checkOneClass',
    ]),

    // single-org mixin必须实现这个方法
    setOrgs(orgs) {
      this.setClassOrg({ orgs });
    },

    // 保存一下最后选择班级
    saveDefault(id) {
      this.$http.post('core/selectHistory/new/evalueStar/defaultOrg', { config: id });
    },

    confirm() {
      const { id, name } = this.selectedOrg;
      this.checkOneClass({ org: { id, name } });
      this.saveDefault(id);
      this.$router.go(-1);
    },
  },
};
</script>
