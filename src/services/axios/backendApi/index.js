import apiClient from '../index'

export async function getProjects() {
   try {
    const {data} = await apiClient.get('/project')
    return data
  }
  catch (error) {
    console.log(error);
  }
}