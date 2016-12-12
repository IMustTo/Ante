import {
  SET_CLASS_ORG,
  CHECK_ONE_CLASS,
  SET_CHECKED_STUDENTS,
  SET_CHILD_ORG,
  CHECK_ONE_CHILD,
} from '../mutation_types';

const state = {
  orgs: [],
  checkedClass: {},
  checkedStudents: [],

  children: [],
  checkedChild: {},
};

const getters = {
  getClassOrg: s => s.orgs,
  getCheckedClass: s => s.checkedClass,
  getCheckedStudents: s => s.checkedStudents,

  getChildren: s => s.children,
  getCheckedChild: s => s.checkedChild,
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

  setChildOrg({ commit }, data) {
    commit(SET_CHILD_ORG, data);
  },

  checkOneChild({ commit }, data) {
    commit(CHECK_ONE_CHILD, data);
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

  [SET_CHILD_ORG](state, { children }) {
    state.children = children;
  },

  [CHECK_ONE_CHILD](state, { child }) {
    state.checkedChild = child;
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
};
