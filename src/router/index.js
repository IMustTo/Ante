import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const Hello = (resolve) => {
  // require.ensure 是 Webpack 的特殊语法，用来设置 code-split point
  // （代码分块）
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
