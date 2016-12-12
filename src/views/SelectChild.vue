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

export default {
  name: 'select-class',
  components: {
    UiSelectItem,
  },

  data() {
    return {
      selectedOrg: {},
    };
  },

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

    loadRootOrg() {
      this.$http
        .get('system/org/findTreeRoot?currentPage=1&pageSize=10000')
        .then(response => response.json())
        .then(({ resultBean: { resultList } }) => {
          this.setClassOrg({ orgs: resultList });
        });
    },

    tapLi({ id, index }) {
      const { orgs, currOrg } = this.getOrgByIndex(index);

      // 如果还没有子集合，查一下
      if (!currOrg.children) {
        this.$http
          .get(`system/org/findNext/${id}?currentPage=1&pageSize=10000`)
          .then(response => response.json())
          .then(({ resultBean }) => {
            this.$set(currOrg, 'children', resultBean);

            this.setClassOrg({ orgs });
          });
      }
    },

    selectClass(id, value, name, index) {
      const lastIndex = this.selectedOrg.index;
      if (value) {
        this.selectedOrg = { id, name, index };
      } else {
        this.selectedOrg = {};
      }

      const { orgs, currOrg } = this.getOrgByIndex(index);
      this.$set(currOrg, 'checked', value);
      if (lastIndex) {
        const lastSelectedOrg = this.getOrgByIndex(lastIndex).currOrg;
        this.$set(lastSelectedOrg, 'checked', false);
      }

      this.setClassOrg({ orgs });
    },

    // 获取当前点击的org
    getOrgByIndex(index) {
      const iArr = index.split('_');
      iArr.shift();
      const orgs = [].concat(this.orgs);

      let currOrg = { children: orgs };
      iArr.forEach((item) => {
        currOrg = currOrg.children[item];
      });

      return {
        orgs,
        currOrg,
      };
    },

    // 保存一下最后选择班级
    saveDefault(id) {
      this.$http.post('core/selectHistory/new/evalueStar/defaultOrg', { orgId: id });
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
