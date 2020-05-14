import Cookies from 'js-cookie'

const TOKEN = 'TOKEN'
const EMAIL = 'EMAIL'


export const getAccessToken = () => Cookies.get(TOKEN)
export const setAccessToken = (token: string) => Cookies.set(TOKEN, token)

export const getEmail = () => Cookies.get(EMAIL)
export const setEmail = (email: string) => Cookies.set(EMAIL, email)


export const clearCredentials = () => {
  Cookies.remove(TOKEN)
  Cookies.remove(EMAIL)
}