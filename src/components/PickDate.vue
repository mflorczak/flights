<template>
  <b-field label="Okres pobytu">
    <b-datepicker placeholder="Wybierz date wylotu oraz powrotu" v-model="dates" range @input="datesRange"> </b-datepicker>
  </b-field>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Getter, Action } from 'vuex-class'
import { City } from '../store/models'
import { Emit } from 'vue-property-decorator'

@Component
export default class PickDate extends Vue {
  private dates: Date[] = []

  @Emit()
  public datesRange() {
    return this.dates;
  }
}
</script>

<style lang="sass" scoped></style>
