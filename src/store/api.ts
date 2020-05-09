import axios from 'axios'
import { UserSubmit, User, UserRegister, ApiResponse, City, Flight } from './models'

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

export async function changePassword(email: string, password: string): Promise<ApiResponse> {
  const response = await flightApi.post('api/auth/reset-password', {
    email, password
  })
  return response.data
}

export async function searchCity(cityName: string): Promise<City[]> {
  const response = await flightApi.get(`api/cities`, {
    params: {
      cityName
    }
  })
  return response.data
}

export async function searchFlights(originPlaceId: string, destinationPlaceId: string, outboundDate: Date, inboundDate: Date): Promise<Flight[]> {
  const response = await flightApi.get(`/search/file`, {
    params: {
      originPlaceId,
      destinationPlaceId,
      outboundDate,
      inboundDate
    }
  })
  return response.data
}

