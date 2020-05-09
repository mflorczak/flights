<template>
<div>
  <Navbar/>
  <SearchFlight/>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Getter, Action } from 'vuex-class'
import ChangePassword from './ChanePassword.vue'
import Navbar from '../components/Navbar.vue'
import SearchFlight from '../components/SearchFlight.vue'

@Component({
  components: {
    Navbar,
    SearchFlight
  }
})
export default class Home extends Vue {

}
</script>
