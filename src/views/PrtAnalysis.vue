<template>
<div class="page">
  <cell-wapper>
    <cell-access name="学生"
      v-if="children.length > 1"
      :caption="student.studentName"
      @tapEvt="selectStd">
    </cell-access>
    <cell-base name="学生"
      v-if="children.length < 2"
      :caption="student.studentName">
    </cell-base>
  </cell-wapper>

  <template v-for="item in group">
    <cell-title :title="item.title" v-if="item.title"></cell-title>

    <cell-wapper>
      <template v-for="(star, index) in item.stars">
        <star-cell
          :id="index"
          :icon="star.icon"
          :name="star.name"
          :count="star.count"
          :cancel="star.cancel">
        </star-cell>
      </template>
    </cell-wapper>
  </template>

  <cell-wapper>
    <cell-access name="得星纪录" @tapEvt="showList"></cell-access>
  </cell-wapper>

  <p class="weui-btn-area">
    <weui-btn @tapEvt="exchange" :disabled="!canEx">海洋星兑换</weui-btn>
  </p>

  <cell-filler></cell-filler>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import CellFiller from '../components/cell/CellFiller';
import StarCell from '../components/star/StarCell';
import starRecords from '../mixins/starRecords';

export default {
  name: 'prt-analysis',
  components: {
    CellFiller,
    StarCell,
  },
  mixins: [starRecords],

  data() {
    return {
      group: [
        // {
        //   stars: [
        //     { icon: 'gold', name: '海洋金星', count: 2 },
        //     { icon: 'all', name: '海洋全能星', count: 1 },
        //     { icon: 'silver', name: '海洋银星', count: 1 },
        //   ],
        // },
        // {
        //   title: '海洋风采星',
        //   stars: [
        //     { icon: 'hm', name: '海马之星', count: 1 },
        //     { icon: 'qe', name: '企鹅之星', count: 10 },
        //     { icon: 'sh', name: '珊瑚之星', count: 4 },
        //     { icon: 'zy', name: '章鱼之星', count: 3 },
        //   ],
        // },
        // {
        //   title: '自定义星',
        //   stars: [
        //     { icon: 'zdy', name: '希望之星', count: 1 },
        //   ],
        // },
        // {
        //   title: '基础星',
        //   stars: [
        //     { icon: 'blue', name: '身心健康', count: 1 },
        //     { icon: 'green', name: '品格情怀', count: 10 },
        //     { icon: 'pink', name: '创新思维', count: 4 },
        //     { icon: 'purple', name: '调皮捣蛋', count: 3 },
        //   ],
        // },
      ],
    };
  },

  computed: {
    ...mapGetters({
      student: 'getCheckedChild',
      children: 'getChildren',
    }),

    canEx() {
      return this.student && this.student.orgId;
    },

    baseIcon() {
      if (this.group.length) {
        const { stars } = this.group[this.group.length - 1];
        if (['green', 'yellow', 'red', 'pink', 'blue', 'purple'].indexOf(stars[0].icon) > -1) {
          return stars[0].icon;
        }
      }

      return 'blue';
    },
  },

  created() {
    if (!this.student || !this.student.orgId) {
      this.loadChild().then(({ resultBean }) => {
        this.initChild(resultBean);
      });
    }
  },

  methods: {
    ...mapActions([
      'setChildOrg',
      'checkOneChild',
    ]),
    // 查询孩子
    loadChild() {
      return this.$http.post('system/user/findChildByOperatorId', {
        rootOrgId: WECHAT_CONFIG.currentRootOrgId,
        operatorId: WWW_CONFIG.loginUser.operatorId,
      })
      .then(response => response.json());
    },
    // 首次设置孩子
    initChild(children) {
      this.setChildOrg({ children });
      if (children.length) this.checkOneChild({ child: children[0] });
    },
    // 选择孩子
    selectStd() {
      this.$router.push('/SelectMyChild');
    },

    showList() {
      this.$router.push(`/StarRecordList/${this.student.orgId}?base=${this.baseIcon}&isprt=true`);
    },

    exchange() {
      this.$router.push(`/StarExchange/${this.student.orgId}`);
    },
  },

  watch: {
    student() {
      this.setStarData(this.student.orgId)
        .then((group) => {
          this.group = group;
        });
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (vm.student.orgId) {
        vm.setStarData(vm.student.orgId)
          .then((group) => {
            vm.group = group;
          });
      }
    });
  },
};
</script>
