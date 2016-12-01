import { SET_ASSESS_TYPE, CHECK_TYPE } from '../mutation_types';

const state = {
  checked: {},
  assessType: [],
};

const getters = {
  getAssessType: s => s.assessType,
  getCheckedAssess: s => s.checked,
};

const actions = {
  setAssessType({ commit }, data) {
    commit(SET_ASSESS_TYPE, data);
  },

  checkAssessType({ commit }, data) {
    commit(CHECK_TYPE, data);
  },
};

const mutations = {
  [SET_ASSESS_TYPE](state, { types }) {
    state.assessType = [{
      evalueType: '101',
      go: '/TchAssess/0',
      name: '全部',
      type: '0',
    }].concat(types);
  },

  [CHECK_TYPE](state, { id }) {
    state.assessType.some((item) => {
      if (item.type === id) {
        state.checked = item;
        return true;
      }
      return false;
    });
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
};
