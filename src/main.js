import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './vuex/store';
import { UPDATE_PROGRESS } from './vuex/mutation_types';
import App from './App';

Vue.use(VueRouter);

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
const TchApprove = (resolve) => {
  require(['./views/TchApprove'], resolve);
};
const HonorHall = (resolve) => {
  require(['./views/HonorHall'], resolve);
};
const StdShow = (resolve) => {
  require(['./views/StdShow'], resolve);
};
const CustomStar = (resolve) => {
  require(['./views/CustomStar'], resolve);
};

const routes = [
  { path: '/TchHome', component: TchHome },
  { path: '/TchApprove', component: TchApprove },
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
  { path: '/CustomStar', component: CustomStar },
  { path: '/*', redirect: '/TchHome' },
];

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
  }, 16);

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
