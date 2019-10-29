<template>
  <div v-if="medicine">
    <common-info :obj="medicine" :fields="[]"/>
  </div>
</template>

<script>
import MixinHttp from '@/Mixins/MixinHttp'
import CommonInfo from '@/Commons/CommonInfo'
import MedicineService from '@/Application/Medicines/MedicineService'

export default {
  name: 'MedicineInfo',
  components: {
    'common-info': CommonInfo
  },
  mixins: [
    MixinHttp,
    MedicineService
  ],
  props: {
    id: Number
  },
  methods: {
    init () {
      if (this.id) {
        this.httpInit()
        this.retrieveMedicine(this.id)
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
