import { SET_HONOR_PERSON } from '../mutation_types';

const state = {
  honorPerson: {},
};

const getters = {
  getHonorPerson: s => s.honorPerson,
};

const actions = {
  setHonorPerson({ commit }, data) {
    commit(SET_HONOR_PERSON, data);
  },
};

const mutations = {
  [SET_HONOR_PERSON](state, { student }) {
    state.honorPerson = student;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
