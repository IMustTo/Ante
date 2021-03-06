import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import store from './vuex/store';
import { UPDATE_PROGRESS, SHOW_LOADING } from './vuex/mutation_types';
import App from './App';
import common from './components/common';

require('./vendor/polyfill');

// 注册公共组件
common.forEach((component) => {
  Vue.component(component.name, component);
});

Vue.use(VueResource);
Vue.use(VueRouter);

// 异步加载模块
// 主页
const TchHome = (resolve) => {
  require(['./views/TchHome'], resolve);
};
// 分析2合1
// const CommonAnalysis = (resolve) => {
//   require(['./views/CommonAnalysis'], resolve);
// };
// 教师分析
const TchAnalysis = (resolve) => {
  require(['./views/TchAnalysis'], resolve);
};
const StarRecord = (resolve) => {
  require(['./views/StarRecord'], resolve);
};
const StarRecordOne = (resolve) => {
  require(['./views/StarRecordOne'], resolve);
};
const StarRecordList = (resolve) => {
  require(['./views/StarRecordList'], resolve);
};
const StarRecordDetail = (resolve) => {
  require(['./views/StarRecordDetail'], resolve);
};
const DropStar = (resolve) => {
  require(['./views/DropStar'], resolve);
};
const DropStarList = (resolve) => {
  require(['./views/DropStarList'], resolve);
};
const DropStarNotice = (resolve) => {
  require(['./views/DropStarNotice'], resolve);
};
const DropStarDetail = (resolve) => {
  require(['./views/DropStarDetail'], resolve);
};
const ReapplyStar = (resolve) => {
  require(['./views/ReapplyStar'], resolve);
};
// 教师评价
const TchAssess = (resolve) => {
  require(['./views/TchAssess'], resolve);
};
const TchAssessSlider = (resolve) => {
  require(['./views/TchAssessSlider'], resolve);
};
const TchAssessNotice = (resolve) => {
  require(['./views/TchAssessNotice'], resolve);
};
const SchoolAssess = (resolve) => {
  require(['./views/SchoolAssess'], resolve);
};
// 选择班级
const SelectClass = (resolve) => {
  require(['./views/SelectClass'], resolve);
};
// 选择学生（一个人）
const SelectStudent = (resolve) => {
  require(['./views/SelectStudent'], resolve);
};
// 选择自己的孩子（一个人）
const SelectMyChild = (resolve) => {
  require(['./views/SelectMyChild'], resolve);
};
// 教师审批
const TchApprove = (resolve) => {
  require(['./views/TchApprove'], resolve);
};
const TchAprDtl = (resolve) => {
  require(['./views/TchAprDtl'], resolve);
};
const TchAprRefuse = (resolve) => {
  require(['./views/TchAprRefuse'], resolve);
};
const TchAprReapply = (resolve) => {
  require(['./views/TchAprReapply'], resolve);
};
const AprPassSuc = (resolve) => {
  require(['./views/AprPassSuc'], resolve);
};
const AprRefuseSuc = (resolve) => {
  require(['./views/AprRefuseSuc'], resolve);
};
const AprReNotice = (resolve) => {
  require(['./views/AprReNotice'], resolve);
};
// 荣誉殿堂
const HonorHall = (resolve) => {
  require(['./views/HonorHall'], resolve);
};
const StdShow = (resolve) => {
  require(['./views/StdShow'], resolve);
};
// 家长评价
const PrtAssess = (resolve) => {
  require(['./views/PrtAssess'], resolve);
};
const PrtAssessRecords = (resolve) => {
  require(['./views/PrtAssessRecords'], resolve);
};
const AssessSuc = (resolve) => {
  require(['./views/AssessSuc'], resolve);
};
// 家长分析
const PrtAnalysis = (resolve) => {
  require(['./views/PrtAnalysis'], resolve);
};
const StarExchange = (resolve) => {
  require(['./views/StarExchange'], resolve);
};
const StarUpgrade = (resolve) => {
  require(['./views/StarUpgrade'], resolve);
};
// 自定义星
const CustomStar = (resolve) => {
  require(['./views/CustomStar'], resolve);
};
const CustomStarAssess = (resolve) => {
  require(['./views/CustomStarAssess'], resolve);
};
const CustomStarGet = (resolve) => {
  require(['./views/CustomStarGet'], resolve);
};
const ApplyStatus = (resolve) => {
  require(['./views/ApplyStatus'], resolve);
};

const EvaTrend = (resolve) => {
  require(['./views/EvaTrend'], resolve);
};
const EvaQuery = (resolve) => {
  require(['./views/EvaQuery'], resolve);
};
const EvaLine = (resolve) => {
  require(['./views/EvaLine'], resolve);
};
const EvaRadar = (resolve) => {
  require(['./views/EvaRadar'], resolve);
};
const EvaRank = (resolve) => {
  require(['./views/EvaRank'], resolve);
};
const EvaRankPre = (resolve) => {
  require(['./views/EvaRankPre'], resolve);
};

