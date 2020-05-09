<template>
  <section>
    <b-field label="Wyszukaj miasto">
      <b-autocomplete
        :data="cities"
        placeholder="Wroclaw"
        :loading="isFetching"
        field="Name"
        @typing="getCities"
        @select="selectedCity"
        >
      </b-autocomplete>
    </b-field>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import debounce from 'lodash/debounce'
import { Getter, Action } from 'vuex-class'
import { City } from '../store/models'
import { searchCity } from '../store/api'
import { Emit } from 'vue-property-decorator'

@Component
export default class SearchCity extends Vue {

  private cities: City[] = []
  private isFetching: boolean = false
  private getCities!: (cityName: string) => void
  private selected: City | null = null

  created() {
    this.getCities = debounce((cityName) => {
      if (!cityName.length) {
        this.cities = []
        return
      }
      this.isFetching = true
      searchCity(cityName)
      .then(cities => {
        this.cities = []
        cities.forEach(city => this.cities.push(city))
      })
      .finally(() => this.isFetching = false)
    }, 500)
  }

  @Emit()
  selectedCity(city: City) {
    return city
  }

}
</script>

<style lang="sass" scoped></style>
