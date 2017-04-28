<template>
<div class="page">
  <cell-wapper>
    <cell-access name="查询组织"
      :caption="org.name || '请选择'"
      @tapEvt="$router.push('/SelectClass')"/>
    <cell-access name="查询类型"
      :caption="star.name || '请选择'"
      @tapEvt="showSelectType = true"/>
    <date-time v-model="start" placeholder="请选择" format="YYYY-MM-DD" title="开始日期" confirm-text="完成" cancel-text="取消"></date-time>
    <date-time v-model="end" placeholder="请选择" format="YYYY-MM-DD" title="结束日期" confirm-text="完成" cancel-text="取消"></date-time>
  </cell-wapper>

  <div class="weui-btn-area">
    <weui-btn name="查询" @tapEvt="query" :disabled="disabled"></weui-btn>
  </div>

  <div ref="radarCharts" v-show="showChart" class="echarts custom-line"></div>

  <action-sheet
    :sheets="starMap"
    v-show="showSelectType"
    @cancel="showSelectType = false"
    @tapItem="selectItem" >
  </action-sheet>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import DateTime from 'components/datetime';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/radar';
import 'echarts/lib/component/tooltip';
import { StarNameMap } from 'src/utils/starsMap';

export default {
  components: {
    DateTime,
  },

  data() {
    return {
      star: {},
      starMap: ['海洋风采星', '基础星'],
      typeMap: ['102', '101'],
      showSelectType: false,
      start: '',
      end: '',
      showChart: false,
    };
  },

  computed: {
    ...mapGetters({
      org: 'getCheckedClass',
    }),

    disabled() {
      return !this.org.id ||
        !this.star.type ||
        !this.start ||
        !this.end ||
        this.start > this.end;
    },
  },

  methods: {
    ...mapActions(['checkOneClass']),
    init() {
      this.star = {};
      this.start = '';
      this.end = '';
      this.checkOneClass({ org: {} });
    },

    selectItem(index) {
      this.star = { name: this.starMap[index], type: this.typeMap[index] };
      this.showSelectType = false;
    },

    query() {
      this.showChart = true;

      this.$http.post('/core/evaluestar/statistics/findRadar', {
        orgId: this.org.id,
        starType: this.star.type,
        startDate: this.start,
        endDate: this.end,
      }).then(res => res.json())
      .then(({ resultBean }) => {
        this.drawChart(resultBean);
      });
    },

    initRadarCharts() {
      this.radarChart = echarts.init(this.$refs.radarCharts);
      this.radarChart.setOption({
        tooltip: {},
        legend: {
          data: [],
        },
        width: '100%',
        height: '400px',
      });
    },
    drawChart(res) {
      this.$nextTick(() => {
        if (!this.Chart) {
          this.initRadarCharts();
        }

        const comData = [];
        const types = this.star.type === '101'
          ? ['101', '102', '103', '104', '105']
          : ['106', '107', '108', '109', '110', '111', '112', '113', '114', '115', '116'];
        let max = 1;

        types.forEach((type) => {
          let hasNum = false;
          res.forEach((item) => {
            if (item.starType === type) {
              comData.push(item);
              hasNum = true;

              if (item.totalQty > max) {
                max = item.totalQty;
              }
            }
          });
          if (!hasNum) {
            comData.push({
              starType: type,
              typeName: StarNameMap[type],
              totalQty: 0,
            });
          }
        });

        this.radarChart.setOption({
          radar: {
            indicator: comData.map(({ typeName }) => ({ name: typeName, max })),
          },
          series: [{
            name: '雷达图',
            type: 'radar',
            areaStyle: { normal: {} },
            data: [{
              value: comData.map(res => res.totalQty),
              name: '得星数量',
            }],
          }],
        });
      });
    },
  },

  watch: {
    org() {
      this.showChart = false;
    },
    star() {
      this.showChart = false;
    },
    start() {
      this.showChart = false;
    },
    end() {
      this.showChart = false;
    },
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (from.path === '/EvaTrend') {
        vm.init();
      }
    });
  },
};
</script>

<style scoped>
.custom-line{
  width:98%;
  height:400px;
  background-color: #fff;
  position: relative;
  z-index: 0;
}
</style>