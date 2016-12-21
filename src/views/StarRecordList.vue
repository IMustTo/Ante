<template>
<div class="page">

  <nav-bar :navbar="navBar" @tapEvt="changePanel">
    <cell-wapper v-if="currNav === 0">
      <template v-for="item in allRecords">
        <cell-access v-if="item.starType === '101'" :id="String(item.id)" :name="item.name"
          @tapEvt="showRecordDetail">
          <star-icon slot="icon" :icon="item.icon" :right="8"></star-icon>
          <p class="ante-cell-desc">{{ item.date }}</p>
          <p class="ante-cell-desc">{{ item.desc }}</p>
        </cell-access>

        <cell-base v-if="item.starType !== '101'" :name="item.name">
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
        <cell-access :id="String(item.id)" :name="item.name" @tapEvt="showDetail">
          <star-icon slot="icon" :icon="item.icon" :right="8"></star-icon>
          <p class="ante-cell-desc">{{ item.date }}</p>
          <p class="ante-cell-desc">{{ item.desc }}</p>
        </cell-access>
      </template>

      <load-more
        @loadmore="fetchMyRecords"
        :loading="myLoading"
        :nomore="myNoMore"
        :canTap="true">暂无更多数据</load-more>
    </cell-wapper>
  </nav-bar>

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
      allRecords: [
        // { id: '1', name: '海洋基础星+2', date: '2016-12-11', desc: '呵呵呵呵呵', icon: 'hm' },
        // { id: '1', name: '海洋基础星+2', date: '2016-12-11', desc: '呵呵呵呵呵', icon: 'sh' },
        // { id: '1', name: '海洋基础星+2', date: '2016-12-11', desc: '呵呵呵呵呵', icon: 'qe' },
        // { id: '1', name: '海洋基础星+2', date: '2016-12-11', desc: '呵呵呵呵呵', icon: 'blue' },
        // { id: '1', name: '海洋基础星+2', date: '2016-12-11', desc: '呵呵呵呵呵', icon: 'all' },
      ],

      myRecords: [
        // { id: '1', name: '基础星 + 1', date: '2016-12-11', desc: '哈哈哈', icon: 'blue' },
        // { id: '1', name: '基础星 + 1', date: '2016-12-11', desc: '哈哈哈', icon: 'blue' },
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

    // 查询全部记录
    loadAllRecords() {
      return this.$http.post('core/evaluestar/starchangelog/findGainStarList', {
        studentOrg: this.orgId,
        currentPage: this.allPage,
        pageSize: 2000,
      }).then(res => res.json());
    },
    // 查询我审批的记录
    loadMyRecords() {
      return this.$http.post('core/evaluestar/starrecord/findRecordListByOpetId', {
        stuOrgId: this.orgId,
        currentPage: this.myPage,
        pageSize: 10,
      }).then(res => res.json());
    },

    fetchAllRecords() {
      this.allLoading = true;
      this.allPage++;

      this.loadAllRecords()
        .then(({ resultBean = {} }) => {
          this.allLoading = false;

          const { resultList = [], pageCond: { currentPage, pageCount } } = resultBean;
          if (currentPage >= pageCount) {
            this.allNoMore = true;
          }

          if (this.allPage === 1) {
            this.allRecords = [];
          }

          this.allRecords = this.allRecords.concat(resultList.map((item) => {
            item.name = `${item.typeName} + ${item.changeQty}`;
            item.date = dateFormat(new Date(item.createTime), 'yyyy年MM月dd日 mm:ss');
            item.desc = item.operateTypeDesc;
            if (item.starType === '101') {
              item.icon = 'blue';
            } else {
              item.icon = StarCodeMap[item.type];
            }
            return item;
          }));
        });
    },

    fetchMyRecords() {
      this.myLoading = true;
      this.myPage ++;
      this.loadMyRecords()
        .then(({ resultBean = {} }) => {
          this.myLoading = false;

          const { resultList = [], pageCond: { currentPage, pageCount } } = resultBean;
          if (currentPage >= pageCount) {
            this.myNoMore = true;
          }

          if (this.myPage === 1) {
            this.myRecords = [];
          }

          this.myRecords = this.myRecords.concat(resultList.map((item) => {
            item.name = `海洋基础星 + ${item.num}`;
            item.date = dateFormat(new Date(item.createTime), 'yyyy年MM月dd日');
            item.desc = item.remark;
            item.icon = 'blue';
            return item;
          }));
        });
    },

    showDetail(id) {
      this.$router.push(`/StarRecordDetail/${id}/${this.orgId}`);
    },

    showRecordDetail(id) {
      this.allRecords.some((item) => {
        if (id == item.id) { // eslint-disable-line
          this.showDetail(item.recordId);
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
        vm.initConfig();
      }
    });
  },
};
</script>
