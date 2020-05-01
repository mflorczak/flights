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