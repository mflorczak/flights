<template>
  <div class="login-container">
      <div class="logo">
        <img src="../assets/password-login-svgrepo-com.svg">
      </div>
      <form class="login-form">
        <input class="input-field" v-model="usernameOrEmail" placeholder="Twój login lub email" required>
        <input class="input-field" type="password" v-model="password" placeholder="Twoje hasło" required>

        <button class="button login-button" :disabled="!password || !usernameOrEmail" @click="login">Zaloguj</button>
        <button type="button" class="registration-button" @click="register()">Rejestracja</button>
        <button type="button" class="button forgot-password-button" @click="redirectToPasswordResetView()">Reset hasła</button>

      </form>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import { Action } from 'vuex-class'
import users from '@/store/modules/users'
import { UserSubmit } from '../store/models';


@Component
export default class Login extends Vue {
  private usernameOrEmail: string = ''
  private password: string = ''

  login() {
    const user: UserSubmit = {
      usernameOrEmail: this.usernameOrEmail,
      password: this.password
    }

    users.login(user)
      .then(() => this.$router.push('/'))
      .catch(error => console.log(error.response.data.message))
  }

  register() {
    this.$router.push('/register')
  }

  redirectToPasswordResetView() {
    this.$router.push('/forgot-password')
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
    // size: 500px

.login-form
  display: flex
  flex-flow: column wrap
  align-items: center
  justify-content: space-between
  @include for-phone-only
    height: 35vh

  @include for-pc-only
    height: 20em
    width: 30em


.input-field
  line-height: 0.9em
  font-size: 1.5em
  border-radius: 5px
  width: 90%
  text-align: center

.registration-button
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25)
  background: #21D0C3
  border-radius: 20px
  @include for-phone-only
    width: 10em
    height: 7vh
    // line-height: 2em
    font-size: 1.5em

  @include for-pc-only
    width: 30vw
    height: 50px
    font-size: 23px

.login-button
  @extend .registration-button
  background: #A6A3A3

.forgot-password-button
  @extend .registration-button
  background: #AD89C9
</style>