<template>
    <section>

        <b-table :data="flights" scrollable sticky-header height="70vh">
          <template slot-scope="props">

            <b-table-column label="Logo lini" cell-class="background-table-color">
              <img width="100" :src="`${props.row.carrier.ImageUrl}`">
            </b-table-column>

            <b-table-column label="Skąd" cell-class="background-table-color">
                {{ props.row.originStation.city.Name }}
            </b-table-column>

            <b-table-column label="Dokąd" cell-class="background-table-color">
                {{ props.row.destinationStation.city.Name }}
            </b-table-column>

            <b-table-column field="departureDateTime" label="Data wylotu" cell-class="background-table-color" centered>
                <span class="tag" style="background: white; color: black">
                    {{ prettyPrintDate(props.row.departureDateTime) }}
                </span>
            </b-table-column>

             <b-table-column field="arrivalDateTime" label="Data przylotu" cell-class="background-table-color" centered>
                <span class="tag" style="background: white; color: black">
                    {{ prettyPrintDate(props.row.arrivalDateTime) }}
                </span>
            </b-table-column>


            <b-table-column label="Rezerwacja" cell-class="background-table-color" centered>
              <button class="button book-button-color" @click="bookFlight(props.row)" :disabled="isBooking">Zarezerwuj</button>
            </b-table-column>

          </template>

          <template slot="empty">
            <section class="section">
              <div class="content has-text-grey has-text-centered">
               <vue-fontawesome icon="frown" size="3x" />
               <p>Brak dostępnych lotów</p>
              </div>
            </section>
          </template>
        </b-table>
    </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Flight } from '../store/models'
import { Getter } from 'vuex-class'
import { bookFlight } from '../store/api'
import { showError } from '@/helper/showNotification'

@Component
export default class PresentAvailableFlights extends Vue {

  @Prop()
  private flights!: Flight[]
  private isBooking: boolean = false

  @Getter('email')
  private userEmail!: string

  prettyPrintDate(date: Date) {
    return new Date(date).toLocaleString()
  }

  bookFlight(flight: any) {
    this.isBooking = true
    bookFlight(this.userEmail, flight)
    .then(console.log)
    .catch(showError)
    .finally(() => this.isBooking = false)
  }
}
</script>

<style lang="sass" scoped>
.background-table-color
  background: #E0E8ED !important
.book-button-color
  background: #0E0B26
  color: white
</style>