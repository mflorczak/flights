<template>
  <div class="flights-container">
    <div class="searching-container">
      <SearchCity @selected-city="setOriginCity" searchLabel="Skąd"/>
      <SearchCity @selected-city="setDestinationCity" searchLabel="Dokąd"/>
      <PickDate @dates-range="setStayDate"/>
      <button class="button" style="background: #F8E81D; color: black" :disabled="isBlocedSearching()" @click="searchFlights"> Wyszukaj loty </button>
    </div>
    <PresentAvailableFlights :flights="flights" class="available-flights-container"/>
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
  private isSearching: boolean = false

  public setOriginCity(city: City) {
    this.originCity = city
  }

  public setDestinationCity(city: City) {
    this.destinationCity = city
  }

  public setStayDate(dates: Date[]) {
    this.stayDate = dates;
  }

  public searchFlights() {
    this.isSearching = true
    searchFlights(this.originCity?.id!, this.destinationCity?.id!, this.stayDate[0], this.stayDate[1])
    .then(flights => this.flights = flights)
    .finally(() => this.isSearching = false)
  }

  isBlocedSearching() {
   return !(this.originCity && this.destinationCity && this.stayDate.length && !this.isSearching)
  }
}
</script>

<style lang="sass" scoped>
@mixin for-phone-only
  @media (max-width: 768px)
    @content

@mixin for-pc-only
  @media (min-width: 769px)
    @content

.searching-container
  display: flex
  @include for-phone-only
    flex-flow: column nowrap
    justify-content: space-between
    margin-bottom: 10px
    width: 90%
    height: 35vh
    // align-items: center
  @include for-pc-only
    flex-flow: row wrap
    justify-content: space-around
    align-items: flex-end
    align-self: normal
    margin-bottom: 40px
.field:not(:last-child)
  margin-bottom: 0px !important

.flights-container
  background: #F2F2F3
  display: flex
  flex-flow: column nowrap
  align-items: center
  @include for-pc-only
    height: calc( 100vh -  80px)
    justify-content: center
  @include for-phone-only
    // height: 100vh
    justify-content: space-around
.available-flights-container
  width: 90%
  // height: 90vh
</style>
