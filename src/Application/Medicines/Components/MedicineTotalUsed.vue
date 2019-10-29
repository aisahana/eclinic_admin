<template>
  <div>
    <div v-for="tu in totalUsed" :key="tu.id">
      <small>
        {{ tu.medicine_number }} /
        {{ tu.name }} /
        <span class="text-info">{{ tu.total_used }} {{ tu.unit }}</span>
      </small>
      <b-progress :value="tu.total_used" class="mb-3"></b-progress>
    </div>
  </div>
</template>

<script>
import MixinHttp from '@/Mixins/MixinHttp'
import HelperNotify from '@/Helpers/HelperNotify'

import MedicineService from '@/Application/Medicines/MedicineService'

export default {
  name: 'MedicineTotalUsed',
  mixins: [
    MixinHttp,
    HelperNotify,
    MedicineService
  ],
  data () {
    return {
      totalUsed: []
    }
  },
  methods: {
    async init () {
      const { data } = await this.totalUsedMedicine()
      this.totalUsed = data
    }
  },
  mounted () {
    this.httpInit()
    this.init()
  }
}
</script>

<style>

</style>
