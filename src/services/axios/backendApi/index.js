import apiClient from '../index'

export async function getProjects() {
    const {data} = await apiClient.get('/project')
    return data
}

export async function getDatasets(payload) {
  let projectId = payload.projectId
  const {data} = await apiClient.get(`/project/${projectId}/dataset`)
  return data
}

export async function getQueryStatistics(payload) {
  let projectId = payload.projectId
  let lastDays = payload.lastDays
  const {data} = await apiClient.get(`/project/${projectId}/queries/${lastDays}/statistics`)
  return data
}