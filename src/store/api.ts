import axios from 'axios'
import { UserSubmit, User, UserResponse } from './models'

export const flightApi = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {'Accept-Language': 'pl'}
  })

export function setJWT(jwt: string) {
  flightApi.defaults.headers.common['Authorization'] = jwt
}

export function clearJWT() {
  delete flightApi.defaults.headers.common['Authorization']
}

export async function loginUser(user: UserSubmit): Promise<User> {
  const response = await flightApi.post('api/auth/signin', {
    ...user
  })
  return response.data
}
