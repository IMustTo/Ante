import {
  SET_GLOBLE_TIP,
  CHANGE_GLOBLE_TIP_STATUS,
} from '../mutation_types';

const state = {
  tip: '',
  show: false,
};

const actions = {
  showGlobleTip({ commit }, data) {
    if (data) {
      commit(SET_GLOBLE_TIP, data);
      commit(CHANGE_GLOBLE_TIP_STATUS, true);
    } else {
      commit(SET_GLOBLE_TIP, '');
      commit(CHANGE_GLOBLE_TIP_STATUS, false);
    }
  },
};

const getters = {
  getGlobleTip: s => s.tip,
  getGlobleTipStatus: s => s.show,
};

const mutations = {
  [SET_GLOBLE_TIP](state, tip) {
    state.tip = tip;
  },

  [CHANGE_GLOBLE_TIP_STATUS](state, show) {
    state.show = show;
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
};
