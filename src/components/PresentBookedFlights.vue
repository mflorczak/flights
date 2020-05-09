<template>
    <section>
      <b-table :data="flights">
        <template slot-scope="props">

          <b-table-column label="Logo lini">
            <img width="100" :src="`${props.row.airLineImgUrl}`">
          </b-table-column>

          <b-table-column label="Skąd">
              {{ props.row.originCity.Name }}
          </b-table-column>

          <b-table-column label="Dokąd">
              {{ props.row.destinationCity.Name }}
          </b-table-column>

          <b-table-column field="departureDateTime" label="Data wylotu" centered>
              <span class="tag is-success">
                  {{ prettyPrintDate(props.row.departureDateTime) }}
              </span>
          </b-table-column>

          <b-table-column field="arrivalDateTime" label="Data przylotu" centered>
            <span class="tag is-success">
                {{ prettyPrintDate(props.row.arrivalDateTime) }}
            </span>
          </b-table-column>

          <b-table-column field="flightNumber" label="Numer lotu" centered>
            <span class="tag is-info">
                {{ props.row.flightNumber }}
            </span>
          </b-table-column>

          <b-table-column label="Rezerwacja" centered>
            <button class="button is-danger" @click="cancelFlight(props.row)">Anuluj Rezerwację</button>
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
export default class PresenBookedFlights extends Vue {

  @Getter('email')
  private userEmail!: string

  @Getter('getFlights')
  private flights!: Flight[]

  prettyPrintDate(date: Date) {
    return new Date(date).toLocaleString()
  }
  created() {
    console.log(this.userEmail)
    flights.fetchUserFlights(this.userEmail)
  }

  cancelFlight(flight: Flight) {
    console.log(flight)
    this.$buefy.dialog.confirm({
                    title: 'Anulowanie rezerwacji',
                    message: `Czy napewno chcesz <strong>anlulować</strong> rezerwację?`,
                    cancelText: 'Anuluj',
                    confirmText: 'Potwierdź',
                    type: 'is-success',
                    onConfirm: () => this.$buefy.toast.open('Usunięto rezerwację')
    })
  }

}
</script>
