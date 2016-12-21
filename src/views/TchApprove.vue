<template>
<div class="page">

  <nav-bar :navbar="navBar" @tapEvt="changePanel">
    <!-- nav-page -->
    <template v-for="(records, index) in recordsArr">
      <cell-wapper v-if="currNav === index">
        <!-- records-list -->
        <template v-for="item in records">
          <cell-access :id="item.id" :unvisited="item.unvisited" @tapEvt="showDetail">
            <!-- <star-icon slot="icon" :icon="item.icon" :right="8"></star-icon> -->

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
import dictionary from '../mixins/dictionary';

const StatusMap = {
  101: '待审批',
  102: '已通过',
  103: '已驳回',
};

const StatusCodeMap = {
  101: 'pending',
  102: 'passed',
  103: 'refused',
};

const TypeMap = {
  101: '创建申请',
  102: '得星申请',
  103: '恢复撤星申请',
  104: '恢复撤星申请',
};

const TypeDescMap = {
  101: '创建自定义星',
  102: '自定义星',
  103: '恢复自定义星',
  104: '恢复星星',
};

export default {
  name: 'tch-approve',
  components: {
    NavBar,
    StarIcon,
    StatusBox,
    MugenScroll,
  },

  mixins: [dictionary],

  data() {
    return {
      // 权限 101评星委员会，102班主任，103两者权限
      type: null,

      currNav: 0,
      navBar: ['全部', '待审批', '已审批'],

      // 加载更多
      loading: false,
      currentPage: 0,
      // 没有更多了
      noMore: false,

      // all   pending   approved
      recordsArr: [[], [], []],

      // 数据字典缓存
      dics: null,
    };
  },

  methods: {
    // 查询列表
    loadCustomList() {
      return this.$http.post('core/evaluestar/approveProcess/getApproveRecord', {
        pageSize: 10,
        currentPage: this.currentPage,
      }).then(response => response.json());
    },

    // 加载更多
    fetchData() {
      this.currentPage++;

      this.loading = true;

      this.loadCustomList().then(({
        resultBean: {
          resultList,
          pageCond: { currentPage, pageCount },
        },
      }) => {
        this.addRecords(resultList);

        if (currentPage >= pageCount) {
          this.noMore = true;
        } else {
          this.loading = false;
        }
      });
    },

    // 刷新页面
    reloadPage() {
      this.currentPage = 0;
      this.noMore = false;
      this.loading = false;
      this.fetchData();
    },

    // 处理数据，添加到列表
    addRecords(resultList) {
      if (this.currentPage === 1) {
        this.recordsArr = [[], [], []];
      }

      const all = []; // 全部
      const pending = []; // 待处理
      const approved = []; // 已处理

      resultList.forEach((item) => {
        const {
          foreignId,
          status,
          type,
          name = '',
          studentName = '',
          className = '',
        } = item;

        const record = {
          id: `${foreignId}_${type}`,
          unvisited: status === '101',
          status: StatusMap[status],
          statusCode: StatusCodeMap[status],
          name: TypeMap[type],
          person: `${studentName} (${className})`,
          desc: `${TypeDescMap[type]}：${name}`,
          icon: 'zdy', // TODO星星图标
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

    showDetail(idType) {
      const [id, type] = idType.split('_');
      if (type === '101' || type === '102') {
        this.$router.push(`/TchAprDtl/${id}_${type}`);
      } else {
        this.$router.push(`/TchAprReapply/${type}/${id}`);
      }
      // TODO 撤星
    },

    changePanel(index) {
      this.currNav = index;
    },
  },

  // 返回刷新页面
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (vm.currentPage !== 0) {
        vm.reloadPage();
      }
    });
  },
};
</script>
