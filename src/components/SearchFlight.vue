<template>
  <div>
    <SearchCity @selected-city="setOriginCity"/>
    <SearchCity @selected-city="setDestinationCity"/>
    <PickDate @dates-range="setStayDate"/>
    <button class="button" :disabled="!originCity || !destinationCity || !stayDate" @click="searchFlights"> Wyszukaj loty </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import debounce from 'lodash/debounce'
import { Getter, Action } from 'vuex-class'
import { City } from '../store/models'
import { searchCity, searchFlights } from '../store/api'
import { Emit } from 'vue-property-decorator'
import SearchCity from '../components/SearchCity.vue'
import PickDate from '../components/PickDate.vue'

@Component({
  components: {
    SearchCity,
    PickDate
  }
})
export default class SearchFlight extends Vue {

  private originCity: City | null = null
  private destinationCity: City | null = null
  private stayDate: Date[] = []

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

  public async searchFlights() {
    let cityName = this.originCity
    let flight = await searchFlights(this.originCity?.id!, this.destinationCity?.id!, this.stayDate[0], this.stayDate[1])
    console.log(flight)
  }
}
</script>

<style lang="sass" scoped></style>
