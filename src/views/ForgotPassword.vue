<template>
  <div class="login-container">
    <div class="login-form">
      <div class="logo">
        <img src="../assets/password-login-svgrepo-com.svg">
      </div>
      <form action="" class="form">
        <b-field label="Nazwa użytkownika lub email">
          <b-input class="input-field" v-model="usernameOrEmail" placeholder="Nazwa użytkownika lub email" required></b-input>
        </b-field>

        <div class="button-placement">
          <button class="button reset-button" :disabled="usernameOrEmail.length < 1" @click="resetPassword">Zresetuj</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import { forgotPassword } from '../store/api';

@Component
export default class ForgotPassword extends Vue {
  private usernameOrEmail: string = ''

  resetPassword() {
    forgotPassword(this.usernameOrEmail)
    .then(response => {
      console.log(response)
      this.$router.push('/login')
    })
    .catch(error => console.log(error.response.data.message))
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

.reset-button
  width: 282px
  height: 47px
  margin: 5px

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25)

  background: #21D0C3
  border-radius: 20px

.input-field
  width: 282px
  height: 47px
  margin: 0 auto
  padding: 10px

.button-placement
  display: inline-grid
</style>