// 路由映射
const routes = [
  { path: '/TchHome', component: TchHome },
  { path: '/TchApprove', component: TchApprove },
  { path: '/TchAprDtl/:id', component: TchAprDtl },
  { path: '/TchAprRefuse/:id', component: TchAprRefuse },
  { path: '/TchAprReapply/:type/:id', component: TchAprReapply },
  { path: '/AprPassSuc/:id', component: AprPassSuc },
  { path: '/AprRefuseSuc', component: AprRefuseSuc },
  { path: '/AprReNotice/:id', component: AprReNotice },

  // { path: '/CommonAnalysis', component: CommonAnalysis },
  { path: '/TchAnalysis', component: TchAnalysis },
  { path: '/StarRecord/:id', component: StarRecord },
  { path: '/StarRecordOne/:type/:id', component: StarRecordOne },
  { path: '/StarRecordList/:id', component: StarRecordList },
  { path: '/StarRecordDetail/:id/:org', component: StarRecordDetail },
  { path: '/DropStar/:type/:id', component: DropStar },
  { path: '/DropStarList/:type/:id', component: DropStarList },
  { path: '/DropStarNotice/:id', component: DropStarNotice },
  { path: '/DropStarDetail/:id', component: DropStarDetail },

  { path: '/ReapplyStar/:id', component: ReapplyStar },

  { path: '/HonorHall', component: HonorHall },
  { path: '/StdShow/:id', component: StdShow },
  {
    path: '/TchAssess/:id',
    component: TchAssess,
    children: [
      { name: 'slider', path: 'slider', component: TchAssessSlider },
    ],
  },
  { path: '/SchoolAssess/:type/:id', component: SchoolAssess },
  { path: '/TchAssessNotice', component: TchAssessNotice },
  // { path: '/TchAssessNotice/:id', component: TchAssessNotice },
  { path: '/SelectClass', component: SelectClass },
  { path: '/SelectStudent', component: SelectStudent },
  { path: '/SelectMyChild', component: SelectMyChild },

  { path: '/PrtAssess/:id', component: PrtAssess },
  { path: '/PrtAssessRecords/:id', component: PrtAssessRecords },
  { path: '/AssessSuc', component: AssessSuc },
  { path: '/PrtAnalysis', component: PrtAnalysis },
  { path: '/StarExchange/:id', component: StarExchange },
  { path: '/StarUpgrade/:type/:id', component: StarUpgrade },
  { path: '/ApplyStatus/:id', component: ApplyStatus },

  { path: '/CustomStar', component: CustomStar },
  { path: '/CustomStarAssess', component: CustomStarAssess },
  { path: '/CustomStarGet/:id', component: CustomStarGet },

  { path: '/EvaTrend', component: EvaTrend },
  { path: '/EvaQuery', component: EvaQuery },
  { path: '/EvaLine', component: EvaLine },
  { path: '/EvaRadar', component: EvaRadar },
  { path: '/EvaRank', component: EvaRank },
  { path: '/EvaRankPre', component: EvaRankPre },

  // TOFIX: 从参数设置路由有不能返回的bug, 先不加redirect了
  // { path: '/*', redirect: '。/TchHome' },
];

// 路由
const router = new VueRouter({
  routes,
});

// 切换路由进度条：使用vuex
let progress = null;
let w = 0;
router.beforeEach((to, from, next) => {
  if (progress) clearInterval(progress);
  w = 0;
  progress = setInterval(() => {
    w++;
    store.commit(UPDATE_PROGRESS, { w });

    if (w > 95) {
      clearInterval(progress);
    }
  }, 32);

  // 隐藏分享菜单
  try { wx.hideOptionMenu(); } catch (e) { console.log(e); }
  next();
});

router.afterEach(() => {
  if (progress) clearInterval(progress);

  store.commit(UPDATE_PROGRESS, { w: 100 });
  progress = setInterval(() => {
    w = 0;
    store.commit(UPDATE_PROGRESS, { w });
    clearInterval(progress);
  }, 50);
});

// vue实例
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
}).$mount('#container');

// 通用配置及全局loading
Vue.http.options.emulateJSON = true;
Vue.http.options.traditional = true;

Vue.http.interceptors.push((request, next) => {
  request.root = `${WWW_CONFIG.projectPath}`;

  store.commit(SHOW_LOADING, true);
  next((res) => {
    store.commit(SHOW_LOADING, false);

    // 统一请求错误处理
    if (!res.ok) {
      store.dispatch('showGlobleTip', `${res.status} (${res.statusText})`);
    } else if (res.body.resultCode !== 'JSPE-200') {
      store.dispatch('showGlobleTip', res.body.errorMessage || '系统错误');
    }

    return res;
  });
});
