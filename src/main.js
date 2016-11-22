import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';

Vue.use(VueRouter);

const TchHome = (resolve) => {
  require(['./views/TchHome'], resolve);
};
const TchAnalysis = (resolve) => {
  require(['./views/TchAnalysis'], resolve);
};

const routes = [
  { path: '/TchHome', component: TchHome },
  { path: '/TchAnalysis', component: TchAnalysis },
  { path: '/*', redirect: '/TchHome' },
];

const router = new VueRouter({
  routes,
});

new Vue({
  el: '#app',
  router,
  render: h => h(App),
}).$mount('#container');
