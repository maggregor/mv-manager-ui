import { createStore } from 'vuex'
import user from './user'
import projects from './projects'
import connections from './connections'
import errors from './errors'

export default createStore({
  modules: {
    user,
    projects,
    connections,
    errors,
  },
  state: {},
  mutations: {},
  actions: {
    clearAll({ commit }) {
      // Wait 1s before reset value: time to back to the login page.
      setTimeout(() => commit('RESET_STATE'), 1000)
    },
  },
  getters: {},
})
