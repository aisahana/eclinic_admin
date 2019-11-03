<template>
  <common-layout :title="'Pasien'">
    <div class="row mb-4">
      <div class="col-md-12">
        <button
          class="btn btn-primary float-right ml-2"
          @click="onCreatePatient"
        >
          Pasien Baru
        </button>
        <button
          class="btn btn-outline-primary float-right ml-2"
          @click="onReportPatient"
        >
          Export PDF
        </button>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-md-3">
        <!-- patient-filter -->
        <common-card>
          <span slot="title">Pencarian & Filter</span>
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
      size="xl"
      scrollable
    >
      <div class="row mb-2">
        <div class="col-md-6">
          <h5>Pasien</h5>
        </div>
        <div class="col-md-6">
          <button
            @click="onPublishPatient"
            class="btn btn-primary float-right ml-2"
            v-if="patient.is_draft"
          >
            Publikasikan
          </button>
           <button
            @click="onReportMedicalRecordPatient"
            class="btn btn-outline-primary float-right ml-2"
          >
            Cetak Rekam Medis
          </button>
          <button
            @click="onDraftPatient"
            class="btn btn-outline-dark float-right ml-2"
            v-if="!patient.is_draft"
          >
            Simpan ke Draft
          </button>
          <button
            @click="onDestroyPatient"
            class="btn btn-link text-muted float-right"
          >
            Hapus
          </button>
        </div>
      </div>
      <div class="row mb-2">
        <div class="col-md-12">
          <patient-detail
            @onUpdate="onUpdatePatient"
            slot="content"
            :patient="patient"
          />
        </div>
      </div>
      <div class="row mb-2">
        <div class="col-md-12">
          <common-card>
            <span slot="title">Rekam Medis</span>
            <register-medical-record slot="content" :registers="registers" />
          </common-card>
        </div>
        <div class="col-md-12">
          <b-pagination
            class="float-right"
            v-model="queryRegister.page"
            :total-rows="paginationRegister.count"
            @change="onPaginateRegister"
            :per-page="25"
            aria-controls="my-table"
          >
          </b-pagination>
        </div>
      </div>
    </b-modal>
    <!-- ./modal-patient-detail -->
  </common-layout>
</template>

<script>
import _ from 'underscore'

import MixinHttp from '@/Mixins/MixinHttp'
import HelperNotify from '@/Helpers/HelperNotify'
import HelperPDF from '@/Helpers/HelperPDF'
import CommonLayout from '@/Commons/CommonLayout'
import CommonCard from '@/Commons/CommonCard'

import PatientService from '@/Application/Patients/PatientService'
import PatientList from '@/Application/Patients/Components/PatientList'
import PatientDetail from '@/Application/Patients/Components/PatientDetail'
import PatientFilter from '@/Application/Patients/Components/PatientFilter'

import RegisterService from '@/Application/Registers/RegisterService'
import RegisterMedicalRecord from '@/Application/Registers/Components/RegisterMedicalRecord'

export default {
  name: 'PatientMainManager',
  components: {
    'common-layout': CommonLayout,
    'common-card': CommonCard,
    'patient-list': PatientList,
    'patient-detail': PatientDetail,
    'patient-filter': PatientFilter,
    'register-medical-record': RegisterMedicalRecord
  },
  mixins: [
    MixinHttp,
    HelperNotify,
    HelperPDF,
    PatientService,
    RegisterService
  ],
  methods: {
    async init () {
      this.httpInit()
      this.queryPatient.is_draft = false
      await this.listPatient()
    },
    async onSelectPatient (patient) {
      await this.retrievePatient(patient.id)
      this.queryRegister.is_draft = false
      this.queryRegister.patient = this.patient.id
      await this.listRegister()
      await this.$refs['modal-PatientDetail'].show()
    },
    async onCreatePatient () {
      await this.createPatient()
      this.$refs['modal-PatientDetail'].show()
    },
    async onUpdatePatient (patient) {
      this.queryRegister.is_draft = false
      this.queryRegister.patient = patient.id
      await this.listRegister()

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
      await this.listRegister()
      await this.retrievePatient(patient.id)
      // await this.toastUpdate()
    },
    async onPublishPatient () {
      await this.publishPatient(this.patient.id)
      await this.init()
      await this.$refs['modal-PatientDetail'].hide()
    },
    async onDraftPatient (patient) {
      const payload = {
        is_draft: true
      }
      await this.updatePatient(this.patient.id, payload)
      await this.init()
    },
    async onDestroyPatient () {
      await this.destroyPatient(this.patient.id)
      await this.listPatient()
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
    },
    async onPaginateRegister (page) {
      this.queryRegister.page = page
      this.listRegister()
    },
    async onReportPatient () {
      const { data } = await this.reportPatient()
      await this.downloadInvoicePDF(data, 'report-pasien')
    },
    async onReportMedicalRecordPatient () {
      const { data } = await this.reportMedicalRecordPatient(this.patient.id)
      await this.downloadInvoicePDF(data, `report-rekam-medis-${this.patient.name}`)
    }
  },
  async mounted () {
    await this.init()
  }
}
</script>

<style>

</style>
