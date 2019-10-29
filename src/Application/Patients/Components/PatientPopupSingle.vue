<template>
  <div>
    <div class="row mb-4">
      <div class="col-md-12">
        <button
          class="btn btn-primary float-right"
          @click="onCreatePatient"
        >
          Pasien Baru
        </button>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-md-3">
        <!-- patient-filter -->
        <common-card>
          <span slot="title">Filter</span>
          <patient-filter slot="content" @onFilter="onFilterPatient" />
        </common-card>
        <!-- ./patient-filter -->
      </div>
      <div class="col-md-9">
        <common-card>
          <span slot="title">Daftar Pasien</span>
          <patient-list
            slot="content"
            :patients="patients"
            @onSelect="onSelectPatient"
          />
        </common-card>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-md-12">
        <b-pagination
          class="float-right"
          v-model="queryPatient.page"
          :total-rows="paginationPatient.count"
          @change="onPaginatePatient"
          :per-page="25"
          aria-controls="my-table"
        >
        </b-pagination>
      </div>
    </div>
    <!-- modal-patient-detail -->
    <b-modal
      id="modal-PatientDetail"
      v-if="patient"
      ref="modal-PatientDetail"
      hide-footer
      hide-header
      size="lg"
    >
      <div class="row mb-4">
        <div class="col-md-12">
          <button
            @click="onPublishPatient"
            class="btn btn-primary float-right ml-2"
            v-if="patient.is_draft"
          >
            Publikasi
          </button>
        </div>
      </div>
      <div class="row mb-4">
        <div class="col-md-12">
          <common-card>
            <span slot="title">Pasien</span>
            <patient-detail
              @onUpdate="onUpdatePatient"
              slot="content"
              :patient="patient"
            />
          </common-card>
        </div>
      </div>
    </b-modal>
    <!-- ./modal-patient-detail -->
  </div>
</template>

<script>
import _ from 'underscore'

import MixinHttp from '@/Mixins/MixinHttp'
import HelperNotify from '@/Helpers/HelperNotify'
import CommonCard from '@/Commons/CommonCard'

import PatientService from '@/Application/Patients/PatientService'
import PatientList from '@/Application/Patients/Components/PatientList'
import PatientDetail from '@/Application/Patients/Components/PatientDetail'
import PatientFilter from '@/Application/Patients/Components/PatientFilter'

export default {
  name: 'PatientMainManager',
  components: {
    'common-card': CommonCard,
    'patient-list': PatientList,
    'patient-detail': PatientDetail,
    'patient-filter': PatientFilter
  },
  mixins: [
    MixinHttp,
    HelperNotify,
    PatientService
  ],
  props: {
    query: Object
  },
  methods: {
    async init () {
      this.httpInit()
      this.queryPatient = _.extend(
        {},
        this.queryPatient,
        this.query
      )
      await this.listPatient()
    },
    async onSelectPatient (patient) {
      await this.retrievePatient(patient.id)
      this.$emit('onSelect', this.patient)
    },
    async onCreatePatient () {
      await this.createPatient()
      this.$refs['modal-PatientDetail'].show()
    },
    async onUpdatePatient (patient) {
      const payload = {
        name: patient.name,
        address: patient.address,
        gender: patient.gender,
        place_birth: patient.place_birth,
        date_birth: patient.date_birth,
        age: patient.age,
        phone: patient.phone,
        blood: patient.blood,
        occupation: patient.occupation,
        religion: patient.religion,
        marital: patient.marital
      }
      await this.updatePatient(patient.id, payload)
      await this.init()
    },
    async onPublishPatient () {
      await this.publishPatient(this.patient.id)
      this.$refs['modal-PatientDetail'].hide()
      this.$emit('onSelect', this.patient)
      await this.init()
    },
    onFilterPatient (query) {
      this.queryPatient = _.extend(
        {},
        this.queryPatient,
        query
      )
      this.listPatient()
    },
    onPaginatePatient (page) {
      this.queryPatient.page = page
      this.listPatient()
    }
  },
  async mounted () {
    await this.init()
  }
}
</script>

<style>

</style>
