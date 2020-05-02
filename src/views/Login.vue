<template>
  <div class="login-container">
    <div class="login-form">
      <div class="logo">
        <img src="../assets/password-login-svgrepo-com.svg">
      </div>
      <form action="" class="form">
        <b-input class="input-field"
          v-model="usernameOrEmail"
          placeholder="Twój login lub email"
          required
        >
        </b-input>

        <b-input class="input-field"
          type="password"
          v-model="password"
          password-reveal
          placeholder="Twoje hasło"
          required
        >
        </b-input>
      <div class="button-placement">
        <button class="button login-button" :disabled="password.length < 1 || usernameOrEmail.length < 1" @click="login">Zaloguj</button>
        <button class="button registration-button" @click="register">Rejestracja</button>
      </div>
      </form>
    </div>
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
}
</script>


<style lang="sass" scoped>
.login-form
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
.logo
  height: 300px
  width: 300px
  display: inline-block
  margin: 0 auto
  padding: 3px
  .form
    display: flex
    flex-direction: column
    justify-content: column

.login-container
  position: absolute
  width: 100vw
  height: 100vh
  background: linear-gradient(180deg, #52B0F4 0%, rgba(169, 205, 232, 0) 100%);

.registration-button
  width: 282px
  height: 47px
  margin: 5px

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25)

  background: #21D0C3
  border-radius: 20px

.login-button
  @extend .registration-button
  background: #A6A3A3

.input-field
  width: 282px
  height: 47px
  margin: 0 auto
  padding: 10px

.button-placement
  display: inline-grid
</style>