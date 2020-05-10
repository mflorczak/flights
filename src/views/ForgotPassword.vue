<template>
  <div class="login-container">
      <div class="logo">
        <img src="../assets/password-login-svgrepo-com.svg">
      </div>
      <form class="login-form">
        <b-input class="input-field" v-model="usernameOrEmail" placeholder="Nazwa użytkownika lub email"></b-input>
        <button class="button reset-button" :disabled="usernameOrEmail.length < 1" @click="resetPassword()">Zresetuj</button>
        <button type="button" class="button cancel-button is-danger" @click="routTologin()">Anuluj</button>
      </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import { forgotPassword } from '../store/api';
import { showError } from '@/helper/showNotification';

@Component
export default class ForgotPassword extends Vue {
  private usernameOrEmail: string = ''

  resetPassword() {
    forgotPassword(this.usernameOrEmail)
    .then(response => {
      console.log(response)
      this.routTologin()
    })
    .catch(showError)
  }

  routTologin() {
    this.$router.push('/login')
  }
}
</script>

<style lang="sass" scoped>
@mixin for-phone-only
  @media (max-width: 1300px)
    @content

@mixin for-pc-only
  @media (min-width: 1301px)
    @content

.login-container
  display: flex
  width: 100vw
  height: 100vh
  flex-flow: row wrap
  align-items: center
  justify-content: center
  background: linear-gradient(180deg, #52B0F4 0%, rgba(169, 205, 232, 0) 100%)

.logo
  @include for-phone-only
    width: 19em

  @include for-pc-only
    width: 40em

.login-form
  display: flex
  flex-flow: column wrap
  align-items: center
  justify-content: space-between
  @include for-phone-only
    height: 100%
    width: 90%
    max-width: 400px
    max-height: 200px

  @include for-pc-only
    height: 15em
    width: 30em


.input-field
  line-height: 0.9em
  font-size: 1.5em
  border-radius: 5px
  width: 90%
  text-align: center

.reset-button
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25)
  background: #21D0C3
  border-radius: 20px
  max-width: 400px
  @include for-phone-only
    width: 90%
    height: 7vh
    max-height: 50px
    // line-height: 2em
    font-size: 1.5em

  @include for-pc-only
    width: 30vw
    height: 50px
    font-size: 23px

.cancel-button
  @extend .reset-button
  background: #A6A3A3

</style>