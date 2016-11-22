import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

// 异步获取页面
const Hello = (resolve) => {
  require.ensure(['../components/Hello'], () => {
    resolve(require('../components/Hello'));
  });
};

const routes = [
  { path: '/', component: Hello },
];

const router = new VueRouter({
  routes,
});

export default { router };
