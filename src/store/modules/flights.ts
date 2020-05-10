import store from '@/store'
import { Module, VuexModule, getModule, MutationAction, Action, Mutation } from 'vuex-module-decorators'
import { bookedUserFlights, cancelBookedFlight, } from '../api'
import { Flight } from '../models'



@Module({ dynamic: true, store, name: 'flights' })
class FlightModule extends VuexModule {

  flights: Flight[] = []

  get getFlights() {
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
  async cancelFlight(usernameOrEmail:string, flightId: number) {
    await cancelBookedFlight(usernameOrEmail, flightId)
    let index = this.flights.findIndex(flight => flight.id === flightId)
    delete this.flights[index]
    let flights  = this.flights
    return { flights }
  }

  @MutationAction
  async fetchUserFlights(usernameOrEmail: string) {
    const flights = await bookedUserFlights(usernameOrEmail)
    console.log(flights)
    return { flights }
  }

}

export default getModule(FlightModule)