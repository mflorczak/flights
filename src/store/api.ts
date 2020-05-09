import axios from 'axios'
import { UserSubmit, User, UserRegister, ApiResponse, City, Flight } from './models'
import { mapResponseOnFlight } from '@/helper/flightHelper'

export const flightApi = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {'Accept-Language': 'pl'}
  })

export function setJWT(jwt: string) {
  flightApi.defaults.headers.common['Authorization'] = jwt
}

export function clearJWT() {
  delete flightApi.defaults.headers.common['Authorization']
}

export async function loginUser(user: UserSubmit): Promise<User> {
  const response = await flightApi.post('auth/signin', {
    ...user
  })
  return response.data
}

export async function registerUser(user: UserRegister): Promise<ApiResponse> {
  const response = await flightApi.post('auth/signup', {
    ...user
  })
  return response.data
}

export async function forgotPassword(usernameOrEmail: string): Promise<ApiResponse> {
  const response = await flightApi.post('auth/forgot-password', {
    username: usernameOrEmail
  })
  return response.data
}

export async function changePassword(email: string, password: string): Promise<ApiResponse> {
  const response = await flightApi.post('auth/reset-password', {
    email, password
  })
  return response.data
}

export async function searchCity(cityName: string): Promise<City[]> {
  const response = await flightApi.get(`cities`, {
    params: {
      cityName
    }
  })
  return response.data
}

export async function searchFlights(originPlaceId: string, destinationPlaceId: string, outboundDate: Date, inboundDate: Date): Promise<any[]> {
  const response = await flightApi.get(`search/file`, {
    params: {
      originPlaceId,
      destinationPlaceId,
      outboundDate,
      inboundDate
    }
  })
  return response.data.filter((data:any) => data.directionality === 'Outbound')
}

export async function bookFlight(userEmail: string, flight: any) {
  const response = await flightApi.post(`booking/flight?usernameOrEmail=${userEmail}`, {
    ...flight
  })
  return response.data
}

export async function bookedUserFlights(usernameOrEmail: string): Promise<Flight[]> {
  const response = await flightApi.get(`booking/user-flights`, {
    params: {
      usernameOrEmail
    }
  })

  let flights: Flight[] = []

  response.data.flights.forEach((flight: any) => flights.push(mapResponseOnFlight(flight)))
  return flights
}

