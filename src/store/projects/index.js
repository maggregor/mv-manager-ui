import { message } from 'ant-design-vue'
import _ from 'lodash'
import {
  getProjects,
  getProject,
  getDatasets,
  getKPIStatistics,
  deleteAllMaterializedViews,
  findMvJob,
  updateDataset,
  createProject,
  deleteProject,
  getAllMaterializedViews,
  actionMaterializedView,
  deleteMaterializedView,
} from '@/services/axios/backendApi'

import {
  trackDatasetActivated,
  trackOptimize,
  trackDeleteAllMaterializedViews,
  trackDeleteProject,
} from '@/analyticsHelper'

const getDefaultState = () => {
  return {
    // Project map
    projects: {},
    // Global project loading
    loading: false,
    // Selected project on /project/:projectId
    selectedProjectId: '',
    // True when a registering project is in progress
    registering: false,
    // Current materialized views loaded in /project/:projectId/materialized-views
    materializedViews: {},
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
      let projectId = project.projectId
      if (state.projects.hasOwnProperty(projectId)) {
        // Update project fields on existing loaded project
        Object.assign(state.projects[projectId], { ...project })
      } else {
        // Add a new project entry
        state.projects[projectId] = { ...project }
      }
    },
    ADD_MATERIALIZED_VIEW(state, mv) {
      let mvId = mv.id
      state.materializedViews[mvId] = mv
    },
    REMOVE_MATERIALIZED_VIEW(state, id) {
      delete state.materializedViews[id]
    },
    REMOVE_PROJECT(state, id) {
      delete state.projects[id]
    },
    SET_PROJECT_STATE(state, payload) {
      let projectId = payload.projectId
      delete payload.projectId
      Object.assign(state.projects[projectId], { ...payload })
    },
    SET_DATASET_STATE(state, payload) {
      let projectId = payload.projectId
      let datasetName = payload.datasetName
      delete payload.projectId
      delete payload.datasetName
      Object.assign(state.projects[projectId].datasets[datasetName], { ...payload })
    },
    RESET_STATE(state) {
      Object.assign(state, getDefaultState())
    },
  },
  actions: {
    /**
     * Define the selected project
     *
     * @param projectId
     */
    async SET_SELECTED_PROJECT_ID({ commit, dispatch }, projectId) {
      commit('SET_STATE', { selectedProjectId: projectId })
    },
    /**
     * Load all projects
     *
     * Retrieve all projects as array from the API
     * Converts to a project map
     *
     */
    async LOAD_ALL_PROJECTS({ commit, dispatch }) {
      commit('SET_STATE', { loading: true })
      try {
        let projects = await getProjects()
        projects.forEach(project => {
          commit('ADD_PROJECT', project)
        })
      } catch (e) {}
      commit('SET_STATE', { loading: false })
    },
    /**
     *
     * @param {*} param0
     * @param {*} projectId
     */
    async REGISTER_PROJECT({ commit }, payload) {
      const project = await createProject(payload)
      commit('ADD_PROJECT', project)
    },
    /**
     *
     * @param {*} param0
     * @param {*} projectId
     */
    async UNREGISTER_PROJECT({ commit }, projectId) {
      await deleteProject(projectId)
      commit('REMOVE_PROJECT', projectId)
      trackDeleteProject({ projectId })
    },
    /**
     * Load a project
     *
     * @param { projectId }
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
     */
    LOAD_PROJECT_STATISTICS({ commit }, payload) {
      let projectId = payload.projectId
      let timeframe = payload.timeframe
      commit('SET_PROJECT_STATE', {
        projectId,
        kpiStatisticsLoading: true,
        chartsStatisticsLoading: true,
      })
      getKPIStatistics(projectId, timeframe).then(kpi =>
        commit('SET_PROJECT_STATE', { projectId, kpi, kpiStatisticsLoading: false }),
      )
    },
    /**
     * Delete all the materialized views created by Achilio
     *
     * @param { projectId }
     * @returns
     */
    DELETE_ALL_MATERIALIZED_VIEWS({ getters }) {
      const projectId = getters.selectedProjectId
      trackDeleteAllMaterializedViews({ projectId })
      return new Promise((resolve, reject) =>
        deleteAllMaterializedViews(projectId)
          .then(() => resolve())
          .catch(() => reject()),
      )
    },
    /**
     * Run an async Find MV Job.
     *
     * @param { projectId } projectId
     */
    async FIND_MATERIALIZED_VIEWS({ commit, dispatch }, projectId) {
      trackOptimize({ projectId })
      commit('SET_STATE', { loading: true })
      await findMvJob({ projectId })
        .then(() => {
          message.loading(`Finding new Materialized Views ...`, 5)
        })
        .catch(() => message.error(`Can't find new materialized views.`, 5))
        .finally(() => commit('SET_STATE', { loading: false }))
    },
    LOAD_ALL_STRUCTS({ dispatch }, payload) {
      const projectId = payload.projectId
      dispatch('LOAD_DATASETS', projectId)
    },
    /**
     * Load all datasets as map
     *
     * @param { projectId } payload
     */
    async LOAD_DATASETS({ commit }, projectId) {
      commit('SET_PROJECT_STATE', { projectId, datasetsLoading: true })
      commit('SET_PROJECT_STATE', {
        projectId,
        datasets: _.keyBy(await getDatasets({ projectId }), 'datasetName'),
        datasetsLoading: false,
      })
    },
    /**
     * Update the activated property on a dataset
     *
     * @param { projectId, datasetName } payload
     */
    async ACTIVATE_DATASET({ commit }, payload) {
      let projectId = payload.projectId
      let datasetName = payload.datasetName
      let activated = payload.activated
      await updateDataset(projectId, datasetName, { activated }).then(() =>
        commit('SET_DATASET_STATE', { projectId, datasetName, activated }),
      )
      trackDatasetActivated({ projectId, datasetName, activated })
    },
    /**
     *
     *
     */
    async SET_PROJECT_REGISTERING({ commit }, registering) {
      commit('SET_STATE', { registering })
    },
    /**
     *
     */
    async LOAD_MATERIALIZED_VIEWS({ commit }, projectId) {
      commit('SET_STATE', {
        materializedViews: _.keyBy(await getAllMaterializedViews(projectId), 'id'),
      })
    },
    async APPLY_MATERIALIZED_VIEW({ commit }, payload) {
      const projectId = payload.projectId
      const id = payload.id
      const newMv = await actionMaterializedView(id, { projectId, action: 'APPLY' })
      commit('ADD_MATERIALIZED_VIEW', newMv)
    },
    async UNAPPLY_MATERIALIZED_VIEW({ commit }, payload) {
      const projectId = payload.projectId
      const id = payload.id
      const newMv = await actionMaterializedView(id, { projectId, action: 'UNAPPLY' })
      commit('ADD_MATERIALIZED_VIEW', newMv)
    },
    async DISCARD_MATERIALIZED_VIEW({ commit }, payload) {
      const projectId = payload.projectId
      const id = payload.id
      await deleteMaterializedView(id, projectId)
      commit('REMOVE_MATERIALIZED_VIEW', id)
    },
  },
  getters: {
    //
    isRegisteringProject: state => state.registering,
    // Global app loading
    loading: state => state.loading,
    // Returns projects as array of project
    allProjects: state => Object.values(state.projects),
    // Returns projects as array of project
    hasProjects: state => Object.keys(state.projects).length > 0,
    // Returns projects as array of project
    project: state => id => state.projects[id],
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
    // Returns the selected customer id
    selectedCustomerId: (state, getters) =>
      getters.hasSelectedProject ? getters.customerIdOf(getters.selectedProject.projectId) : null,
    customerIdOf: (state, getters) => projectId =>
      getters.project(projectId).organization.stripeCustomerId,
    // Statistics / KPI
    hasSelectedProjectKpi: (state, getters) =>
      getters.hasSelectedProject && getters.selectedProject.kpi !== undefined,
    selectedProjectKpi: (state, getters) => getters.selectedProject.kpi,
    kpiTotalQueries: (state, getters) =>
      getters.hasSelectedProjectKpi ? getters.selectedProjectKpi.totalQueries : -1,
    kpiPercentQueriesInMV: (state, getters) =>
      getters.hasSelectedProjectKpi ? getters.selectedProjectKpi.percentQueriesIn : -1,
    kpiAverageScannedBytes: (state, getters) =>
      getters.hasSelectedProjectKpi ? getters.selectedProjectKpi.averageScannedBytes : -1,
    // Datasets
    allDatasets: (state, getters) =>
      getters.selectedProject.datasets === undefined
        ? []
        : Object.values(getters.selectedProject.datasets),
    allEnabledDatasets: (state, getters) => getters.allDatasets.filter(o => o.activated),
    atLeastOneDatasetIsActivated: (state, getters) => getters.allDatasets.some(d => d.activated),
    isDatasetsLoading: (state, getters) => getters.selectedProject.datasetsLoading,
    // Materialized Views
    allMaterializedViews: state => _.orderBy(Object.values(state.materializedViews), 'tableName'),
    allAppliedMaterializedViews: (state, getters) =>
      getters.allMaterializedViews.filter(mv => mv.status === 'APPLIED'),
    allNotAppliedMaterializedViews: (state, getters) =>
      getters.allMaterializedViews.filter(mv => mv.status === 'NOT_APPLIED'),
    allOutdatedMaterializedViews: (state, getters) =>
      getters.allMaterializedViews.filter(mv => mv.status === 'OUTDATED'),
  },
}
