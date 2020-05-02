<template>
  <div class="login-container">
    <div class="login-form">
      <div class="logo">
        <img src="../assets/password-login-svgrepo-com.svg">
      </div>
      <form action="" class="form">
        <ValidationObserver v-slot="{ invalid }">
          <ValidationProvider rules="required" v-slot="{ errors, valid }">
          <b-field :type="{ 'is-danger': errors[0], 'is-success': valid }" :message="errors">
            <b-input class="input-field" v-model="name" placeholder="Imię" required></b-input>
          </b-field>
          </ValidationProvider>

          <ValidationProvider rules="required" v-slot="{ errors, valid }">
            <b-field :type="{ 'is-danger': errors[0], 'is-success': valid }" :message="errors">
              <b-input class="input-field" v-model="surname" placeholder="Nazwisko" required></b-input>
            </b-field>
          </ValidationProvider>

          <ValidationProvider rules="required|email" v-slot="{ errors, valid }">
            <b-field :type="{ 'is-danger': errors[0], 'is-success': valid }" :message="errors">
              <b-input class="input-field" v-model="email" placeholder="Email" required></b-input>
            </b-field>
          </ValidationProvider>

          <ValidationProvider rules="required" v-slot="{ errors, valid }">
            <b-field :type="{ 'is-danger': errors[0], 'is-success': valid }" :message="errors">
              <b-input class="input-field" v-model="login" placeholder="Login" required></b-input>
            </b-field>
          </ValidationProvider>

          <ValidationProvider rules="required" vid="password" v-slot="{ errors, valid }">
            <b-field :type="{ 'is-danger': errors[0], 'is-success': valid }" :message="errors">
              <b-input class="input-field" type="password" v-model="password" password-reveal placeholder="Twoje hasło" required></b-input>
            </b-field>
          </ValidationProvider>

          <ValidationProvider rules="required|confirmed:password" v-slot="{ errors, valid }">
            <b-field :type="{ 'is-danger': errors[0], 'is-success': valid }" :message="errors">
              <b-input class="input-field" type="password" v-model="theSamePassword" password-reveal placeholder="Powtórz hasło" required> </b-input>
            </b-field>
          </ValidationProvider>

          <div class="button-placement">
            <button class="button registration-button" :disabled="invalid" @click="register">Zarejestruj</button>
            <button class="button login-button" @click="cancel">Anuluj</button>
          </div>

        </ValidationObserver>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { registerUser } from '../store/api'

@Component({
  components: {
    ValidationProvider,
    ValidationObserver
  }
})
export default class Register extends Vue {
  private name: string = ''
  private surname: string = ''
  private email: string = ''
  private login: string = ''
  private password: string = ''
  private theSamePassword: string = ''

  register(){
    registerUser({
      name: this.name,
      surname: this.surname,
      email: this.email,
      password: this.password,
      username: this.login
    }).then(reponse => console.log(reponse))
    .catch(error => console.log(error.response.data.message))
  }

  cancel() {
    this.$router.push('/login')
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