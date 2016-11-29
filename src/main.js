import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './vuex/store';
import { UPDATE_PROGRESS } from './vuex/mutation_types';
import App from './App';
import common from './components/common';

// 注册公共组件
common.forEach((component) => {
  Vue.component(component.name, component);
});

Vue.use(VueRouter);

// 异步加载组件
const TchHome = (resolve) => {
  require(['./views/TchHome'], resolve);
};

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

const TchAssess = (resolve) => {
  require(['./views/TchAssess'], resolve);
};
const TchAssessSlider = (resolve) => {
  require(['./views/TchAssessSlider'], resolve);
};
const ClassAssess = (resolve) => {
  require(['./views/ClassAssess'], resolve);
};

const TchApprove = (resolve) => {
  require(['./views/TchApprove'], resolve);
};
const TchAprDtl = (resolve) => {
  require(['./views/TchAprDtl'], resolve);
};
const TchAprRefuse = (resolve) => {
  require(['./views/TchAprRefuse'], resolve);
};
const AprPassSuc = (resolve) => {
  require(['./views/AprPassSuc'], resolve);
};
const AprRefuseSuc = (resolve) => {
  require(['./views/AprRefuseSuc'], resolve);
};

const HonorHall = (resolve) => {
  require(['./views/HonorHall'], resolve);
};
const StdShow = (resolve) => {
  require(['./views/StdShow'], resolve);
};

const PrtAssess = (resolve) => {
  require(['./views/PrtAssess'], resolve);
};
const AssessSuc = (resolve) => {
  require(['./views/AssessSuc'], resolve);
};
const CustomStar = (resolve) => {
  require(['./views/CustomStar'], resolve);
};
const CustomStarAssess = (resolve) => {
  require(['./views/CustomStarAssess'], resolve);
};
const CustomStarGet = (resolve) => {
  require(['./views/CustomStarGet'], resolve);
};

// 路由映射
const routes = [
  { path: '/TchHome', component: TchHome },
  { path: '/TchApprove', component: TchApprove },
  { path: '/TchAprDtl/:id', component: TchAprDtl },
  { path: '/TchAprRefuse', component: TchAprRefuse },
  { path: '/AprPassSuc', component: AprPassSuc },
  { path: '/AprRefuseSuc', component: AprRefuseSuc },

  { path: '/TchAnalysis', component: TchAnalysis },
  { path: '/StarRecord/:id', component: StarRecord },
  { path: '/StarRecordOne/:id', component: StarRecordOne },
  { path: '/StarRecordList/:id', component: StarRecordList },
  { path: '/StarRecordDetail/:id', component: StarRecordDetail },
  { path: '/DropStar/:id', component: DropStar },
  { path: '/HonorHall', component: HonorHall },
  { path: '/StdShow/:id', component: StdShow },
  {
    path: '/TchAssess/:id',
    component: TchAssess,
    children: [
      { name: 'slider', path: 'slider', component: TchAssessSlider },
    ],
  },
  { path: '/ClassAssess', component: ClassAssess },
  { path: '/PrtAssess', component: PrtAssess },
  { path: '/AssessSuc', component: AssessSuc },
  { path: '/CustomStar', component: CustomStar },
  { path: '/CustomStarAssess', component: CustomStarAssess },
  { path: '/CustomStarGet', component: CustomStarGet },
  { path: '/*', redirect: '/TchHome' },
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
    w++; // eslint-disable-line
    store.commit(UPDATE_PROGRESS, { w });

    if (w > 95) {
      clearInterval(progress);
    }
  }, 32);

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

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
}).$mount('#container');
