<template>
<div class="page">
  <cell-wapper>
    <cell-access name="查询组织"
      :caption="org.name || '请选择'"
      @tapEvt="$router.push('/SelectClass')"/>
    <cell-access name="查询类型"
      :caption="star.name || '请选择'"
      @tapEvt="showSelectType = true"/>
    <date-time v-model="start" placeholder="请选择" format="YYYY-MM" title="开始月份" confirm-text="完成" cancel-text="取消"></date-time>
    <date-time v-model="end" placeholder="请选择" format="YYYY-MM" title="结束月份" confirm-text="完成" cancel-text="取消"></date-time>
  </cell-wapper>

  <div class="weui-btn-area">
    <weui-btn name="查询" @tapEvt="query" :disabled="disabled"></weui-btn>
  </div>

  <div ref="lineCharts" v-show="showLineChart" class="echarts custom-line"></div>

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
import 'echarts/lib/component/tooltip';

export default {
  components: {
    DateTime,
  },

  data() {
    return {
      star: {},
      starMap: ['海洋全能星', '海洋金星', '海洋银星', '海洋风采星', '基础星'],
      typeMap: ['105', '104', '103', '102', '101'],
      showSelectType: false,
      start: '',
      end: '',
      showLineChart: false,
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
      this.showLineChart = true;

      this.$http.post('/core/evaluestar/statistics/findByOrgAndType', {
        orgId: this.org.id,
        starType: this.star.type,
        startDate: this.start,
        endDate: this.end,
      }).then(res => res.json())
      .then(({ resultBean }) => {
        this.drawChart(resultBean);
      });
    },

    initLineChart() {
      this.lineChart = echarts.init(this.$refs.lineCharts);
      this.lineChart.setOption({
        grid: {
          top: '1%',
          left: '3%',
          right: '8%',
          bottom: '3%',
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [],
        },
        yAxis: {
          type: 'value',
        },
      });
    },

    drawChart(md) {
      this.$nextTick(() => {
        if (!this.lineChart) {
          this.initLineChart();
        }

        const res = this.completeMonth(md);

        const xAxis = res.map(item => item.ym);
        const data = res.map(item => item.totalQty);

        this.lineChart.setOption({
          xAxis: {
            data: xAxis,
          },
          series: [{
            name: '总评价',
            type: 'line',
            stack: '总量',
            data,
          }],
          tooltip: {
            formatter: ({ dataIndex }) => [
              `得星数：${res[dataIndex].totalQty}`,
              ...res[dataIndex].detailTypeList.map(({ typeName, totalQty }) => `${typeName}：${totalQty}`),
            ].join('<br/>'),
          },
        });

        this.lineChart.resize();
      });
    },

    completeMonth(md) {
      const [fmY, fmM] = this.start.split('-').map(item => Number(item));
      const [emY, emM] = this.end.split('-').map(item => Number(item));
      const yl = (emY - fmY) + 1;

      const dates = [];
      for (let i = 0; i < yl; i++) {
        const currSm = i === 0 ? fmM : 1; // 当前年的开始月份
        const currEm = i === yl - 1 ? emM : 12; // 当前年的结束月份
        for (let j = 0; j < (currEm - currSm) + 1; j++) {
          dates.push(`${fmY + i}-${fmM + j}`);
        }
      }

      const newMD = [];
      dates.forEach((date) => {
        let mdItem = {
          totalQty: 0,
          detailTypeList: [],
          ym: date,
        };

        md.forEach((item) => {
          if (item.ym === date) {
            mdItem = item;
          }
        });

        newMD.push(mdItem);
      });

      return newMD;
    },
  },

  watch: {
    org() {
      this.showLineChart = false;
    },
    star() {
      this.showLineChart = false;
    },
    start() {
      this.showLineChart = false;
    },
    end() {
      this.showLineChart = false;
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