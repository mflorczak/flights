<template>
  <nav class="navbar">
    <router-link to="/" style="margin: 5px"> <button class="button" style="background: white; color: black">  Wyszukiwarka lotów </button> </router-link>
    <router-link to="/flights" style="margin: 5px"> <button class="button" style="background: white; color: black">  Zarezerwowane loty  </button> </router-link>
    <b-dropdown aria-role="menu" trap-focus position="is-bottom-left" style="margin: 5px">
      <button class="button" slot="trigger" slot-scope="{ active }">
        <b-icon pack="fas" icon="user" size="is-large"></b-icon>
        <span>{{userEmail}}</span>
        <b-icon pack="fas" :icon="active ? 'caret-up' : 'caret-down'" size="is-large"></b-icon>
      </button>
      <b-dropdown-item aria-role="listitem" @click="openChangePasswordModal()">
        <b-icon pack="fas" icon="key" size="is-medium"></b-icon>
        <span>Zmień hasło</span>
      </b-dropdown-item>
      <b-dropdown-item aria-role="listitem" @click="signout()">
        <b-icon pack="fas" icon="sign-out-alt" size="is-medium"></b-icon>
        <span>Wyloguj</span>
      </b-dropdown-item>
    </b-dropdown>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Getter, Action } from 'vuex-class'
import ChangePassword from '@/views/ChanePassword.vue'

@Component
export default class Navbar extends Vue {

  @Getter('email')
  private userEmail!: string

  @Action('logout')
  private logout!: () => Promise<void>

  signout() {
    this.logout()
      .then(() => this.$router.push('/login'))
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
@mixin for-phone-only
  @media (max-width: 768px)
    @content

@mixin for-pc-only
  @media (min-width: 769px)
    @content

.navbar
  display: flex
  flex-flow: row wrap
  justify-content: space-around
  align-items: center
  background: #0E0B26

  @include for-pc-only
     height: 80px

</style>
