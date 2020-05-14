import store from '@/store'
import { Module, VuexModule, getModule, MutationAction, Action, Mutation } from 'vuex-module-decorators'
import { bookedUserFlights, cancelBookedFlight, } from '../api'
import { Flight } from '../models'



@Module({ dynamic: true, store, name: 'flights' })
class FlightModule extends VuexModule {

  flights: Flight[] = []

  get bookedFlights() {
    return this.flights
  }


  @Mutation
  setFlight(flight: Flight) {
    this.flights.push(flight)
  }

  @Action
  addFlight(flight: Flight) {
    this.setFlight(flight)
  }

  @MutationAction
  async cancelFlight(flightInfo: {usernameOrEmail: string, flightId: number}) {
    await cancelBookedFlight(flightInfo.usernameOrEmail, flightInfo.flightId)
    const flights = await bookedUserFlights(flightInfo.usernameOrEmail)
    return { flights }
  }

  @MutationAction
  async fetchUserFlights(usernameOrEmail: string) {
    const flights = await bookedUserFlights(usernameOrEmail)
    return { flights }
  }

}

export default getModule(FlightModule)