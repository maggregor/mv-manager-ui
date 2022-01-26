import authClient from '@/services/axios/authClient'

export async function getUserInfo() {
  return await authClient.get('/api/v1/users/me/')
}
