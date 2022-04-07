import axios from 'axios'
axios.defaults.withCredentials = true
const authClient = axios.create({
  baseURL: `${process.env.VUE_APP_AUTH_BASE_URL}/api/v1`,
})

export default authClient
