import {
  SET_CLASS_ORG,
  CHECK_ONE_CLASS,
  SET_CHECKED_STUDENTS,
} from '../mutation_types';

const state = {
  orgs: [],
  checkedClass: {},
  checkedStudents: [],
};

const getters = {
  getClassOrg: s => s.orgs,
  getCheckedClass: s => s.checkedClass,
  getCheckedStudents: s => s.checkedStudents,
};

const actions = {
  setClassOrg({ commit }, data) {
    commit(SET_CLASS_ORG, data);
  },

  checkOneClass({ commit }, data) {
    commit(CHECK_ONE_CLASS, data);
  },

  setCheckedStudents({ commit }, data) {
    commit(SET_CHECKED_STUDENTS, data);
  },
};

const mutations = {
  [SET_CLASS_ORG](state, { orgs }) {
    state.orgs = orgs;
  },

  [CHECK_ONE_CLASS](state, { org }) {
    state.checkedClass = org;
  },

  [SET_CHECKED_STUDENTS](state, { students }) {
    state.checkedStudents = students;
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
};
