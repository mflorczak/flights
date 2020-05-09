import store from '@/store'
import { Module, VuexModule, getModule, MutationAction, Action, Mutation } from 'vuex-module-decorators'
import { City } from '../models'



@Module({ dynamic: true, store, name: 'users' })
class CityModule extends VuexModule {
  originCity: City | null = null
  destinationCity: City | null = null

  @Mutation
  setOriginCity(city: City) {
    this.originCity = city
  }

  @Mutation
  setDestinationCity(city: City) {
    this.destinationCity = city
  }

  @Action
  searchOriginCity(city: City) {
    this.setOriginCity(city)
  }

  @Action
  searchDestinationCity(city: City) {
    this.setDestinationCity(city)
  }
}