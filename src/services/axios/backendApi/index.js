import client from '@/services/axios/backendClient'

export async function getProjects() {
  const { data } = await client.get('/project')
  return data
}

/**
 * Create project
 * @param {*} payload
 * @returns
 */
export async function createProject(payload) {
  let projectId = payload.projectId
  let connectionId = payload.connectionId
  const { data } = await client.post('/project', { projectId, connectionId })
  return data
}

/**
 * Delete project
 * @param {*} payload
 * @returns
 */
export async function deleteProject(projectId) {
  await client.delete(`/project/${projectId}`)
}

export async function getDatasets(payload) {
  let projectId = payload.projectId
  const { data } = await client.get(`/project/${projectId}/dataset`)
  return data
}

export async function getTables(projectId) {
  const { data } = await client.get(`/table`, { params: { projectId } })
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

export async function getStatistics(projectId, timeframe, type) {
  const { data } = await client.get(`/query/statistics`, { params: { projectId, timeframe, type } })
  return data
}

export function findMvJob(payload) {
  const projectId = payload.projectId
  return client.post(`/job/mv`, { projectId })
}

export async function synchronizeQueries(payload) {
  const projectId = payload.projectId
  return client.post(`/job/batch/query`, { projectId, timeframe: 1 })
}

export async function synchronizeDataModel(payload) {
  const projectId = payload.projectId
  return client.post(`/job/batch/data-model`, { projectId })
}

export async function updateProject(projectId, payload) {
  const { data } = await client.patch(`/project/${projectId}`, payload)
  return data
}

export function updateDataset(projectId, datasetName, payload) {
  return client.put(`/project/${projectId}/dataset/${datasetName}`, payload)
}

export function deleteAllMaterializedViews(projectId) {
  return client.delete(`/optimize/${projectId}`)
}

/**
 */
export async function getSubscription() {
  const { data } = await client.get(`/subscription`)
  return data
}
/**
 */
export async function getAllProducts() {
  const { data } = await client.get(`/products`)
  return data
}

export async function getAllPrices() {
  const { data } = await client.get(`/prices`)
  return data
}

export async function getSubscriptionChecks() {
  const { data } = await client.get(`/subscription/checks`)
  return data
}

export async function getAllConnections() {
  const { data } = await client.get(`/connection`)
  return data
}

export async function getConnection(id) {
  const { data } = await client.get(`/connection/${id}`)
  return data
}

export async function deleteConnection(id) {
  const { data } = await client.delete(`/connection/${id}`)
  return data
}

export async function updateConnection(id, payload) {
  const { data } = await client.patch(`/connection/${id}`, payload)
  return data
}

export async function createConnection(payload) {
  const { data } = await client.post(`/connection`, payload)
  return data
}

export async function createPortalSession() {
  const { data } = await client.get(`/create-customer-portal-session`)
  return data
}

export async function getAllMaterializedViews(projectId) {
  const { data } = await client.get(`/mv`, { params: { projectId } })
  return data
}

export async function actionMaterializedView(id, payload) {
  const { data } = await client.patch(`/mv/${id}`, payload)
  return data
}

export async function deleteMaterializedView(id, projectId) {
  const { data } = await client.delete(`/mv/${id}`, { params: { projectId } })
  return data
}
