<template>
  <common-layout v-if="register" :title="'Registrasi'">
    <div class="row mb-4">
      <div class="col-md-6">
        <span
          v-if="register.is_draft"
          class="badge badge-warning"
        >
          Draft
        </span>
      </div>
      <div class="col-md-6">
        <button
          v-if="register.is_draft"
          class="btn btn-primary float-right ml-2"
          @click="onPublishRegister"
        >
          Publikasi
        </button>
        <button
          class="btn btn-link text-muted float-right"
          @click="onDestroyRegister"
        >
          Hapus
        </button>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-md-8">
        <common-card class="mb-4">
          <span slot="title">Pendaftaran</span>
          <register-detail
            :register="register"
            @onUpdate="onUpdateRegister"
            slot="content"
          />
        </common-card>
        <common-card class="mb-4">
          <span slot="title">
            Pasien
            <a href="javascript:void(0)" @click="onModalPatientPopupSingle">
              <i class="fa fa-search"></i>
            </a>
          </span>
          <patient-info v-if="register.patient" slot="content" :id="register.patient" />
          <p slot="content" v-if="!register.patient">Belum memilih pasien</p>
        </common-card>
      </div>
      <div class="col-md-4">
        <common-card class="mb-4">
          <span slot="title">
            Poli &nbsp;
            <a href="javascript:void(0)" @click="onModalPolyPopupSingle">
              <i class="fa fa-search"></i>
            </a>
          </span>
          <poly-info v-if="register.poly" slot="content" :id="register.poly" />
          <p slot="content" v-if="!register.poly">
            Belum memilih poli
          </p>
        </common-card>
        <common-card class="mb-4">
          <span slot="title">
            Dokter
            <a href="javascript:void(0)" @click="onModalDoctorPopupSingle">
              <i class="fa fa-search"></i>
            </a>
          </span>
          <doctor-info v-if="register.doctor" slot="content" :id="register.doctor" />
          <p slot="content" v-if="!register.doctor">Belum memilih dokter</p>
        </common-card>
      </div>
    </div>
    <!-- modal-poly-popup-single -->
    <b-modal
      id="modal-PolyPopupSingle"
      ref="modal-PolyPopupSingle"
      hide-footer
      hide-header
      size="xl"
    >
      <div class="row mb-2">
        <div class="col-md-12">
          <poly-popup-single :query="queryPoly" @onSelect="onSelectPoly" />
        </div>
      </div>
    </b-modal>
    <!-- ./modal-poly-popup-single -->
    <!-- modal-doctor-popup-single -->
    <b-modal
      id="modal-DoctorPopupSingle"
      ref="modal-DoctorPopupSingle"
      hide-footer
      hide-header
      size="xl"
    >
      <div class="row mb-2">
        <div class="col-md-12">
          <doctor-popup-single :query="queryDoctor" @onSelect="onSelectDoctor" />
        </div>
      </div>
    </b-modal>
    <!-- ./modal-doctor-popup-single -->
    <!-- modal-patient-popup-single -->
    <b-modal
      id="modal-PatientPopupSingle"
      ref="modal-PatientPopupSingle"
      hide-footer
      hide-header
      size="xl"
    >
      <div class="row mb-2">
        <div class="col-md-12">
          <patient-popup-single :query="queryPatient" @onSelect="onSelectPatient" />
        </div>
      </div>
    </b-modal>
    <!-- ./modal-patient-popup-single -->
  </common-layout>
</template>

<script>
import MixinHttp from '@/Mixins/MixinHttp'
import HelperNotify from '@/Helpers/HelperNotify'
import CommonLayout from '@/Commons/CommonLayout'
import CommonCard from '@/Commons/CommonCard'

import RegisterService from '@/Application/Registers/RegisterService'
import RegisterDetail from '@/Application/Registers/Components/RegisterDetail'

import PolyService from '@/Application/Polys/PolyService'
import PolyInfo from '@/Application/Polys/Components/PolyInfo'
import PolyPopupSingle from '@/Application/Polys/Components/PolyPopupSingle'

import DoctorService from '@/Application/Doctors/DoctorService'
import DoctorInfo from '@/Application/Doctors/Components/DoctorInfo'
import DoctorPopupSingle from '@/Application/Doctors/Components/DoctorPopupSingle'

