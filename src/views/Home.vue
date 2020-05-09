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

  @Getter('email')
  private userEmail!: string

  @Action('logout')
  private logout!: () => Promise<void>

  signout() {
    this.logout()
      .then(() => this.$router.push('/login'))
  }

  test() {
    console.log('test')
  }

  openChangePasswordModal() {
    this.$buefy.modal.open({
      parent: this,
      component: ChangePassword,
      hasModalCard: true,
      canCancel: false,
      trapFocus: true
    })
  }

}
</script>

<style lang="sass" scoped>
  .navbar
    height: 50px
    display: flex
    flex-flow: row nowrap
    justify-content: flex-end
    align-items: center
    background: red
</style>
