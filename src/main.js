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
const TchAssess = (resolve) => {
  require(['./views/TchAssess'], resolve);
};
const TchAssessSlider = (resolve) => {
  require(['./views/TchAssessSlider'], resolve);
};

const routes = [
  { path: '/TchHome', component: TchHome },
  { path: '/TchAnalysis', component: TchAnalysis },
  {
    path: '/TchAssess/:id',
    component: TchAssess,
    children: [
      { name: 'slider', path: 'slider', component: TchAssessSlider },
    ],
  },
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
    w = w + 5; // eslint-disable-line
    store.commit(UPDATE_PROGRESS, { w });

    if (w > 85) {
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
  }, 16);
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
}).$mount('#container');
