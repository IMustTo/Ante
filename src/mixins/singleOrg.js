export default {
  data() {
    return {
      selectedOrg: {},
    };
  },

  methods: {
    loadRootOrg() {
      this.$http
        .get('system/org/findTreeRoot?currentPage=1&pageSize=10000')
        .then(response => response.json())
        .then(({ resultBean: { resultList } }) => {
          this.setOrgs(resultList);
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

            this.setOrgs(orgs);
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

      this.setOrgs(orgs);
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
  },
};
