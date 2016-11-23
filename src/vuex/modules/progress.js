import { UPDATE_PROGRESS } from '../mutation_types';

const state = { w: 0 };

const getters = {
  getProgress: s => s.w,
};

const actions = {
  updateProgress({ commit }, progress) {
    commit(UPDATE_PROGRESS, progress);
  },
};

const mutations = {
  [UPDATE_PROGRESS](state, { w }) {
    state.w = w;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
