import backendClient from '@/services/axios/backendClient'

export async function getProjects() {
  const { data } = await backendClient.get('/project')
  return data
}

export async function getDatasets(payload) {
  let projectId = payload.projectId
  const { data } = await backendClient.get(`/project/${projectId}/dataset`)
  return data
}

export async function getProject(payload) {
  // Return id, name, planName
  let projectId = payload.projectId
  const { data } = await backendClient.get(`/project/${projectId}`)
  return data
}

export async function getDatasetTables(payload) {
  // Return list of table in a single dataset
  let projectId = payload.projectId
  let datasetId = payload.datasetId
  return ({ data } = await backendClient.get(`project/${projectId}/dataset/${datasetId}/table`))
}

export async function getQueryStatistics(payload) {
  let projectId = payload.projectId
  let lastDays = payload.lastDays
  const { data } = await backendClient.get(`/project/${projectId}/queries/${lastDays}/statistics`)
  return data
}

export function optimizeProject(projectId) {
  return backendClient.post(`/optimize/${projectId}`)
}

export async function updateProject(projectId, payload) {
  const { data } = await backendClient.post(`/project/${projectId}`, payload)
  return data
}

export function updateDatasetMetadata(projectId, datasetName, payload) {
  return backendClient.post(`/project/${projectId}/dataset/${datasetName}`, payload)
}

export async function getOptimizations(payload) {
  let projectId = payload.projectId
  let optimizationId = payload.optimizationId
  let resource = `/optimize/${projectId}`
  if (optimizationId) {
    resource += `/${optimizationId}`
  }
  const { data } = await backendClient.get(resource)
  return data
}

export async function getDailyStatistics(projectId, days) {
  const { data } = await backendClient.get(
    `/project/${projectId}/queries/${days}/statistics/series`,
  )
  return data
}

export function deleteAllMaterializedViews(projectId) {
  return backendClient.delete(`/optimize/${projectId}`)
}

/**
 * POST
 *
 * Create an new subscription based on the priceId
 *
 * @param { customerId, priceId }
 * @returns
 */
export function createSubscription(payload) {
  return backendClient.post(`/subscription`, payload)
}

/**
 *
 * @param { subscriptionId } payload
 * @returns
 */
export function getSubscription(payload) {
  let subscriptionId = payload.subscriptionId
  return backendClient.get(`/subscription/${subscriptionId}`, payload)
}

/**
 *
 * @param { subscriptionId } payload
 * @returns
 */
export function cancelSubscription(payload) {
  let subscriptionId = payload.subscriptionId
  return backendClient.delete(`/subscription/${subscriptionId}`, payload)
}

/**
 *
 * @param { subscriptionId } payload
 * @returns
 */
export function updateSubscription(payload) {
  let subscriptionId = payload.subscriptionId
  return backendClient.post(`/subscription/${subscriptionId}`, payload)
}

/**
 *
 * @param { customerId } payload
 * @returns
 */
export async function getPlans(payload) {
  const { data } = await backendClient.get(`/plan`, {
    params: { customerId: payload.customerId },
  })
  return data
}

/**
 *
 * @param { customerId } payload
 * @returns
 */
export async function getLatestIntentClientSecret(payload) {
  let subscriptionId = payload.subscriptionId
  const { data } = await backendClient.get(
    `/subscription/${subscriptionId}/latestIntentClientSecret`,
  )
  return data
}
