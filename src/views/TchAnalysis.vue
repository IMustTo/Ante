<template>
<div class="page ante-page-withb">
  <cell-wapper>
    <cell-access
      name="被评价人"
      :caption="student.name || '请选择'"
      @tapEvt="pick"></cell-access>

    <transition
      enter-active-class="animated flipInX"
      leave-active-class="animated flipOutX">
      <cell-access v-if="canShowStar"
        name="得星概况"
        @tapEvt="showStars">
      </cell-access>
    </transition>
  </cell-wapper>

  <cell-wapper>
    <div ref="lineCharts" v-show="showLineChart" class="echarts custom-line"></div>
  </cell-wapper>
  <cell-title tip v-show="showLineChart">本图表展示学生获得的基础星</cell-title>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';

export default {
  name: 'tch-analysis',

  data() {
    return {
      showRecord: false,
      showLineChart: false,
      chart: null,
    };
  },

  computed: {
    ...mapGetters({
      student: 'getCheckedStudent',
    }),

    // 显示星星数量
    canShowStar() {
      return this.student.id && this.showRecord;
    },
  },

  methods: {
    pick() {
      this.$router.push('/SelectStudent');
    },

    // 查询得星图表
    loadStarsByChild() {
      this.showLineChart = true;

      this.$http
        .post('core/evaluestar/studentstar/findAnalysisById', {
          orgId: this.student.id,
        })
        .then(response => response.json())
        .then(({ resultBean }) => {
          this.drawChart(resultBean || []);
        });
    },

    initLineChart() {
      this.lineChart = echarts.init(this.$refs.lineCharts);
      this.lineChart.setOption({
        title: {
          left: 'center',
          top: '10px',
          text: '海洋星综合数据',
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
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

    drawChart(res) {
      this.$nextTick(() => {
        if (!this.lineChart) {
          this.initLineChart();
        }

        const xAxis = [];
        const data = [];

        res.forEach(({ key, value }) => {
          xAxis.push(key);
          data.push(value.baseStarNum || 0);
        });

        this.lineChart.setOption({
          tooltip: {
            formatter(params) {
              const { starOption } = res[params.dataIndex].value;
              let tipstr = '本月获得<br/>';

              Object.keys(starOption).forEach((item) => {
                tipstr += `&emsp;${item}: ${starOption[item]}颗<br/>`;
              });

              return tipstr;
            },
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: xAxis,
          },
          series: [{
            name: '基础星数',
            type: 'line',
            data,
          }],
        });
      });
    },

    showStars() {
      this.$router.push(`/StarRecord/${this.student.id}`);
    },
  },

  watch: {
    student() {
      this.loadStarsByChild();
    },
  },
};
</script>

<style>
.ante-charts {
  width: 100%;
  height: 400px;
  position: relative;
}
.ante-content-none {
  width: 100%;
  height: 100%;
  -webkit-background-size: 100px auto;
  background-size: 100px auto;
  background-repeat: no-repeat;
  background-position: center center;
  background-image: url('../assets/images/no-content.png');
}
.custom-line{
  width:98%;
  height:400px;
  background-color: #fff;
  position: relative;
  z-index: 0;
}
</style>
