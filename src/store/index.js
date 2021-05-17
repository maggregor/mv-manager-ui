import { createStore } from 'vuex'
import user from './user'
import settings from './settings'
import projects from './projects'

export default createStore({
  modules: {
    user,
    settings,
    projects,
  },
  state: {},
  mutations: {},
  actions: {
    clearAll({ commit }) {
      commit("projects/RESET_STATE")
    },
  },
  getters: {},
})
