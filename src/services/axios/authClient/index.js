import axios from 'axios'

const authClient = axios.create({
  baseURL: `${process.env.VUE_APP_AUTH_BASE_URL}/api/v1`,
  withCredentials: true, // Forward JWT token
})

export default authClient
