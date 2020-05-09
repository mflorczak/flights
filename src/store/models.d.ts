export interface UserSubmit {
  usernameOrEmail: string
  password: string
}

export interface User {
  accessToken: string
  username: string
  emailAddress: string
}

export interface UserResponse {
  user: User
}

export interface UserRegister {
  name: string
  surname: string
  email: string
  password: string
  username: string
}

export interface ApiResponse {
  success: boolean
  message: string
}

export interface City {
  id: string
  Name: string
}

export interface Flight {
  originCity: City
  destinationCity: City
  departureDateTime: Date
  arrivalDateTime: Date
  directionality: string
}