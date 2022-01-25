import axios from 'axios'
import store from '@/store'
import { notification } from 'ant-design-vue'

const backendClient = axios.create({
  baseURL: `${process.env.VUE_APP_API_BASE_URL}/api/v1`,
  timeout: 60000,
})

backendClient.interceptors.request.use(request => {
  const accessToken = store.getters['user/accessToken']
  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`
  }
  return request
})

backendClient.interceptors.response.use(undefined, error => {
  // Errors handling
  const { response } = error
  const { data } = response
  if (data) {
    notification.warning({
      message: data,
    })
  }
})

export default backendClient
