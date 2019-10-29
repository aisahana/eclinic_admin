<template>
  <div>
    <div v-for="v in visitors" :key="v.id">
      <small>{{ v.name }} <span class="text-info">{{ v.visitor }} kali kunjungan</span></small>
      <b-progress :value="v.visitor" class="mb-3"></b-progress>
    </div>
  </div>
</template>

<script>
import MixinHttp from '@/Mixins/MixinHttp'
import HelperNotify from '@/Helpers/HelperNotify'

import PatientService from '@/Application/Patients/PatientService'

export default {
  name: 'PatientVisitor',
  mixins: [
    MixinHttp,
    HelperNotify,
    PatientService
  ],
  data () {
    return {
      visitors: []
    }
  },
  methods: {
    async init () {
      this.httpInit()
      const { data } = await this.visitorPatient()
      this.visitors = data
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style>

</style>
