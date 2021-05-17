import axios from 'axios'
import store from '@/store'
import { notification } from 'ant-design-vue'

const apiClient = axios.create({
  baseURL: `${process.env.VUE_APP_API_BASE_URL}/api/v1`,
  // timeout: 1000,
  // headers: { 'X-Custom-Header': 'foobar' }
})

apiClient.interceptors.request.use(request => {
  const accessToken = store.getters['user/user'].accessToken
  if (accessToken) {
    // TODO Add Bearer optimizer side (and here too)
    request.headers.Authorization = `Bearer ${accessToken}`
    request.headers.AccessToken = accessToken
  }
  return request
})

apiClient.interceptors.response.use(undefined, error => {
  // Errors handling
  const { response } = error
  const { data } = response
  if (data) {
    notification.warning({
      message: data,
    })
  }
})

export default apiClient
