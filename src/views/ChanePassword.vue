<template>
 <!-- <div class="login-container">
    <form>
      <section>
      <ValidationObserver v-slot="{ invalid }" class="login-form">

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

        <button class="button change-password-button" :disabled="invalid" @click="changePassword()">Zmień hasło</button>
        <button type="button" class="button cancel-button is-danger" @click="$parent.close()">Anuluj</button>

      </ValidationObserver>
      </section>
    </form>
  </div> -->
<form action="">
    <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
            <p class="modal-card-title">Zmiana hasła</p>
        </header>
          <ValidationObserver v-slot="{ invalid }" class="login-form">
        <section class="modal-card-body">


      <ValidationProvider rules="required" vid="password" v-slot="{ errors, valid }">
        <b-field :type="{ 'is-danger': errors[0], 'is-success': valid }" :message="errors" label="Hasło">
          <b-input class="input-field" type="password" v-model="password" placeholder="Twoje hasło" required></b-input>
        </b-field>
      </ValidationProvider>

      <ValidationProvider rules="required|confirmed:password" v-slot="{ errors, valid }">
        <b-field :type="{ 'is-danger': errors[0], 'is-success': valid }" :message="errors" label="Powtórzone hasło">
          <b-input class="input-field" type="password" v-model="theSamePassword" placeholder="Powtórz hasło" required> </b-input>
        </b-field>
      </ValidationProvider>

        </section>
        <footer class="modal-card-foot button-foot">
          <button class="button change-password-button" :disabled="invalid" @click="changePassword()">Zmień hasło</button>
          <button type="button" class="button cancel-button" @click="$parent.close()">Anuluj</button>
        </footer>
        </ValidationObserver>
    </div>
</form>
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
    .catch(error => {console.log(error.response.data.message); this.close()})
  }
}
</script>

<style lang="sass" scoped>

.button-foot
  display: flex
  flex-flow: row wrap
  justify-content: space-between
  align-items: center

.change-password-button
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25)
  background: #21D0C3
  border-radius: 20px
  width: 100px

.cancel-button
  @extend .change-password-button
  background: #e63946
</style>