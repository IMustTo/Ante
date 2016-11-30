import { SHOW_LOADING } from '../mutation_types';

const state = { show: false };

const getters = {
  getLoadingStatus: s => s.show,
};

const mutations = {
  [SHOW_LOADING](state, show) {
    state.show = show;
  },
};

export default {
  state,
  getters,
  mutations,
};
