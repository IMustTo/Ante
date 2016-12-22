<template>
<div class="page">
  <big-star :icon="starIcon"></big-star>
  <star-sum :name="starName" :count="starCount"></star-sum>
  <cell-title tip>哈哈哈哈哈哈哈</cell-title>

  <cell-wapper>
    <template v-for="item in records">
      <cell-base :name="item.name">
        <p class="ante-cell-desc">{{ item.date }}</p>
        <p class="ante-cell-desc">{{ item.desc }}</p>
      </cell-base>
    </template>

    <load-more
      @loadmore="fetchData"
      :loading="loading"
      :nomore="noMore"
      :canTap="true">暂无更多数据</load-more>
  </cell-wapper>

  <area-base>
    <weui-btn v-if="isTch" dft @tapEvt="dropStar">撤销</weui-btn>
  </area-base>
</div>
</template>

<script>
import BigStar from '../components/star/BigStar';
import StarSum from '../components/star/StarSum';
import AreaBase from '../components/area/AreaBase';
import starRecords from '../mixins/starRecords';
import { dateFormat } from '../utils';
import { StarNameMap, StarCodeMap, ColorNumMap } from '../utils/starsMap';

export default {
  name: 'star-record-one',
  components: {
    BigStar,
    StarSum,
    AreaBase,
  },
  mixins: [starRecords],

  data() {
    return {
      type: '',
      orgId: '',

      starName: '',
      starCount: 0,
      starIcon: '',

      // 加载更多
      loading: false,
      currentPage: 0,
      // 没有更多了
      noMore: false,

      userType: 0,
      records: [
        // { name: '海洋金星 + 1', date: '2015年10月23日', desc: '哈哈哈哈哈' },
        // { name: '海洋金星 + 1', date: '2015年10月23日', desc: '哈哈哈哈哈' },
      ],
    };
  },

  computed: {
    isTch() {
      return this.userType !== 1;
    },
  },

  created() {
    const identityList = WWW_CONFIG.identityList || [];

    // 家长
    if (identityList.some(item => item.code === '102')) {
      this.userType = 1;

      // 家长还有其他身份
      if (identityList.some(item => item.code !== '102')) {
        this.userType = 2;
      }
    } else {
      this.userType = 0;
    }
  },

  methods: {
    // 设置星星名字，数量
    setStarData() {
      this.starIcon = StarCodeMap[this.type];
      this.starName = StarNameMap[this.type];

      this.loadStarRecords(this.orgId)
        .then(({ resultBean }) => {
          const commonStar = resultBean.commonStar || {};
          const currStar = commonStar[this.type];

          this.starName = currStar.typeName;
          this.starCount = currStar.leftQty;
          this.cancelCount = currStar.cancelQty;

          if (currStar.starType === '101') {
            this.starIcon = ColorNumMap[currStar.colorNum];
          }
        });
    },

    loadStarRecord() {
      return this.$http.post('core/evaluestar/starchangelog/findGainStarList', {
        pageSize: 10,
        currentPage: this.currentPage,
        studentOrg: this.orgId,
        type: this.type,
      }).then(res => res.json());
    },

    fetchData() {
      this.currentPage++;

      this.loading = true;
      this.loadStarRecord().then(({
        resultBean: {
          resultList,
          pageCond: { currentPage, pageCount },
        },
      }) => {
        this.loading = false;

        this.addRecords(resultList);
        if (currentPage >= pageCount) {
          this.noMore = true;
        }
      });
    },

    // 添加数据到列表
    addRecords(resultList) {
      if (this.currentPage === 1) {
        this.records = [];
      }

      this.records = this.records.concat(resultList.map((item) => {
        item.name = `${this.starName} + ${item.changeQty}`;
        item.date = dateFormat(new Date(item.createTime), 'yyyy年MM月dd日');
        item.desc = item.changeType;
        return item;
      }));
    },

    reloadPage() {
      this.currentPage = 0;
      this.noMore = false;
      this.loading = false;
      this.fetchData();
    },

    dropStar() {
      this.$router.push(`/DropStar/${this.type}/${this.orgId}?count=${this.starCount}`);
    },
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.type = to.params.type;
      vm.orgId = to.params.id;

      vm.reloadPage();
      vm.setStarData();
    });
  },
};
</script>
