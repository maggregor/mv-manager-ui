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
    SET_PROJECT_STATE(state, payload) {
      let projectId = payload.projectId
      Object.assign(state.projects[projectId], {...payload})
    },
    RESET_STATE(state) {
      Object.assign(state, getDefaultState())
    },
  },
  actions: {
    async LOAD_PROJECTS({ commit, dispatch, getters }) {
      commit('SET_STATE', {
        loading: true,
      })

      await api.getProjects().then(projects => {
        if (projects) {
          commit('SET_STATE', { projects: 
            projects.reduce((map, obj) => {
            map[obj.projectId] = obj;
            return map;
        }, {}) })
        }
        commit('SET_STATE', {
          loading: false,
        })
      })
      dispatch('LOAD_ALL_METRICS')
    },
    LOAD_PROJECT_METRICS({ commit,getters }, payload) {
      let projectId = payload.projectId
      commit('SET_PROJECT_STATE', {
        projectId,
        loadingDatasetCount: true,
      })
      api.getDatasets({projectId}).then(datasets => {
        if (datasets) {
          commit('SET_PROJECT_STATE', { projectId, datasetCount: datasets.length })
        }
        commit('SET_PROJECT_STATE', { projectId, loadingDatasetCount: false })
      })
    },
    LOAD_ALL_METRICS({ getters, dispatch }) {
      getters['projectNames'].forEach(project => dispatch('LOAD_PROJECT_METRICS', { projectId: project.projectId }))
    },
  },
  getters: {
    projectNames: state => Object.keys(state.projects).map(key => state.projects[key]),
    loading: state => state.loading,
    getProjectById: (state) => (projectId) => {
      return state.projects[projectId]
    },
  },
}
