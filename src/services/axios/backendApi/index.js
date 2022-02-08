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

export async function getProjectMetadata(payload) {
  // Return id, name, planName
  let projectId = payload.projectId
  const { data } = await backendClient.get(`/project/${projectId}/metadata`)
  return data
}

export async function getDatasetTables(payload) {
  // Return list of table in a single dataset
  let projectId = payload.projectId
  let datasetId = payload.datasetId
  const { data } = await backendClient.get(`project/${projectId}/dataset/${datasetId}/table`)

  return data
}

export async function getQueryStatistics(payload) {
  let projectId = payload.projectId
  let lastDays = payload.lastDays
  const { data } = await backendClient.get(`/project/${projectId}/queries/${lastDays}/statistics`)
  return data
}

export async function postOptimizeDataset(payload) {
  let projectId = payload.projectId
  let datasetName = payload.datasetName
  const { data } = await backendClient.post(`/optimize/${projectId}/dataset/${datasetName}`)
  return data
}

export async function updateProjectMetadata(projectId, payload) {
  const { data } = await backendClient.post(`/project/${projectId}/metadata`, payload)
  return data
}

export async function getOptimizations(payload) {
  let projectId = payload.projectId
  const { data } = await backendClient.get(`/optimize/project/${projectId}`)
  return data
}
