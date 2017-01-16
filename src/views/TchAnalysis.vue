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
    <e-charts ref="charts" :options="lineData"></e-charts>
  </cell-wapper>
  <cell-title tip>本图表展示学生获得的基础星</cell-title>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import ECharts from '../components/charts/ECharts';

require('echarts/lib/chart/line');
require('echarts/lib/component/tooltip');

export default {
  name: 'tch-analysis',

  components: {
    ECharts,
  },

  data() {
    return {
      showRecord: false,

      lineData: {
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
          minInterval: 1,
          // offset: 0,
        },
      },

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
      this.$http
        .post('core/evaluestar/studentstar/findAnalysisById', {
          orgId: this.student.id,
        })
        .then(response => response.json())
        .then(({ resultBean }) => {
          this.setCharts(resultBean || {});
        });
    },
    // 设置图表数据
    setCharts(res = []) {
      const xAxis = [];
      const data = [];

      // 没有星星不显示得星纪录
      if (res.length) {
        this.showRecord = true;
      } else {
        this.showRecord = false;
      }

      res.forEach(({ key, value }) => {
        xAxis.push(key);
        data.push(value.baseStarNum || 0);
      });

      this.$refs.charts.mergeOptions({
        tooltip: {
          formatter(params) {
            const xName = xAxis[params.dataIndex];
            const { starOption } = res[xName];
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
</style>
