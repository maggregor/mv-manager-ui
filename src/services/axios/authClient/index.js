import axios from 'axios'
import { notification } from 'ant-design-vue'

const authClient = axios.create({
  baseURL: `${process.env.VUE_APP_AUTH_BASE_URL}`,
  withCredentials: true, // Forward JWT token
})

authClient.interceptors.response.use(undefined, error => {
  // Errors handling
  const { response } = error
  const { data } = response
  if (data) {
    notification.warning({
      message: data,
    })
  }
})

export default authClient
