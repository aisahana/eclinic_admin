<template>
  <div v-if="patient">
    <common-info :obj="patient" :fields="[]"/>
  </div>
</template>

<script>
import MixinHttp from '@/Mixins/MixinHttp'
import CommonInfo from '@/Commons/CommonInfo'
import PatientService from '@/Application/Patients/PatientService'

export default {
  name: 'PatientInfo',
  components: {
    'common-info': CommonInfo
  },
  mixins: [
    MixinHttp,
    PatientService
  ],
  props: {
    id: Number
  },
  methods: {
    init () {
      if (this.id) {
        this.httpInit()
        this.retrievePatient(this.id)
      }
    }
  },
  watch: {
    id (n, o) {
      this.init()
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style>

</style>
