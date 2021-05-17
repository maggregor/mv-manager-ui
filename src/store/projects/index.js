import router from '@/router'
import { notification } from 'ant-design-vue'

import * as api from '@/services/axios/backendApi'

const getDefaultState = () => {
  return {
    projects: [],
    loading: false,
  }
}

const state = getDefaultState()

export default {
  namespaced: true,
  state,
  mutations: {
    SET_STATE(state, payload) {
      Object.assign(state, {
        ...payload,
      })
    },
    RESET_STATE(state) {
      Object.assign(state, getDefaultState())
    },
  },
  actions: {
    LOAD_PROJECTS({ commit, dispatch, rootState }) {
      commit('SET_STATE', {
        loading: true,
      })

      api.getProjects().then(projects => {
        if (projects) {
          commit('SET_STATE', {projects: projects})
        }
        commit('SET_STATE', {
          loading: false,
        })
      })
    },
  },
  getters: {
    projects: state => state.projects,
    loading: state => state.loading,
  },
}
