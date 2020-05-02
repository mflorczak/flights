export interface UserSubmit {
  usernameOrEmail: string
  password: string
}

export interface User {
  accessToken: string,
  username: string,
  emailAddress: string
}

export interface UserResponse {
  user: User
}

export interface UserRegister {
  name: string,
  surname: string,
  email: string,
  password: string,
  username: string
}

export interface ApiResponse {
  success: boolean,
  message: string
}