<template>
<div class="page">

  <nav-bar :navbar="navBar" @tapEvt="changePanel">
    <!-- nav-page -->
    <template v-for="(records, index) in recordsArr">
      <cell-wapper v-if="currNav === index">
        <!-- records-list -->
        <template v-for="item in records">
          <cell-access :id="item.id" @tapEvt="showDetail">
            <star-icon slot="icon" :icon="item.icon" :right="8"></star-icon>

            <p>{{ item.name }}
              <status-box :name="item.status" :code="item.statusCode"></status-box>
            </p>
            <p class="ante-cell-desc">{{ item.person }}</p>
            <p class="ante-cell-desc">{{ item.desc }}</p>
          </cell-access>
        </template>

        <mugen-scroll v-if="!noMore" scroll-container="CellWapper"
          :handler="fetchData"
          :should-handle="!loading">
          <load-more loading></load-more>
        </mugen-scroll>

        <load-more v-if="noMore">暂无更多数据</load-more>
      </cell-wapper>
    </template>

  </nav-bar>

</div>
</template>

<script>
import NavBar from '../components/layout/NavBar';
import StarIcon from '../components/star/StarIcon';
import StatusBox from '../components/status/StatusBox';
import MugenScroll from '../components/scroll/MugenScroll';

const StatusMap = {
  101: '待审批',
  102: '已通过',
  103: '已驳回',
  104: '已通过',
  105: '已通过',
  106: '已通过',
  107: '已通过',
  108: '已通过',
};

const StatusCodeMap = {
  101: 'pending',
  102: 'passed',
  103: 'refused',
  104: 'passed',
  105: 'passed',
  106: 'passed',
  107: 'passed',
  108: 'passed',
};

export default {
  name: 'tch-approve',
  components: {
    NavBar,
    StarIcon,
    StatusBox,
    MugenScroll,
  },

  data() {
    return {
      currNav: 0,
      navBar: ['全部', '待审批', '已审批'],

      // 加载更多
      loading: false,
      currentPage: 1,
      // 没有更多了
      noMore: false,

      // all   pending   approved
      recordsArr: [[], [], []],
    };
  },

  methods: {
    loadCustomList() {
      return this.$http.post('core/evaluestar/starCustom/getReviewStatus', {
        pageSize: 10,
        currentPage: this.currentPage,
      }).then(response => response.json());
    },

    // 加载更多
    fetchData() {
      if (this.currentPage === 1) {
        this.recordsArr = [[], [], []];
      }

      this.loading = true;
      this.loadCustomList()
        .then(({ resultBean: { resultList, pageCond: { currentPage, pageCount } } }) => {
          this.addRecords(resultList);

          if (currentPage === pageCount) {
            this.noMore = true;
          } else {
            this.currentPage++;
            this.loading = false;
          }
        });
    },

    // 处理数据，添加到列表
    addRecords(resultList) {
      const all = []; // 全部
      const pending = []; // 待处理
      const approved = []; // 已处理

      resultList.forEach((item) => {
        const { id, status, name, studentName, className } = item;
        const record = {
          id,
          status: StatusMap[status],
          statusCode: StatusCodeMap[status],
          name: `创建申请 (${name})`,
          person: `${studentName} (${className})`,
          desc: name,
          icon: 'zdy',
        };
        all.push(record);

        if (StatusCodeMap[status] === 'pending') {
          pending.push(record);
        } else {
          approved.push(record);
        }
      });
      // 设置数据
      this.recordsArr = [
        this.recordsArr[0].concat(all),
        this.recordsArr[1].concat(pending),
        this.recordsArr[2].concat(approved),
      ];
    },

    showDetail(id) {
      this.$router.push(`/TchAprDtl/${id}`);
      // TODO
    },

    changePanel(index) {
      this.currNav = index;
    },
  },
};
</script>

<style>

</style>