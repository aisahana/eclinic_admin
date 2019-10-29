<template>
  <div v-if="doctor">
    <common-info :obj="doctor" :fields="[
      'doctor_number',
      'poly_name',
      'name',
      'phone',
      'price'
    ]"/>
  </div>
</template>

<script>
import MixinHttp from '@/Mixins/MixinHttp'
import CommonInfo from '@/Commons/CommonInfo'
import DoctorService from '@/Application/Doctors/DoctorService'

export default {
  name: 'DoctorInfo',
  components: {
    'common-info': CommonInfo
  },
  mixins: [
    MixinHttp,
    DoctorService
  ],
  props: {
    id: Number
  },
  methods: {
    init () {
      if (this.id) {
        this.httpInit()
        this.retrieveDoctor(this.id)
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
