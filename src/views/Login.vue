<template>
  <form action="">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Login</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Email or username">
          <b-input
            v-model="usernameOrEmail"
            placeholder="Your email"
            required
          >
          </b-input>
        </b-field>

        <b-field label="Password">
          <b-input
            type="password"
            v-model="password"
            password-reveal
            placeholder="Your password"
            required
          >
          </b-input>
        </b-field>

      </section>
      <footer class="modal-card-foot">
        <button class="button is-primary" @click="login">Login</button>
      </footer>
    </div>
  </form>
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
}
</script>
