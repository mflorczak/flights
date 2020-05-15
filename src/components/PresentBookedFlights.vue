<template>
    <section>
      <b-table :data="flights" scrollable sticky-header height="80vh">
        <template slot-scope="props">

          <b-table-column label="Logo lini" cell-class="background-table-color">
            <img width="100" :src="`${props.row.airLineImgUrl}`">
          </b-table-column>

          <b-table-column label="Skąd" cell-class="background-table-color">
              {{ props.row.originCity.Name }}
          </b-table-column>

          <b-table-column label="Dokąd" cell-class="background-table-color">
              {{ props.row.destinationCity.Name }}
          </b-table-column>

          <b-table-column field="departureDateTime" label="Data wylotu" centered cell-class="background-table-color">
            <span class="tag" style="background: white">
              {{ prettyPrintDate(props.row.departureDateTime) }}
            </span>
          </b-table-column>

          <b-table-column field="arrivalDateTime" label="Data przylotu" centered cell-class="background-table-color">
            <span class="tag" style="background: white">
              {{ prettyPrintDate(props.row.arrivalDateTime) }}
            </span>
          </b-table-column>

          <b-table-column field="flightNumber" label="Numer lotu" centered cell-class="background-table-color">
            <span class="tag" style="background: #0E0235; color: white">
                {{ props.row.flightNumber }}
            </span>
          </b-table-column>


          <b-table-column label="Rezerwacja" centered cell-class="background-table-color">
            <button class="button cancel-button-color" @click="cancelFlight(props.row)">Anuluj Rezerwację</button>
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
import { bookFlight, bookedUserFlights } from '../store/api'
import flights from '@/store/modules/flights'

@Component
export default class PresentBookedFlights extends Vue {

  @Getter('email')
  private userEmail!: string

  @Getter('bookedFlights')
  private flights!: Flight[]

  prettyPrintDate(date: Date) {
    return new Date(date).toLocaleString()
  }
  created() {
    console.log(this.userEmail)
    flights.fetchUserFlights(this.userEmail)
  }

  cancelFlight(flight: Flight) {
    let id: number = flight.id
    this.$buefy.dialog.confirm({
                  title: 'Anulowanie rezerwacji',
                  message: `Czy napewno chcesz <strong>anlulować</strong> rezerwację?`,
                  cancelText: 'Anuluj',
                  confirmText: 'Potwierdź',
                  type: 'is-warning',
                  onConfirm: () => {
                  flights.cancelFlight({ usernameOrEmail: this.userEmail, flightId: id})
                  }

    })
  }

}
</script>

<style lang="sass">
.background-table-color
  background: #E0E8ED !important
.cancel-button-color
  background: #F8AB1D
  color: white
</style>
