export default {
  methods: {
    getDicByType(type) {
      return this.$http.get('system/dictionary/findByType', {
        params: {
          dicType: type,
          orgId: WECHAT_CONFIG.currentRootOrgId,
        },
      }).then(res => res.json());
    },
  },
};
