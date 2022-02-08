import { createStore } from 'vuex'
import user from './user'
import settings from './settings'
import datasets from './datasets'
import projects from './projects'
import optimizations from './optimizations'

export default createStore({
  modules: {
    user,
    datasets,
    settings,
    projects,
    optimizations,
  },
  state: {},
  mutations: {},
  actions: {
    clearAll({ commit }) {
      commit('projects/RESET_STATE')
    },
  },
  getters: {},
})
