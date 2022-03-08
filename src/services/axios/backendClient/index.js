import axios from 'axios'
import store from '@/store'
import { message } from 'ant-design-vue'

const backendClient = axios.create({
  baseURL: `${process.env.VUE_APP_API_BASE_URL}/api/v1`,
  // We currently have a synchronous call on optimize
  // and we don't know how long time it might take
  timeout: 180000, // 30-min
})

backendClient.interceptors.request.use(request => {
  const accessToken = store.getters['accessToken']
  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`
  }
  return request
})

backendClient.interceptors.response.use(
  response => {
    if (response.config.url === '/project') {
      store.commit('SET_USER_STATE', { insufficientPermissions: false })
    }
    return response
  },
  error => {
    // Errors handling
    const { response } = error
    if (response.config.url === '/project' && response.status === 403) {
      store.commit('SET_USER_STATE', { insufficientPermissions: true })
    } else if (response && response.data) {
      const { data } = response
      message.error(data.message, 5)
    } else {
      message.error('Achilio API is unreachable.', 8)
    }
  },
)

export default backendClient
