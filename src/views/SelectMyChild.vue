<template>
<div class="page">
  <cell-title>选择一个孩子</cell-title>

  <div class="weui-cells weui-cells_checkbox">
    <weui-checkbox v-for="child in children"
      @changeEvt="selectChild"
      :id="child.orgId"
      :name="child.studentName"
      :check="child.check">
    </weui-checkbox>
  </div>

  <p class="weui-btn-area">
    <weui-btn name="确定"
      :disabled="!canConfrim"
      @tapEvt="confirm"></weui-btn>
  </p>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import WeuiCheckbox from '../components/input/WeuiCheckbox';

export default {
  name: 'select-my-child',
  components: {
    WeuiCheckbox,
  },

  data() {
    return {
      checkedChild: {},
    };
  },

  computed: {
    ...mapGetters({
      children: 'getChildren',
    }),

    canConfrim() {
      return !!this.checkedChild.orgId;
    },
  },

  // TODO, 刷新重新查询
  created() {
    if (!this.children.length) {
      this.loadChild()
        .then(({ resultBean }) => {
          this.setChildOrg({ children: resultBean });
        });
    }
  },

  methods: {
    ...mapActions([
      'setChildOrg',
      'checkOneChild',
    ]),

    loadChild() {
      return this.$http.post('system/user/findChildByOperatorId', {
        rootOrgId: WECHAT_CONFIG.currentRootOrgId,
        operatorId: WWW_CONFIG.loginUser.operatorId,
      }).then(response => response.json());
    },

    // 选中一个孩子
    selectChild(id, value) {
      const children = [].concat(this.children);
      children.map((item) => {
        item.check = false;
        if (item.orgId === id) {
          if (value) {
            item.check = true;
            this.checkedChild = item;
          } else {
            this.checkedChild = {};
          }
        }

        return item;
      });
      this.setChildOrg({ children });
    },

    confirm() {
      this.checkOneChild({ child: this.checkedChild });

      this.$router.go(-1);
    },
  },
};
</script>
