import {
  getProjects,
  getProject,
  getQueryStatistics,
  getChartsStatistics,
  deleteAllMaterializedViews,
} from '@/services/axios/backendApi'

const getDefaultState = () => {
  return {
    projects: [],
    loading: false,
    selectedProjectId: '',
  }
}

const state = getDefaultState()

export default {
  state,
  mutations: {
    SET_STATE(state, payload) {
      Object.assign(state, {
        ...payload,
      })
    },
    ADD_PROJECT(state, project) {
      state.projects[project.projectId] = { ...project }
    },
    SET_PROJECT_STATE(state, payload) {
      let projectId = payload.projectId
      delete payload.projectId
      Object.assign(state.projects[projectId], { ...payload })
    },
    RESET_STATE(state) {
      Object.assign(state, getDefaultState())
    },
  },
  actions: {
    async SET_SELECTED_PROJECT_ID({ commit }, projectId) {
      commit('SET_STATE', { selectedProjectId: projectId })
    },
    /**
     * Load all projects
     *
     * Retrieve all projects as array from the API
     * Converts to a project map
     *
     */
    async LOAD_ALL_PROJECTS({ commit }) {
      commit('SET_STATE', { loading: true })
      const projects = await getProjects()
      projects.forEach(project => commit('ADD_PROJECT', project))
      commit('SET_STATE', { loading: false })
    },
    /**
     * Load a project
     *
     * @param { projectId }
     * @param {*} payload
     */
    async LOAD_PROJECT({ commit }, projectId) {
      commit('SET_STATE', { loading: true })
      commit('ADD_PROJECT', await getProject(projectId))
      commit('SET_STATE', { loading: false })
    },
    /**
     * Load statistics (KPI, charts) of a project
     *
     * @param { projectId }
     * @param {*} payload
     */
    LOAD_PROJECT_STATISTICS({ commit }, payload) {
      let projectId = payload.projectId
      let timeframe = payload.timeframe
      getQueryStatistics(projectId, timeframe).then(queryStatistics =>
        commit('SET_PROJECT_STATE', { projectId, queryStatistics }),
      )
      getChartsStatistics(projectId, timeframe).then(dailyStatistics =>
        commit('SET_PROJECT_STATE', { projectId, dailyStatistics }),
      )
    },
    /**
     * Delete all the materialized views created by Achilio
     *
     * @param { projectId }
     * @returns
     */
    DELETE_ALL_MATERIALIZED_VIEWS({ getters }) {
      return new Promise((resolve, reject) =>
        deleteAllMaterializedViews(getters.currentProjectId)
          .then(() => resolve())
          .catch(() => reject()),
      )
    },
  },
  getters: {
    projectNames: state => Object.keys(state.projects).map(key => state.projects[key]),
    loading: state => state.loading,
    getProjectById: state => projectId => state.projects[projectId],
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

    // Returns projects as array of project
    allProjects: state => Object.values(state.projects),
    // Returns projects as array of project
    project: state => id => state.projects[id],
    // Returns array of activated projects
    activatedProjects: (state, getters) => getters.allProjects.filter(p => p.activated),
    // Returns array of disabled projects
    deactivatedProjects: (state, getters) => getters.allProjects.filter(p => !p.activated),
    // Returns the selected project id
    selectedProjectId: state => state.selectedProjectId,
    // Returns the selected project id
    hasSelectedProject: (state, getters) => getters.selectedProjectId !== '',
    // Returns the selected project. If no selected project, returns null.
    selectedProject: (state, getters) => {
      if (getters.hasSelectedProject) {
        return getters.project(getters.selectedProjectId)
      }
      throw Error('No selected project id defined')
    },
  },
}
