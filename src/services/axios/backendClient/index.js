import axios from 'axios'
import store from '@/store'
import { message } from 'ant-design-vue'

const backendClient = axios.create({
  baseURL: `${process.env.VUE_APP_API_BASE_URL}/api/v1`,
  timeout: 60000,
})

backendClient.interceptors.request.use(request => {
  const accessToken = store.getters['accessToken']
  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`
  }
  return request
})

backendClient.interceptors.response.use(undefined, error => {
  // Errors handling
  const { response } = error
  if (response && response.data) {
    const { data } = response
    message.error(data.message, 5)
  } else {
    message.error('Achilio API is unreachable.', 8)
  }
})

export default backendClient
