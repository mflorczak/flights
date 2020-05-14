<template>
  <div>
    <SearchCity @selected-city="setOriginCity"/>
    <SearchCity @selected-city="setDestinationCity"/>
    <PickDate @dates-range="setStayDate"/>
    <button class="button" :disabled="isBlocedSearching()" @click="searchFlights"> Wyszukaj loty </button>
    <PresentAvailableFlights :flights="flights"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import debounce from 'lodash/debounce'
import { Getter, Action } from 'vuex-class'
import { City, Flight } from '../store/models'
import { searchCity, searchFlights } from '../store/api'
import { Emit } from 'vue-property-decorator'
import SearchCity from '../components/SearchCity.vue'
import PickDate from '../components/PickDate.vue'
import PresentAvailableFlights from '../components/PresentAvailableFlights.vue'

@Component({
  components: {
    SearchCity,
    PickDate,
    PresentAvailableFlights
  }
})
export default class SearchFlight extends Vue {

  private originCity: City | null = null
  private destinationCity: City | null = null
  private stayDate: Date[] = []
  private flights: Flight[] = []

  public setOriginCity(city: City) {
    console.log(city)
    this.originCity = city
  }

  public setDestinationCity(city: City) {
    console.log(city)
    this.destinationCity = city
  }

  public setStayDate(dates: Date[]) {
    console.log(dates)
    this.stayDate = dates;
  }

  public searchFlights() {
    searchFlights(this.originCity?.id!, this.destinationCity?.id!, this.stayDate[0], this.stayDate[1])
    .then(flights => this.flights = flights)
  }

  isBlocedSearching() {
   return !this.originCity || !this.destinationCity || !this.stayDate
  }
}
</script>

<style lang="sass" scoped></style>
