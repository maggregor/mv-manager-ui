import * as authApi from '@/services/axios/authApi'

export async function login() {
  const googleAuthUrl = process.env.VUE_APP_GOOGLE_OAUTH2_URL
  const authServerUrl = process.env.VUE_APP_AUTH_BASE_URL
  const redirectUri = process.env.VUE_APP_SERVER_AUTH_REDIRECT

  const scope = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/bigquery',
  ].join(' ')

  const params = {
    response_type: 'code',
    client_id: `${process.env.VUE_APP_GOOGLE_OAUTH2_CLIENT_ID}`,
    redirect_uri: `${authServerUrl}/${redirectUri}`,
    prompt: 'consent',
    include_granted_scopes: 'true',
    access_type: 'offline',
    scope,
  }

  const urlParams = new URLSearchParams(params).toString()

  window.location = `${googleAuthUrl}?${urlParams}`
}

export function currentAccount() {
  return authApi.getUserInfo()
}

export async function logout() {
  return await authApi.logout()
}
