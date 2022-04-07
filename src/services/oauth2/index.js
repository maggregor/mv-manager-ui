import * as authApi from '@/services/axios/authApi'

const googleAuthUrl = process.env.VUE_APP_GOOGLE_OAUTH2_URL
const authServerUrl = process.env.VUE_APP_AUTH_BASE_URL
const redirectUri = process.env.VUE_APP_SERVER_AUTH_REDIRECT

/**
 * Non sensitive scopes
 */
const nonSensitiveScopes = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
].join(' ')

const params = {
  response_type: 'code',
  client_id: `${process.env.VUE_APP_GOOGLE_OAUTH2_CLIENT_ID}`,
  redirect_uri: `${authServerUrl}/${redirectUri}`,
  prompt: 'consent',
  access_type: 'offline',
  scope: nonSensitiveScopes,
}

export async function login() {
  const urlParams = new URLSearchParams(params).toString()
  window.location = `${googleAuthUrl}?${urlParams}`
}

export function currentAccount() {
  return authApi.getUserInfo()
}

export async function logout() {
  return await authApi.logout()
}
