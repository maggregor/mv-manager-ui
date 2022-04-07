import axios from 'axios'
import store from '@/store'
import { message } from 'ant-design-vue'

axios.defaults.withCredentials = true
const backendClient = axios.create({
  baseURL: `${process.env.VUE_APP_API_BASE_URL}/api/v1`,
  // We currently have a synchronous call on optimize
  // and we don't know how long time it might take
  timeout: 180000, // 30-min
})

backendClient.interceptors.request.use(request => {
  const idToken = store.getters['idToken']
  if (idToken) {
    request.headers.Authorization = `Bearer ${idToken}`
  }
  return request
})

backendClient.interceptors.response.use(
  response => {
    // Response handling
    if (response.config.url === '/project') {
      store.commit('SET_USER_STATE', { insufficientPermissions: false })
    }
    return response
  },
  error => {
    // Errors handling
    const { response } = error
    if (!response) {
      // Backend server is unreachable
      store.dispatch('UNREACHABLE_BACKEND_SERVER')
    } else if (response.config.url === '/project' && response.status === 403) {
      store.commit('SET_USER_STATE', { insufficientPermissions: true })
    } else if (response && response.data) {
      const { data } = response
      message.error(data.message, 5)
    }
  },
)

export default backendClient
