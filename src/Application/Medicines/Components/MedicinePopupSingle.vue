<template>
  <div>
    <div class="row mb-4">
      <div class="col-md-12">
        <button @click="onCreateMedicine" class="btn btn-primary float-right">
          Obat Baru
        </button>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-md-3">
        <common-card>
          <span slot="title">Filter</span>
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
    <!-- modal-medicine-detail -->
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
            Publikasi
          </button>
        </div>
      </div>
      <div class="row mb-2">
        <div class="col-md-12">
          <medicine-detail @onUpdate="onUpdateMedicine" :medicine="medicine" />
        </div>
      </div>
    </b-modal>
    <!-- ./modal-medicine-detail -->
  </div>
</template>

<script>
import _ from 'underscore'

import MixinHttp from '@/Mixins/MixinHttp'
import HelperNotify from '@/Helpers/HelperNotify'
import CommonCard from '@/Commons/CommonCard'

import MedicineService from '@/Application/Medicines/MedicineService'
import MedicineList from '@/Application/Medicines/Components/MedicineList'
import MedicineFilter from '@/Application/Medicines/Components/MedicineFilter'
import MedicineDetail from '@/Application/Medicines/Components/MedicineDetail'

export default {
  name: 'MedicinePopupSingle',
  components: {
    'common-card': CommonCard,
    'medicine-list': MedicineList,
    'medicine-filter': MedicineFilter,
    'medicine-detail': MedicineDetail
  },
  mixins: [
    MixinHttp,
    HelperNotify,
    MedicineService
  ],
  props: {
    query: Object
  },
  methods: {
    async init () {
      this.httpInit()
      this.queryMedicine = _.extend(
        {},
        this.queryMedicine,
        this.query
      )
      await this.listMedicine()
    },
    async onSelectMedicine (medicine) {
      await this.retrieveMedicine(medicine.id)
      this.$emit('onSelect', medicine)
    },
    async onFilterMedicine (query) {
      this.queryMedicine = _.extend(
        {},
        this.queryMedicine,
        query
      )
      await this.init()
    },
    onCreateMedicine () {
      this.createMedicine()
        .then((response) => {
          this.$refs['modal-MedicineDetail'].show()
        })
    },
    async onUpdateMedicine (medicine) {
      const payload = {
        name: medicine.name,
        unit: medicine.unit,
        medicine_type: medicine.medicine_type,
        stock: medicine.stock,
        price: medicine.price
      }
      await this.updateMedicine(medicine.id, payload)
      await this.init()
    },
    async onPublishMedicine () {
      await this.publishMedicine(this.medicine.id)
      await this.init()
      this.$emit('onSelect', this.medicine)
      this.$refs['modal-MedicineDetail'].hide()
    },
    async onPaginateMedicine (page) {
      this.queryMedicine.page = page
      await this.init()
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style>

</style>