import PatientService from '@/Application/Patients/PatientService'
import PatientInfo from '@/Application/Patients/Components/PatientInfo'
import PatientPopupSingle from '@/Application/Patients/Components/PatientPopupSingle'

import RecipeService from '@/Application/Recipes/RecipeService'

import PaymentService from '@/Application/Payments/PaymentService'

export default {
  name: 'RegisterComposeManager',
  components: {
    'common-layout': CommonLayout,
    'common-card': CommonCard,
    'register-detail': RegisterDetail,
    'poly-popup-single': PolyPopupSingle,
    'poly-info': PolyInfo,
    'doctor-info': DoctorInfo,
    'doctor-popup-single': DoctorPopupSingle,
    'patient-info': PatientInfo,
    'patient-popup-single': PatientPopupSingle
  },
  mixins: [
    MixinHttp,
    HelperNotify,
    RegisterService,
    PolyService,
    DoctorService,
    PatientService,
    RecipeService,
    PaymentService
  ],
  methods: {
    async init () {
      const id = this.$route.params.id
      this.httpInit()
      await this.retrieveRegister(id)
    },
    async onUpdateRegister (register) {
      const payload = {
        complain: register.complain
      }
      await this.updateRegister(register.id, payload)
    },
    onModalPolyPopupSingle () {
      if (!this.register.is_draft) {
        this.toastWarning(`
          Anda tida diizinkan untuk mengubah data setelah
          registrasi telah diproses.
        `)
        return
      }

      this.queryPoly.is_draft = false
      this.$refs['modal-PolyPopupSingle'].show()
    },
    async onSelectPoly (poly) {
      await this.retrievePoly(poly.id)

      if (poly.is_draft) {
        this.toastWarning('Poli tidak bisa dipilih karena masih dalam bentuk draft!')
        return
      }

      const payload = {
        poly: poly.id,
        doctor: null
      }
      await this.updateRegister(this.register.id, payload)
      this.$refs['modal-PolyPopupSingle'].hide()
      this.init()
    },
    onModalDoctorPopupSingle () {
      if (!this.register.is_draft) {
        this.toastWarning(`
          Anda tida diizinkan untuk mengubah data setelah
          registrasi telah diproses.
        `)
        return
      }
      if (!this.register.poly) {
        this.toastWarning('Anda belum memilih poli.')
        return
      }
      this.queryDoctor.is_draft = false
      this.queryDoctor.poly = this.register.poly
      this.$refs['modal-DoctorPopupSingle'].show()
    },
    async onSelectDoctor (doctor) {
      if (doctor.is_draft) {
        this.toastWarning('Dokter tidak bisa dipilih karena masih dalam bentuk draft!')
        return
      }
      if (!this.register.is_draft) {
        this.toastWarning(`
          Anda tida diizinkan untuk mengubah data setelah
          registrasi telah diproses.
        `)
        return
      }

      const payload = {
        doctor: doctor.id
      }

      await this.updateRegister(this.register.id, payload)
      await this.init()
      await this.$refs['modal-DoctorPopupSingle'].hide()
    },
    onModalPatientPopupSingle () {
      if (!this.register.is_draft) {
        this.toastWarning(`
          Anda tida diizinkan untuk mengubah data setelah
          registrasi telah diproses.
        `)
        return
      }
      this.queryPatient.is_draft = false
      this.$refs['modal-PatientPopupSingle'].show()
    },
    async onSelectPatient (patient) {
      if (patient.is_draft) {
        this.toastWarning('Pasien tidak bisa dipilih karena masih dalam bentuk draft!')
        return
      }

      await this.checkPatientRegister(patient.id)
      const payload = {
        patient: patient.id
      }

      await this.updateRegister(this.register.id, payload)
      this.$refs['modal-PatientPopupSingle'].hide()
      this.init()
    },
    async onPublishRegister () {
      await this.publishRegister(this.register.id)

      if (this.register.recipe) {
        await this.publishRecipe(this.register.recipe)
      }

      if (this.register.payment) {
        await this.publishPayment(this.register.payment)
      }

      this.$router.push({
        name: 'RegisterMainManager'
      })
    },
    async onDestroyRegister () {
      const agree = await this.confirmDestroy(`Registrasi ${this.register.register_number}`)
      if (agree) {
        await this.destroyRegister(this.register.id)
        this.$router.push({
          name: 'RegisterMainManager'
        })
      }
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style>

</style>
