import authClient from '@/services/axios/authClient'

export function getUserInfo() {
  return authClient.get('/users/me/')
}

export async function logout() {
  return await authClient.post('/auth/logout/')
}
