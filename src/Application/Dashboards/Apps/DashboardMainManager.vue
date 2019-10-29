<template>
  <common-layout :title="'Dashboard'">
    <div class="row mb-2">
      <div v-if="totalSale" class="col-md-6">
        <div class="jumbotron bg-primary">
          <small class="lead text-light">Total Pembayaran</small>
          <h2 class="display-5 text-white">Rp. {{ totalSale.amount__sum }}</h2>
        </div>
      </div>
      <div v-if="totalOpen" class="col-md-3">
        <div class="jumbotron bg-primary">
          <small class="lead text-light">Total Registrasi Saat Ini</small>
          <h2 class="display-5 text-white">{{ totalOpen.id__count }} Pasien</h2>
        </div>
      </div>
      <div v-if="myTotalNewPatient" class="col-md-3">
        <div class="jumbotron bg-primary">
          <small class="lead text-light">Pasien Baru</small>
          <h2 class="display-5 text-white">{{ myTotalNewPatient.id__count }} Pasien</h2>
        </div>
      </div>
    </div>
    <div class="row mb-2">
      <div class="col-md-6">
        <common-card>
          <span slot="title">Kunjungan Pasien</span>
          <patient-visitor slot="content" />
        </common-card>
      </div>
      <div class="col-md-6">
        <common-card>
          <span slot="title">Obat yang sering digunakan</span>
          <medicine-total-used slot="content" />
        </common-card>
      </div>
    </div>
  </common-layout>
</template>

<script>
import MixinHttp from '@/Mixins/MixinHttp'
import HelperNotify from '@/Helpers/HelperNotify'
import CommonLayout from '@/Commons/CommonLayout'
import CommonCard from '@/Commons/CommonCard'

import PaymentService from '@/Application/Payments/PaymentService'
import RegisterService from '@/Application/Registers/RegisterService'
import PatientService from '@/Application/Patients/PatientService'

import PatientVisitor from '@/Application/Patients/Components/PatientVisitor'

import MedicineTotalUsed from '@/Application/Medicines/Components/MedicineTotalUsed'

export default {
  name: 'DashboardMainManager',
  components: {
    'common-layout': CommonLayout,
    'common-card': CommonCard,
    'patient-visitor': PatientVisitor,
    'medicine-total-used': MedicineTotalUsed
  },
  mixins: [
    MixinHttp,
    HelperNotify,
    PaymentService,
    RegisterService,
    PatientService
  ],
  data () {
    return {
      totalSale: undefined,
      totalOpen: undefined,
      myTotalNewPatient: undefined
    }
  },
  methods: {
    async init () {
      const dataTotalSale = await this.totalSalePayment()
      this.totalSale = dataTotalSale.data
      const dataTotalOpen = await this.totalOpenRegister()
      this.totalOpen = dataTotalOpen.data
      const dataMyTotalNewPatient = await this.totalNewPatient()
      this.myTotalNewPatient = dataMyTotalNewPatient.data
    }
  },
  async mounted () {
    this.httpInit()
    await this.init()
  }
}
</script>

<style>

</style>
