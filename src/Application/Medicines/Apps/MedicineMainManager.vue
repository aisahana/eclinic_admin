<template>
  <common-layout :title="'Obat'">
    <div class="row mb-4">
      <div class="col-md-12">
        <button @click="onCreateMedicine" class="btn btn-primary float-right ml-2">
          Obat Baru
        </button>
        <button @click="onReportMedicine" class="btn btn-outline-primary float-right ml-2">
          Export PDF
        </button>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-md-3">
        <common-card>
          <span slot="title">Pencarian & Filter</span>
          <medicine-filter slot="content" @onFilter="onFilterMedicine" />
        </common-card>
      </div>
      <div class="col-md-9">
        <common-card>
          <span slot="title">Daftar Obat</span>
          <medicine-list slot="content" :medicines="medicines" @onSelect="onSelectMedicine" />
        </common-card>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-md-12">
        <b-pagination
          class="float-right"
          v-model="queryMedicine.page"
          :total-rows="paginationMedicine.count"
          @change="onPaginateMedicine"
          :per-page="25"
          aria-controls="my-table"
        >
        </b-pagination>
      </div>
    </div>
    <!-- ===================== -->
    <!-- modal-medicine-detail -->
    <!-- ===================== -->
    <b-modal
      id="modal-MedicineDetail"
      v-if="medicine"
      ref="modal-MedicineDetail"
      hide-footer
      hide-header
      size="lg"
    >
      <div class="row mb-2">
        <div class="col-md-6">
          <h5>Obat</h5>
        </div>
        <div class="col-md-6">
          <button
            v-if="medicine.is_draft"
            class="btn btn-primary float-right ml-2"
            @click="onPublishMedicine"
          >
            Publikasikan
          </button>
          <button
            v-if="!medicine.is_draft"
            class="btn btn-outline-dark float-right ml-2"
            @click="onDraftMedicine"
          >
            Simpan Ke Draft
          </button>
          <button
            class="btn btn-link text-muted float-right"
            @click="onDestroyMedicine"
          >
            Hapus
          </button>
        </div>
      </div>
      <div class="row mb-2">
        <div class="col-md-12">
          <medicine-detail @onUpdate="onUpdateMedicine" :medicine="medicine" />
        </div>
      </div>
    </b-modal>
    <!-- ======================= -->
    <!-- ./modal-medicine-detail -->
    <!-- ======================= -->
  </common-layout>
</template>

<script>
import _ from 'underscore'

import MixinHttp from '@/Mixins/MixinHttp'
import HelperNotify from '@/Helpers/HelperNotify'
import HelperPDF from '@/Helpers/HelperPDF'
import CommonLayout from '@/Commons/CommonLayout'
import CommonCard from '@/Commons/CommonCard'

import MedicineService from '@/Application/Medicines/MedicineService'
import MedicineList from '@/Application/Medicines/Components/MedicineList'
import MedicineFilter from '@/Application/Medicines/Components/MedicineFilter'
import MedicineDetail from '@/Application/Medicines/Components/MedicineDetail'

export default {
  name: 'MedicineMainManager',
  components: {
    'common-layout': CommonLayout,
    'common-card': CommonCard,
    'medicine-list': MedicineList,
    'medicine-filter': MedicineFilter,
    'medicine-detail': MedicineDetail
  },
  mixins: [
    MixinHttp,
    HelperNotify,
    HelperPDF,
    MedicineService
  ],
  methods: {
    init () {
      this.httpInit()
      this.queryMedicine.is_draft = false
      this.listMedicine()
    },
    onSelectMedicine (medicine) {
      this.retrieveMedicine(medicine.id)
        .then((response) => {
          this.$refs['modal-MedicineDetail'].show()
        })
    },
    async onFilterMedicine (query) {
      this.queryMedicine = _.extend(
        {},
        this.queryMedicine,
        query
      )
      await this.listMedicine()
    },
    onCreateMedicine () {
      this.createMedicine()
        .then((response) => {
          this.$refs['modal-MedicineDetail'].show()
        })
    },
    onUpdateMedicine (medicine) {
      const payload = {
        name: medicine.name,
        unit: medicine.unit,
        medicine_type: medicine.medicine_type,
        stock: medicine.stock,
        price: medicine.price
      }
      this.updateMedicine(medicine.id, payload)
        .then((response) => {
          this.init()
        })
    },
    onPublishMedicine () {
      this.publishMedicine(this.medicine.id)
        .then((response) => {
          this.init()
          this.$refs['modal-MedicineDetail'].hide()
        })
    },
    async onDraftMedicine () {
      const payload = {
        is_draft: true
      }
      await this.updateMedicine(this.medicine.id, payload)
      await this.init()
    },
    onDestroyMedicine () {
      this.confirmDestroy(`Obat ${this.medicine.medicine_number}`)
        .then(value => {
          if (value) {
            this.destroyMedicine(this.medicine.id)
              .then((response) => {
                this.init()
                this.$refs['modal-MedicineDetail'].hide()
              })
          }
        })
    },
    async onPaginateMedicine (page) {
      this.queryMedicine.page = page
      await this.init()
    },
    async onReportMedicine () {
      const { data } = await this.reportMedicine()
      this.downloadInvoicePDF(data, 'medicine-report')
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style>

</style>
