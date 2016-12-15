import {
  SET_CLASS_ORG,
  CHECK_ONE_CLASS,
  SET_CHECKED_STUDENTS,
  SET_CHILD_ORG,
  CHECK_ONE_CHILD,
  SET_STUDENTS_ORG,
  CHECK_ONE_STUDENT,
} from '../mutation_types';

const state = {
  orgs: [],
  checkedClass: {},
  checkedStudents: [],
  // 家长看孩子
  children: [],
  checkedChild: {},
  // 老师看学生
  students: [],
  checkedStudent: {},
};

const getters = {
  getClassOrg: s => s.orgs,
  getCheckedClass: s => s.checkedClass,
  getCheckedStudents: s => s.checkedStudents,

  getChildren: s => s.children,
  getCheckedChild: s => s.checkedChild,

  getStudents: s => s.students,
  getCheckedStudent: s => s.checkedStudent,
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

  setStudents({ commit }, data) {
    commit(SET_STUDENTS_ORG, data);
  },
  checkOneStudent({ commit }, data) {
    commit(CHECK_ONE_STUDENT, data);
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

  [SET_STUDENTS_ORG](state, { students }) {
    state.students = students;
  },
  [CHECK_ONE_STUDENT](state, { student }) {
    state.checkedStudent = student;
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
};
