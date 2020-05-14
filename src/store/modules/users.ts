import store from '@/store'
import { Module, VuexModule, getModule, MutationAction, Action, Mutation } from 'vuex-module-decorators'
import { loginUser } from '../api'
import { User, UserSubmit } from '../models'
import Cookies from 'js-cookie'
import { setAccessToken, setEmail, getEmail, getAccessToken, clearCredentials } from '../cookies'

@Module({ dynamic: true, store, name: 'users' })
class UserModule extends VuexModule {

  user: User | null = null

  get accessToken() {
    return getAccessToken()
  }

  get email() {
    return getEmail()
  }

  @Mutation
  setUser(user: User) {
    this.user = user
  }

  @MutationAction
  async login(userSubmit: UserSubmit) {
    const user = await loginUser(userSubmit)
    setAccessToken(user.accessToken)
    setEmail(user.emailAddress)
    return { user }
  }

  @Action({ rawError: true })
  async logout() {
    const user: User = {accessToken: '', emailAddress: '', username: ''}
    this.setUser(user)
    clearCredentials()
  }

}

export default getModule(UserModule)