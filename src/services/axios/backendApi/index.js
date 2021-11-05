import apiClient from '../index'

export async function getProjects() {
  const { data } = await apiClient.get('/project')
  return data
}

export async function getDatasets(payload) {
  let projectId = payload.projectId
  const { data } = await apiClient.get(`/project/${projectId}/dataset`)
  return data
}

export async function getProjectMetadata(payload) {
  // Return id, name, planName
  let projectId = payload.projectId
  const { data } = await apiClient.get(`/project/${projectId}/metadata`)
  return data
}

export async function getDatasetTables(payload) {
  // Return list of table in a single dataset
  let projectId = payload.projectId
  let datasetId = payload.datasetId
  const { data } = await apiClient.get(`project/${projectId}/dataset/${datasetId}/table`)

  return data
}

export async function getQueryStatistics(payload) {
  let projectId = payload.projectId
  let lastDays = payload.lastDays
  const {data} = await apiClient.get(`/project/${projectId}/queries/${lastDays}/statistics`)
  return data
}