<template>
<div>
  <Navbar/>
  <PresentBookedFlights/>
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
