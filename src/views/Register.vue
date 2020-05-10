<template>
  <div class="register-container">
      <div class="logo">
        <img src="../assets/password-login-svgrepo-com.svg">
      </div>
      <form>
        <ValidationObserver v-slot="{ invalid }" class="register-form">
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
              <b-input class="input-field" type="password" v-model="password" placeholder="Twoje hasło" required></b-input>
            </b-field>
          </ValidationProvider>

          <ValidationProvider rules="required|confirmed:password" v-slot="{ errors, valid }">
            <b-field :type="{ 'is-danger': errors[0], 'is-success': valid }" :message="errors">
              <b-input class="input-field" type="password" v-model="theSamePassword" placeholder="Powtórz hasło" required> </b-input>
            </b-field>
          </ValidationProvider>

          <!-- <div class="button-placement"> -->
            <button class="button registration-button" :disabled="invalid" @click="register()">Zarejestruj</button>
            <button type="button" class="button login-button" @click="cancel()">Anuluj</button>
          <!-- </div> -->

        </ValidationObserver>
      </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { registerUser } from '../store/api'
import { showError } from '@/helper/showNotification';

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
    .catch(showError)
  }

  cancel() {
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


.register-container
  display: flex
  flex-flow: row wrap
  justify-content: center
  align-items: center
  width: 100vw
  height: 100vh
  background: linear-gradient(180deg, #52B0F4 0%, rgba(169, 205, 232, 0) 100%)

.register-form
  display: flex
  flex-flow: column nowrap
  justify-content: center


.logo
  // margin: 20px
  @include for-phone-only
    width: 15em
  @include for-pc-only
    width: 25em

.registration-button
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25)
  background: #21D0C3
  border-radius: 20px
  max-width: 400px
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


// .button-placement
//   display: inline-grid
</style>