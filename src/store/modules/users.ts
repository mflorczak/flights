import store from '@/store'
import { Module, VuexModule, getModule, MutationAction } from 'vuex-module-decorators'
import { loginUser, setJWT } from '../api'
import { User, UserSubmit } from '../models'



@Module({ dynamic: true, store, name: 'users' })
class UserModule extends VuexModule {

  user: User | null = null

  get accessToken() {
    return this.user?.accessToken
  }

  @MutationAction
  async login(userSubmit: UserSubmit) {
    const user = await loginUser(userSubmit)
    console.log(JSON.stringify(user))
    setJWT(user.accessToken)
    return { user }
  }

}

export default getModule(UserModule)