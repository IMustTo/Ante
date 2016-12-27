<template>
<div class="page">
  <big-star :icon="starIcon" :img="starImg"></big-star>
  <star-sum :name="starName" :count="starCount" :cancel="cancelCount"></star-sum>

  <cell-title>{{ starName }}获得记录</cell-title>
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
    <weui-btn v-if="isBZR && cancelCount" @tapEvt="seeDropList">恢复撤星</weui-btn>
    <weui-btn v-if="isBZR" dft @tapEvt="dropStar">撤销</weui-btn>
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
      cancelCount: 0,
      starIcon: '',
      starImg: '',

      // 加载更多
      loading: false,
      currentPage: 0,
      // 没有更多了
      noMore: false,

      isBZR: false,
      records: [
        // { name: '海洋金星 + 1', date: '2015年10月23日', desc: '哈哈哈哈哈' },
        // { name: '海洋金星 + 1', date: '2015年10月23日', desc: '哈哈哈哈哈' },
      ],
    };
  },

  created() {
    const identityList = WWW_CONFIG.identityList || [];

    // 106 班主任
    if (identityList.some(item => item.code === '106')) {
      this.isBZR = true;
    } else {
      this.isBZR = false;
    }
  },

  methods: {
    // 设置自定义星
    setZdyStar() {
      this.$http.post('core/evaluestar/starCustom/findStarCustomById', {
        starCustomId: this.$route.query.starId,
      }).then(res => res.json())
      .then(({ resultBean }) => {
        const { name, imageUrl, status, createTime } = resultBean;
        this.starIcon = 'zdy';
        this.starImg = imageUrl || '';
        this.starName = name;
        this.starCount = 1;
        this.cancelCount = status === '107' ? 1 : 0;

        this.records = [{
          name: `${name} + 1`,
          date: dateFormat(new Date(createTime), 'yyyy年MM月dd日'),
          desc: '申请通过获得',
        }];

        this.noMore = true;
      });
    },

    // 设置星星名字，数量
    setStarData() {
      this.starImg = '';
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
        item.desc = item.operateTypeDesc;
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
      if (this.$route.query && this.$route.query.starId) {
        this.$router.push(`/DropStar/${this.type}/${this.orgId}?count=${this.starCount}&starId=${this.$route.query.starId}`);
      } else {
        this.$router.push(`/DropStar/${this.type}/${this.orgId}?count=${this.starCount}`);
      }
    },

    seeDropList() {
      this.$router.push(`/DropStarList/${this.type}/${this.orgId}?starIcon=${this.starIcon}`);
    },
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.type = to.params.type;
      vm.orgId = to.params.id;

      if (to.query && to.query.starId) {
        vm.setZdyStar();
      } else {
        vm.reloadPage();
        vm.setStarData();
      }
    });
  },
};
</script>
