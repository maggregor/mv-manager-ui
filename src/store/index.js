import { createStore } from 'vuex'
import user from './user'
import projects from './projects'
import connection from './connection'
import errors from './errors'

export default createStore({
  modules: {
    user,
    projects,
    connection,
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
