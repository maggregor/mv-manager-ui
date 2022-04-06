import {
  getAllFetcherQueryJobs,
  getAllFetcherStructJobs,
  createNewFetcherQueryJob,
  createNewFetcherStructJob,
} from '@/services/axios/backendApi'
const _ = require('lodash')

const state = {
  lastFetcherStructJob: {},
  loadingFetcherStructJob: false,
  lastFetcherQueryJob: {},
  loadingFetcherQueryJob: false,
}

export default {
  state,
  mutations: {
    SET_SYNC_STATE(state, payload) {
      Object.assign(state, {
        ...payload,
      })
    },
  },
  actions: {
    async LOAD_LAST_FETCHERS({ dispatch }, projectId) {
      dispatch('LOAD_LAST_FETCHER_QUERY_JOB', projectId)
      dispatch('LOAD_LAST_FETCHER_STRUCT_JOB', projectId)
    },
    async LOAD_LAST_FETCHER_QUERY_JOB({ commit }, projectId) {
      const jobs = await getAllFetcherQueryJobs({ projectId, last: true })
      if (jobs) {
        commit('SET_SYNC_STATE', { lastFetcherQueryJob: jobs[0] })
      }
    },
    async LOAD_LAST_FETCHER_STRUCT_JOB({ commit }, projectId) {
      const jobs = await getAllFetcherStructJobs({ projectId, last: true })
      if (jobs) {
        commit('SET_SYNC_STATE', { lastFetcherStructJob: jobs[0] })
      }
    },
    async SYNC_ALL({ dispatch }, projectId) {
      dispatch('SYNC_QUERIES', { projectId, timeframe: 30 })
      dispatch('SYNC_STRUCTS', { projectId })
    },
    async SYNC_STRUCTS({ commit, dispatch }, payload) {
      const projectId = payload.projectId
      commit('SET_SYNC_STATE', { loadingStruct: true })
      const lastFetcherStructJob = await createNewFetcherStructJob(payload)
      commit('SET_SYNC_STATE', { loadingStruct: false, lastFetcherStructJob })
      dispatch('LOAD_ALL_STRUCTS', { projectId })
    },
    async SYNC_QUERIES({ commit }, payload) {
      commit('SET_SYNC_STATE', { loadingQuery: true })
      const lastFetcherQueryJob = await createNewFetcherQueryJob(payload)
      commit('SET_SYNC_STATE', { loadingQuery: false, lastFetcherQueryJob })
    },
  },
  getters: {
    isLastFetcherQueryJobPending: state => {
      const job = state.lastFetcherQueryJob
      if (!job) {
        return false
      }
      return job.status === 'WORKING' || job.status === 'PENDING'
    },
    isSynchronizing: (state, getters) =>
      state.loadingStruct || state.loadingQuerys || getters.isLastFetcherQueryJobPending,
    lastFetcherQueryJob: state => state.lastFetcherQueryJob,
    lastFetcherStructJob: state => state.lastFetcherFetcherJob,
    loadingFetcherQueryJob: state => state.loadingFetcherQueryJob,
    loadingFetcherStructJob: state => state.loadingFetcherStructJob,
  },
}
