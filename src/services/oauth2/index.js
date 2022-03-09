import * as authApi from '@/services/axios/authApi'

const googleAuthUrl = process.env.VUE_APP_GOOGLE_OAUTH2_URL
const authServerUrl = process.env.VUE_APP_AUTH_BASE_URL
const redirectUri = process.env.VUE_APP_SERVER_AUTH_REDIRECT

/**
 * Non sensitive scopes
 */
const basicScopes = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
].join(' ')

/**
 * Sensitives scopes
 */
const fullScopes = [
  basicScopes,
  'https://www.googleapis.com/auth/bigquery',
  'https://www.googleapis.com/auth/cloudplatformprojects.readonly',
].join(' ')

const params = {
  response_type: 'code',
  client_id: `${process.env.VUE_APP_GOOGLE_OAUTH2_CLIENT_ID}`,
  redirect_uri: `${authServerUrl}/${redirectUri}`,
  prompt: 'consent',
  include_granted_scopes: 'true',
  access_type: 'offline',
}

export async function login() {
  params.scope = basicScopes
  const urlParams = new URLSearchParams(params).toString()
  window.location = `${googleAuthUrl}?${urlParams}`
}

export async function grantAccessBigQuery() {
  params.scope = fullScopes
  const urlParams = new URLSearchParams(params).toString()
  window.location = `${googleAuthUrl}?${urlParams}`
}

export function currentAccount() {
  return authApi.getUserInfo()
}

export async function logout() {
  return await authApi.logout()
}
