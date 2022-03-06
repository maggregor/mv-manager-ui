import { createStore } from 'vuex'
import user from './user'
import projects from './projects'

export default createStore({
  modules: {
    user,
    projects,
  },
  state: {},
  mutations: {},
  actions: {
    clearAll({ commit }) {
      commit('RESET_STATE')
    },
  },
  getters: {},
})
