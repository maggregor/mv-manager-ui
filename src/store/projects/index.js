import * as api from '@/services/axios/backendApi'

const getDefaultState = () => {
  return {
    projects: [],
    currentProject: {
      queryStatistics: null,
      dailyStatistics: null,
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
    LOAD_CURRENT_PROJECT({ commit }, payload) {
      return new Promise((resolve, reject) => {
        let projectId = payload.projectId
        api
          .getProject({ projectId })
          .then(project => {
            commit('SET_CURRENT_PROJECT', { ...project })
            resolve()
          })
          .catch(() => reject())
      })
    },
    LOAD_CURRENT_PROJECT_STATISTICS({ commit, getters }, payload) {
      const projectId = getters.currentProjectId
      const lastDays = payload.days
      api.getQueryStatistics({ projectId, lastDays }).then(queryStatistics => {
        commit('SET_CURRENT_PROJECT', { queryStatistics })
      })
    },
    LOAD_CURRENT_PROJECT_DAILY_STATISTICS({ commit, getters }, payload) {
      const projectId = getters.currentProjectId
      const lastDays = payload.days
      console.log(projectId)
      api.getDailyStatistics(projectId, lastDays).then(dailyStatistics => {
        commit('SET_CURRENT_PROJECT', { dailyStatistics })
      })
    },
    DELETE_ALL_MATERIALIZED_VIEWS({ getters }) {
      const projectId = getters.currentProjectId
      return new Promise((resolve, reject) => {
        api
          .deleteAllMaterializedViews(projectId)
          .then(() => resolve())
          .catch(() => reject())
      })
    },
  },
  getters: {
    projectNames: state => Object.keys(state.projects).map(key => state.projects[key]),
    loading: state => state.loading,
    getProjectById: state => projectId => {
      return state.projects[projectId]
    },
    hasCurrentProject: state => state.currentProject.projectId !== undefined,
    currentProjectId: state => (state.currentProject ? state.currentProject.projectId : null),
    currentProjectName: state => (state.currentProject ? state.currentProject.projectName : null),
    currentProject: state => state.currentProject,
    currentProjectTables: state => state.currentProject.tables,
    currentProjectQueryStatistics: state => state.currentProject.queryStatistics,
    currentProjectDailyStatistics: state => state.currentProject.dailyStatistics,
    currentProjectIsAutomatic: state =>
      state.currentProject ? state.currentProject.automatic : false,
    currentProjectAnalysisTimeframe: state =>
      state.currentProject ? state.currentProject.analysisTimeframe : false,
    currentProjectMvMaxPerTable: state =>
      state.currentProject ? state.currentProject.mvMaxPerTable : false,
  },
}
