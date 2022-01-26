import axios from 'axios'
import { notification } from 'ant-design-vue'

const authClient = axios.create({
  baseURL: `${process.env.VUE_APP_AUTH_BASE_URL}`,
  withCredentials: true, // Forward JWT token
})

export default authClient
