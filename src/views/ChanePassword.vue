<template>
 <div class="login-container">
    <div class="login-form">
      <div class="logo">
        <img src="../assets/password-login-svgrepo-com.svg">
      </div>
      <form action="" class="form">
        <ValidationObserver v-slot="{ invalid }">

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

          <div class="button-placement">
            <button class="button change-password-button" :disabled="invalid" @click="changePassword()">Zmień hasło</button>
            <button type="button" class="button cancel-button is-danger" @click="$parent.close()">Anuluj</button>
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
import { Getter } from 'vuex-class';
import { changePassword } from '@/store/api';
import { Emit } from 'vue-property-decorator';

@Component({
  components: {
    ValidationObserver,
    ValidationProvider
  }
})
export default class ChangePassword extends Vue {

  private password: string = ''
  private theSamePassword: string = ''

  @Getter('email')
  private userEmail!: string

  @Emit('close')
  close() {

  }
  changePassword() {
    changePassword(this.userEmail, this.password)
    .then(respone => {console.log(respone); this.close()})
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
  // width: 100vw
  // height: 100vh
  // background: linear-gradient(180deg, #52B0F4 0%, rgba(169, 205, 232, 0) 100%);

.change-password-button
  width: 282px
  height: 47px
  margin: 5px

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25)

  background: #21D0C3
  border-radius: 20px

.cancel-button
  @extend .change-password-button


.input-field
  width: 282px
  height: 47px
  margin: 0 auto

.button-placement
  display: inline-grid
</style>