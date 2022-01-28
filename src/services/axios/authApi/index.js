import authClient from '@/services/axios/authClient'

export async function getUserInfo() {
  return await authClient.get('/users/me/')
}

export async function logout() {
  return await authClient.post('/auth/logout/')
}
