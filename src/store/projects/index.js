import { message } from 'ant-design-vue'
import _ from 'lodash'
import {
  getProjects,
  getProject,
  getDatasets,
  getPlans,
  getKPIStatistics,
  getChartsStatistics,
  deleteAllMaterializedViews,
  getOptimizations,
  optimizeProject,
  updateDataset,
} from '@/services/axios/backendApi'

const getDefaultState = () => {
  return {
    // Project map
    projects: {},
    // Global project loading
    loading: false,
    // Selected project on /project/:projectId
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
      let projectId = project.projectId
      if (state.projects.hasOwnProperty(projectId)) {
        // Update project fields on existing loaded project
        Object.assign(state.projects[projectId], { ...project })
      } else {
        // Add a new project entry
        state.projects[projectId] = { ...project }
      }
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
      dispatch('LOAD_PLANS', projectId)
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
      commit('SET_USER_STATE', { loading: true })
      try {
        let projects = await getProjects()
        projects.forEach(project => {
          commit('ADD_PROJECT', project)
          if (project.activated) {
            dispatch('LOAD_PLANS', project.projectId)
          }
        })
      } catch (e) {}
      commit('SET_STATE', { loading: false })
    },
    /**
     * Load a plan
     *
     * @param { projectId }
     */
    async LOAD_PLANS({ commit, getters }, projectId) {
      let customerId = getters.project(projectId).stripeCustomerId
      if (!customerId) {
        throw new Error(`customerId not found for ${projectId}`)
      }
      commit('SET_PROJECT_STATE', { projectId, planLoading: true })
      commit('SET_PROJECT_STATE', { projectId, plans: await getPlans(customerId) })
      commit('SET_PROJECT_STATE', { projectId, planLoading: false })
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
      // Series chart is deactivated for now.
      // It will be reactivated when we implement a project setup  process that persist the stats
      // getChartsStatistics(projectId, timeframe).then(chartsStatistics =>
      //   commit('SET_PROJECT_STATE', {
      //     projectId,
      //     chartsStatistics,
      //     chartsStatisticsLoading: false,
      //   }),
      // )
    },
    /**
     * Delete all the materialized views created by Achilio
     *
     * @param { projectId }
     * @returns
     */
    DELETE_ALL_MATERIALIZED_VIEWS({ getters }) {
      return new Promise((resolve, reject) =>
        deleteAllMaterializedViews(getters.selectedProjectId)
          .then(() => resolve())
          .catch(() => reject()),
      )
    },
    /**
     *
     *
     * @param {*} payload
     */
    async LOAD_OPTIMIZATIONS({ commit }, payload) {
      let projectId = payload.projectId
      commit('SET_PROJECT_STATE', { projectId, optimizationsLoading: true })
      commit('SET_PROJECT_STATE', {
        projectId,
        optimizations: await getOptimizations({ projectId }),
        optimizationsLoading: false,
      })
    },
    /**
     * Load an optimization and set as selected.
     *
     * @param { projectId, optimizationId } payload
     */
    async LOAD_SELECTED_OPTIMIZATION({ commit }, payload) {
      let projectId = payload.projectId
      let optimizationId = payload.optimizationId
      commit('SET_PROJECT_STATE', { projectId, selectedOptimizationLoading: true })
      commit('SET_PROJECT_STATE', {
        projectId,
        selectedOptimization: await getOptimizations({ projectId, optimizationId }),
        selectedOptimizationLoading: false,
      })
    },
    /**
     * Run an sync optimization.
     * TODO: Allow payload with optimize paramaters (ie: timeframe)
     *
     * @param { projectId } projectId
     */
    async RUN_OPTIMIZE({ commit, dispatch }, projectId) {
      commit('SET_STATE', { loading: true })
      await optimizeProject(projectId, { days: 28 })
        .then(() => {
          message.loading(`Optimization started...`, 5)
          dispatch('LOAD_OPTIMIZATIONS', { projectId: projectId })
        })
        .catch(() => message.error(`Optimization error.`, 5))
        .finally(() => commit('SET_STATE', { loading: false }))
    },
    /**
     * Load all datasets as map
     *
     * @param { projectId } payload
     */
    async LOAD_DATASETS({ commit }, payload) {
      let projectId = payload.projectId
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
    },
  },
  getters: {
    loading: state => state.loading,
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
    // Returns the selected customer id
    selectedCustomerId: (state, getters) =>
      getters.hasSelectedProject ? getters.selectedProject.stripeCustomerId : null,
    // Statistics / KPI
    hasSelectedProjectKpi: (state, getters) =>
      getters.hasSelectedProject && getters.selectedProject.kpi !== undefined,
    hasSelectedProjectCharts: (state, getters) =>
      getters.hasSelectedProject && getters.selectedProject.chartsStatistics !== undefined,
    selectedProjectKpi: (state, getters) => getters.selectedProject.kpi,
    kpiTotalQueries: (state, getters) =>
      getters.hasSelectedProjectKpi ? getters.selectedProjectKpi.totalQueries : -1,
    kpiPercentQueriesInMV: (state, getters) =>
      getters.hasSelectedProjectKpi ? getters.selectedProjectKpi.percentQueriesIn : -1,
    kpiAverageScannedBytes: (state, getters) =>
      getters.hasSelectedProjectKpi ? getters.selectedProjectKpi.averageScannedBytes : -1,
    chartsStatistics: (state, getters) =>
      getters.hasSelectedProjectCharts ? getters.selectedProject.chartsStatistics : [],
    isChartsStatisticsLoading: (state, getters) => getters.selectedProject.chartsStatisticsLoading,
    // Plans
    //
    plans: state => projectId => state.projects[projectId].plans,
    // Get plan by project id
    activePlanName: (state, getters) => projectId => {
      let plan = null
      if (getters.plans) {
        plan = state.projects[projectId].plans.find(p => p.subscription !== null)
      }
      return plan ? plan.name : null
    },
    hasSelectedProjectPlan: (state, getters) =>
      getters.hasSelectedProject &&
      getters.selectedProject.plans &&
      getters.selectedProject.plans.some(p => p.subscription !== null),
    selectedProjectPlan: (state, getters) =>
      getters.selectedProject.plans.find(p => p.subscription !== null),
    isSelectedProjectPlanLoading: (state, getters) => getters.selectedProject.planLoading,
    // Optimizations
    allOptimizations: (state, getters) =>
      _.orderBy(getters.selectedProject.optimizations, 'createdDate', 'desc'),
    isOptimizationsLoading: (state, getters) => getters.selectedProject.optimizationsLoading,
    selectedOptimization: (state, getters) => getters.selectedProject.selectedOptimization,
    isSelectedOptimizationLoading: (state, getters) =>
      getters.selectedProject.selectedOptimizationLoading,
    selectedOptimizationAppliedResults: (state, getters) =>
      _.filter(getters.selectedOptimization.results, r => r.status === 'APPLY'),
    selectedOptimizationNotAppliedResults: (state, getters) =>
      _.filter(getters.selectedOptimization.results, r => r.status === 'PLAN_LIMIT_REACHED'),
    // Datasets
    allDatasets: (state, getters) =>
      getters.selectedProject.datasets === undefined
        ? []
        : Object.values(getters.selectedProject.datasets),
    atLeastOneDatasetIsActivated: (state, getters) => getters.allDatasets.some(d => d.activated),
    isDatasetsLoading: (state, getters) => getters.selectedProject.datasetsLoading,
  },
}
