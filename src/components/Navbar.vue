<template>
  <nav class="navbar">
    <b-dropdown aria-role="menu" trap-focus style="margin-right: 6px" position="is-bottom-left">
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
