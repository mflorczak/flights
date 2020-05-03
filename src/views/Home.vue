<template>
  <div class="container">
      <b-navbar type="is-info" :mobile-burger="false">
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img
                    src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
                    alt="Lightweight UI components for Vue.js based on Bulma"
                >
            </b-navbar-item>
        </template>
        <template slot="end">
            <b-navbar-item tag="div">
                <b-dropdown aria-role="menu" trap-focus position="is-bottom-left">
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
            </b-navbar-item>
        </template>
    </b-navbar>
    <button @click="test()">Button</button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Getter, Action } from 'vuex-class'
import ChangePassword from './ChanePassword.vue'

@Component
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
      customClass: 'custom-class custom-class-2',
      trapFocus: true
    })
  }

}
</script>
