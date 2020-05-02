import axios from 'axios'
import { UserSubmit, User, UserRegister, ApiResponse } from './models'

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

export async function registerUser(user: UserRegister): Promise<ApiResponse> {
  const response = await flightApi.post('api/auth/signup', {
    ...user
  })
  return response.data
}

export async function forgotPassword(usernameOrEmail: string): Promise<ApiResponse> {
  const response = await flightApi.post('api/auth/forgot-password', {
    username: usernameOrEmail
  })
  return response.data
}
