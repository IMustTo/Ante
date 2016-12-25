<template>
<div class="page">

  <nav-bar v-show="!isprt" :navbar="navBar" @tapEvt="changePanel">
    <cell-wapper v-if="currNav === 0">
      <template v-for="item in allRecords">
        <cell-access v-if="item.hasDetail"
          :id="item.idType"
          :name="item.name"
          @tapEvt="showRecordDetail">
          <star-icon slot="icon" :icon="item.icon" :right="8"></star-icon>
          <p class="ante-cell-desc">{{ item.date }}</p>
          <p class="ante-cell-desc">{{ item.desc }}</p>
        </cell-access>

        <cell-base v-if="!item.hasDetail"
          :name="item.name">
          <star-icon slot="icon" :icon="item.icon" :right="8"></star-icon>
          <p class="ante-cell-desc">{{ item.date }}</p>
          <p class="ante-cell-desc">{{ item.desc }}</p>
        </cell-base>
      </template>

      <load-more
        @loadmore="fetchAllRecords"
        :loading="allLoading"
        :nomore="allNoMore"
        :canTap="true">暂无更多数据</load-more>
    </cell-wapper>

    <cell-wapper v-if="currNav === 1">
      <template v-for="item in myRecords">
        <cell-access v-if="item.hasDetail"
          :id="item.idType" :name="item.name" @tapEvt="showRecordDetail">
          <star-icon slot="icon" :icon="item.icon" :right="8"></star-icon>
          <p class="ante-cell-desc">{{ item.date }}</p>
          <p class="ante-cell-desc">{{ item.desc }}</p>
        </cell-access>

        <cell-base v-if="!item.hasDetail"
          :name="item.name">
          <star-icon slot="icon" :icon="item.icon" :right="8"></star-icon>
          <p class="ante-cell-desc">{{ item.date }}</p>
          <p class="ante-cell-desc">{{ item.desc }}</p>
        </cell-base>
      </template>

      <load-more
        @loadmore="fetchMyRecords"
        :loading="myLoading"
        :nomore="myNoMore"
        :canTap="true">暂无更多数据</load-more>
    </cell-wapper>
  </nav-bar>

  <cell-wapper v-show="isprt">
    <template v-for="item in allRecords">
      <cell-access v-if="item.hasDetail" :id="item.idType" :name="item.name"
        @tapEvt="showRecordDetail">
        <star-icon slot="icon" :icon="item.icon" :right="8"></star-icon>
        <p class="ante-cell-desc">{{ item.date }}</p>
        <p class="ante-cell-desc">{{ item.desc }}</p>
      </cell-access>

      <cell-base v-if="!item.hasDetail" :name="item.name">
        <star-icon slot="icon" :icon="item.icon" :right="8"></star-icon>
        <p class="ante-cell-desc">{{ item.date }}</p>
        <p class="ante-cell-desc">{{ item.desc }}</p>
      </cell-base>
    </template>

    <load-more
      @loadmore="fetchAllRecords"
      :loading="allLoading"
      :nomore="allNoMore"
      :canTap="true">暂无更多数据</load-more>
  </cell-wapper>
</div>
</template>

<script>
import StarIcon from '../components/star/StarIcon';
import NavBar from '../components/layout/NavBar';
import { dateFormat } from '../utils';
import { StarCodeMap } from '../utils/starsMap';

export default {
  name: 'star-record-list',
  components: {
    StarIcon,
    NavBar,
  },

  data() {
    return {
      orgId: '',
      base: 'blue',
      allRecords: [
        // { id: '1', name: '海洋基础星+2', date: '2016-12-11', desc: '呵呵呵呵呵', icon: 'hm' },
      ],

      myRecords: [
        // { id: '1', name: '基础星 + 1', date: '2016-12-11', desc: '哈哈哈', icon: 'blue' },
      ],

      navBar: ['全部记录', '我评价的'],

      currNav: 0,

      // 全部记录页数
      allPage: 0,
      allLoading: false,
      allNoMore: false,
      // 我的记录页数
      myPage: 0,
      myLoading: false,
      myNoMore: false,

      isprt: false,
    };
  },

  methods: {
    initConfig() {
      this.allPage = 0;
      this.myPage = 0;
      this.records = [];
      this.myRecords = [];

      this.fetchAllRecords();
      this.fetchMyRecords();
    },

    loadRecords(req) {
      return this.$http
        .post('core/evaluestar/starchangelog/findGainStarList', req)
        .then(res => res.json());
    },
    // 查询全部记录
    loadallRecords() {
      return this.loadRecords({
        studentOrg: this.orgId,
        currentPage: this.allPage,
        pageSize: 10,
      });
    },
    // 查询我审批的记录
    loadmyRecords() {
      return this.loadRecords({
        studentOrg: this.orgId,
        currentPage: this.myPage,
        pageSize: 10,
        operatorId: WWW_CONFIG.loginUser ? WWW_CONFIG.loginUser.operatorId : 0,
      });
    },

    // 区分type获取数据 all my
    fetchData(type) {
      this[`${type}Loading`] = true;
      this[`${type}Page`]++;

      this[`load${type}Records`]()
        .then(({ resultBean = {} }) => {
          this[`${type}Loading`] = false;

          const { resultList = [], pageCond: { currentPage, pageCount } } = resultBean;
          if (currentPage >= pageCount) {
            this[`${type}NoMore`] = true;
          }

          if (this[`${type}Page`] === 1) {
            this[`${type}Records`] = [];
          }

          this[`${type}Records`] = this[`${type}Records`].concat(resultList.map((item) => {
            item.name = `${item.typeName} + ${item.changeQty}`;
            item.date = dateFormat(new Date(item.createTime), 'yyyy年MM月dd日 hh:mm:ss');
            item.desc = item.operateTypeDesc;
            item.idType = `${item.id}_${item.type}`;
            if (item.starType === '101') {
              item.icon = this.base;
            } else {
              item.icon = StarCodeMap[item.type];
            }

            if (item.starType === '101' && item.operateType !== '113') {
              item.hasDetail = true;
            } else {
              item.hasDetail = false;
            }
            return item;
          }));
        });
    },
    fetchAllRecords() {
      this.fetchData('all');
    },

    fetchMyRecords() {
      this.fetchData('my');
    },

    showDetail(id) {
      this.$router.push(`/StarRecordDetail/${id}/${this.orgId}`);
    },

    showRecordDetail(idType) {
      this.allRecords.some((item) => {
        const id = idType.split('_')[0];
        if (id == item.id) { // eslint-disable-line
          this.showDetail(`${item.recordId}_${item.type}`);
          return true;
        }
        return false;
      });
    },

    changePanel(index) {
      this.currNav = index;
    },
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (!/StarRecordDetail/.test(from.path)) {
        vm.orgId = to.params.id;
        vm.base = to.query.base;
        vm.isprt = to.query.isprt;
        vm.initConfig();
      }
    });
  },
};
</script>
