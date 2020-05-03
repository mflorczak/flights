import store from '@/store'
import { Module, VuexModule, getModule, MutationAction, Action, Mutation } from 'vuex-module-decorators'
import { loginUser, setJWT, clearJWT } from '../api'
import { User, UserSubmit } from '../models'



@Module({ dynamic: true, store, name: 'users' })
class UserModule extends VuexModule {

  user: User | null = null

  get accessToken() {
    return this.user?.accessToken
  }

  get email() {
    return this.user?.emailAddress
  }

  @Mutation
  setUser(user: User) {
    this.user = user
  }

  @MutationAction
  async login(userSubmit: UserSubmit) {
    const user = await loginUser(userSubmit)
    setJWT(user.accessToken)
    return { user }
  }

  @Action({ rawError: true })
  async logout() {
    const user: User = {accessToken: '', emailAddress: '', username: ''}
    this.setUser(user)
    clearJWT()
  }

}

export default getModule(UserModule)