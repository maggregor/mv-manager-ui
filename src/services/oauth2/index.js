// import apiClient from '@/services/axios'
// import store from 'store'

const axios = require('axios')
const oauth = require('axios-oauth-client')

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'

export async function login() {
  const getAuthorizationCode = oauth.client(axios.create(), {
    url: 'http://localhost:8080/authorize',
    grant_type: 'client_credentials',
    client_id: '293325499254-8h7bv5piflnjdoufjak8jjh03tpqss8b.apps.googleusercontent.com',
    client_secret: 'OZeUkdunGSTQ7ZyvM7oDtabD',
    redirect_uri: 'http://localhost:8080/oauth2callback',
    scope: 'any',
  })
  const auth = await getAuthorizationCode()
}

export async function currentAccount() {
  return {}
}

export async function logout() {
  return {}
}
