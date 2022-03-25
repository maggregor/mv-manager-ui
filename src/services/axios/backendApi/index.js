import client from '@/services/axios/backendClient'

export async function getProjects() {
  const { data } = await client.get('/project')
  return data
}

export async function getDatasets(payload) {
  let projectId = payload.projectId
  const { data } = await client.get(`/project/${projectId}/dataset`)
  return data
}

/**
 * Returns a project
 *
 * @param {*} projectId
 * @returns
 */
export async function getProject(projectId) {
  const { data } = await client.get(`/project/${projectId}`)
  return data
}

export async function getDatasetTables(payload) {
  // Return list of table in a single dataset
  let projectId = payload.projectId
  let datasetId = payload.datasetId
  return ({ data } = await client.get(`project/${projectId}/dataset/${datasetId}/table`))
}

export async function getQueryStatistics(projectId, timeframe) {
  const { data } = await client.get(`/project/${projectId}/queries/${timeframe}/statistics`)
  return data
}

export async function getKPIStatistics(projectId, timeframe) {
  const { data } = await client.get(`/project/${projectId}/queries/${timeframe}/statistics/kpi`)
  return data
}

export function optimizeProject(projectId) {
  return client.post(`/optimize/${projectId}`)
}

export async function updateProject(projectId, payload) {
  const { data } = await client.patch(`/project/${projectId}`, payload)
  return data
}

export function updateDataset(projectId, datasetName, payload) {
  return client.put(`/project/${projectId}/dataset/${datasetName}`, payload)
}

export async function getOptimizations(payload) {
  let projectId = payload.projectId
  let optimizationId = payload.optimizationId
  let resource = `/optimize/${projectId}`
  if (optimizationId) {
    resource += `/${optimizationId}`
  }
  const { data } = await client.get(resource)
  return data
}

export async function getChartsStatistics(projectId, timeframe) {
  const { data } = await client.get(`/project/${projectId}/queries/${timeframe}/statistics/series`)
  return data
}

export function deleteAllMaterializedViews(projectId) {
  return client.delete(`/optimize/${projectId}`)
}

/**
 * POST
 *
 * Create an new subscription based on the priceId
 *
 * @param { customerId, priceId, projectId }
 * @returns
 */
export function createSubscription(payload) {
  return client.post(`/subscription`, payload)
}

/**
 *
 * @param { subscriptionId } payload
 * @returns
 */
export function getSubscription(payload) {
  let subscriptionId = payload.subscriptionId
  return client.get(`/subscription/${subscriptionId}`, payload)
}

/**
 *
 * @param { subscriptionId } payload
 * @returns
 */
export function cancelSubscription(payload) {
  let subscriptionId = payload.subscriptionId
  return client.delete(`/subscription/${subscriptionId}`, payload)
}

/**
 *
 * @param { subscriptionId } payload
 * @returns
 */
export function updateSubscription(payload) {
  let subscriptionId = payload.subscriptionId
  return client.post(`/subscription/${subscriptionId}`, payload)
}

/**
 *
 * @param { projectId }
 * @returns
 */
export async function getPlans(projectId) {
  const { data } = await client.get(`/plan`, { params: { projectId } })
  return data
}

/**
 *
 * @param { subscriptionId } payload
 * @returns
 */
export async function getLatestIntentClientSecret(payload) {
  let subscriptionId = payload.subscriptionId
  const { data } = await client.get(`/subscription/${subscriptionId}/latestIntentClientSecret`)
  return data
}

/**
 *
 */
export async function getOrganizations() {
  const { data } = await client.get(`/organization`)
  return data
}
