import * as api from '@/services/axios/backendApi'

const getDefaultState = () => {
  return {
    projects: {},
    loading: false,
    loadingDatasetCount: false,
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
    SET_PROJECT_STATE(state, payload) {
      let projectId = payload.projectId
      Object.assign(state.projects[projectId], {...payload})
    },
    RESET_STATE(state) {
      Object.assign(state, getDefaultState())
    },
  },
  actions: {
    async LOAD_PROJECTS({ commit, dispatch, rootState }) {
      commit('SET_STATE', {
        loading: true,
      })

      await api.getProjects().then(projects => {
        if (projects) {
          commit('SET_STATE', {projects: 
            projects.reduce((map, project) => {
              map[project.projectId] = project;
              return map;
            }, {}),
          })
        }
        commit('SET_STATE', {
          loading: false,
        })
      })
      dispatch('LOAD_ALL_METRICS')
    },
    LOAD_PROJECT_METRICS({ commit, dispatch }, payload) {
      let projectId = payload.projectId
      commit('SET_PROJECT_STATE', {
        loadingDatasetCount: true,
      })
      api.getDatasets().then(datasets => {
        if (datasets) {
          commit('SET_PROJECT_STATE', { projectId, datasetCount: datasets.length })
        }
        commit('SET_PROJECT_STATE', { loadingDatasetCount: false })
      })
    },
    LOAD_ALL_METRICS({ commit, getters, dispatch }) {
      getters.projects.forEach(project => dispatch('LOAD_PROJECT_METRICS', { projectId: project.projectId }))
    },
  },
  getters: {
    projects: state => Object.fromEntries(state.projects),
    loading: state => state.loading,
    
  },
}
