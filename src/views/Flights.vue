<template>
<div class="flights">
  <Navbar class="navbar"/>
  <PresentBookedFlights class="bookedFlights"/>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Getter, Action } from 'vuex-class'
import ChangePassword from './ChanePassword.vue'
import Navbar from '../components/Navbar.vue'
import PresentBookedFlights from '../components/PresentBookedFlights.vue'

@Component({
  components: {
    Navbar,
    PresentBookedFlights
  }
})
export default class Flights extends Vue {
}
</script>


<style lang="sass" scoped>
@mixin for-phone-only
  @media (max-width: 768px)
    @content

@mixin for-pc-only
  @media (min-width: 769px)
    @content

.flights
  background: #F2F2F3
  display: flex
  flex-flow: column nowrap
  justify-content: flex-start
  @include for-pc-only
    height: 100vh

.bookedFlights
  align-self: center
  margin-top: auto
  margin-bottom: auto
  // background: red

  // width: 90%
  // height: 50%
</style>