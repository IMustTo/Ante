import Vue from 'vue';
import Vuex from 'vuex';
import progress from './modules/progress';
import loading from './modules/loading';
import assess from './modules/assess';
import orgClass from './modules/orgClass';
import globleTip from './modules/globleTip';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    progress,
    loading,
    assess,
    orgClass,
    globleTip,
  },
});
