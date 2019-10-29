<template>
  <div v-if="recipe">
    <common-info :obj="recipe" :fields="[
      'sub_total',
      {key: 'doctor_fee', label: 'Biaya Dokter'},
      {key: 'total', label: 'Total Biaya'}
    ]"/>
  </div>
</template>

<script>
import CommonInfo from '@/Commons/CommonInfo'

export default {
  name: 'RecipeSubTotal',
  components: {
    'common-info': CommonInfo
  },
  props: {
    recipe: Object
  }
}
</script>

<style>

</style>
