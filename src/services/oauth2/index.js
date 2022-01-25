import apiClient from '@/services/axios'

export async function login() {
  const googleAuthUrl = 'https://accounts.google.com/o/oauth2/v2/auth'
  const redirectUri = 'api/v1/auth/login/google/'

  const scope = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
  ].join(' ')

  const params = {
    response_type: 'code',
    client_id: '293325499254-8h7bv5piflnjdoufjak8jjh03tpqss8b.apps.googleusercontent.com',
    redirect_uri: `http://localhost:8000/${redirectUri}`,
    prompt: 'consent',
    include_granted_scopes: 'true',
    access_type: 'offline',
    scope,
  }

  const urlParams = new URLSearchParams(params).toString()

  window.location = `${googleAuthUrl}?${urlParams}`
}

export async function currentAccount() {
  return apiClient
    .get('http://localhost:8000/api/v1/users/me', { withCredentials: true })
    .then(response => {
      if (response) {
        // const { accessToken } = response.data
        // if (accessToken) {
        //   store.set('accessToken', accessToken)
        // }
        return response.data
      }
      return false
    })
    .catch(err => console.log(err))
  return {}
}

export async function logout() {
  return {}
}
