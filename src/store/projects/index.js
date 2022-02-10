import * as api from '@/services/axios/backendApi'

const getDefaultState = () => {
  return {
    projects: [],
    currentProject: {
      id: null,
      name: null,
      queryStatistics: null,
      planName: null,
      datasets: [],
      tables: [],
    },
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
      Object.assign(state.projects[projectId], { ...payload })
    },
    SET_CURRENT_PROJECT(state, payload) {
      Object.assign(state.currentProject, { ...payload })
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
          commit('SET_STATE', {
            projects: projects.reduce((map, obj) => {
              map[obj.projectId] = obj
              return map
            }, {}),
          })
        }
        commit('SET_STATE', {
          loading: false,
        })
      })
      dispatch('LOAD_ALL_METRICS')
    },
    LOAD_PROJECT_METRICS({ commit, getters }, payload) {
      let projectId = payload.projectId
      commit('SET_PROJECT_STATE', {
        projectId,
        loadingDatasetCount: true,
      })
    },
    LOAD_ALL_METRICS({ getters, dispatch }) {
      getters['projectNames'].forEach(project =>
        dispatch('LOAD_PROJECT_METRICS', { projectId: project.projectId }),
      )
    },
    LOAD_CURRENT_PROJECT({ commit, getters, dispatch }, payload) {
      let projectId = payload.projectId
      let datasetId = payload.datasetId
      //
      // Set table to loading
      //
      // api.getDatasetTables({ projectId, datasetId }).then(tables => {
      //   commit('SET_CURRENT_PROJECT', { tables: tables })
      // })
      api.getQueryStatistics({ projectId, lastDays: 30 }).then(queryStatistics => {
        commit('SET_CURRENT_PROJECT', { queryStatistics: queryStatistics })
      })
    },
  },
  getters: {
    projectNames: state => Object.keys(state.projects).map(key => state.projects[key]),
    loading: state => state.loading,
    getProjectById: state => projectId => {
      return state.projects[projectId]
    },
    currentProjectTables: state => state.currentProject.tables,
    currentProjectQueryStatistics: state => state.currentProject.queryStatistics,
  },
}
