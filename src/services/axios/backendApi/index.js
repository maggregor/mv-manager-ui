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