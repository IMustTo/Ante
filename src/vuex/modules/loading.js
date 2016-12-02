import { SHOW_LOADING } from '../mutation_types';

const state = { show: false };

const actions = {
  showLoading({ commit }, data) {
    commit(SHOW_LOADING, data);
  },
};

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
  actions,
  getters,
  mutations,
};
