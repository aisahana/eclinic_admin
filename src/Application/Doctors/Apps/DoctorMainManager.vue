<template>
  <common-layout :title="'Dokter'">
    <div class="row mb-4">
      <div class="col-md-12">
        <button @click="onCreateDoctor" class="btn btn-primary float-right ml-2">
          Dokter Baru
        </button>
        <button @click="onReportDoctor" class="btn btn-outline-primary float-right ml-2">
          Export PDF
        </button>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-md-3">
        <common-card>
          <span slot="title">Pencarian & Filter</span>
          <doctor-filter slot="content" @onFilter="onFilterDoctor" />
        </common-card>
      </div>
      <div class="col-md-9">
        <common-card>
          <span slot="title">Daftar Dokter</span>
          <doctor-list
            :doctors="doctors"
            @onSelect="onSelectDoctor"
            slot="content"
          />
        </common-card>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-md-12">
        <b-pagination
          class="float-right"
          v-model="queryDoctor.page"
          :total-rows="paginationDoctor.count"
          @change="onPaginateDoctor"
          :per-page="25"
          aria-controls="my-table"
        >
        </b-pagination>
      </div>
    </div>
    <b-modal
      id="modal-DoctorDetail"
      v-if="doctor"
      ref="modal-DoctorDetail"
      hide-footer
      hide-header
      size="lg"
    >
      <div class="row mb-2">
        <div class="col-md-6">
          <h5>Dokter</h5>
        </div>
        <div class="col-md-6">
          <button
            class="btn btn-primary float-right ml-2"
            @click="onPublishDoctor"
            v-if="doctor.is_draft"
          >
            Publikasikan
          </button>
          <button
            class="btn btn-outline-dark float-right ml-2"
            @click="onDraftDoctor"
            v-if="!doctor.is_draft"
          >
            Simpan Ke Draft
          </button>
          <button
            class="btn btn-link text-muted float-right ml-2"
            @click="onDestroyDoctor"
          >
            Hapus
          </button>
        </div>
      </div>
      <div class="row mb-2">
        <div class="col-md-12">
          <doctor-detail :doctor="doctor" @onUpdate="onUpdateDoctor" />
        </div>
      </div>
      <div class="row mb-2">
        <div @click="onPolyPopupSingle" class="col-md-12">
          <common-card v-if="!doctor.poly">
            <span slot="title">Poly</span>
            <p slot="content">Poli belum dipilih. Klik untuk memilih</p>
          </common-card>
          <common-card v-if="doctor.poly">
            <span slot="title">Poly</span>
            <poly-info :id="doctor.poly" />
          </common-card>
        </div>
      </div>
    </b-modal>
    <b-modal
      id="modal-PolyPopupSingle"
      ref="modal-PolyPopupSingle"
      hide-footer
      hide-header
      size="lg"
    >
      <div class="row mb-2">
        <div class="col-md-12">
          <poly-popup-single
            :query="{is_draft: false}"
            @onSelect="onSelectPoly"
          />
        </div>
      </div>
    </b-modal>
  </common-layout>
</template>

<script>
import _ from 'underscore'

import MixinHttp from '@/Mixins/MixinHttp'
import HelperNotify from '@/Helpers/HelperNotify'
import HelperPDF from '@/Helpers/HelperPDF'
import CommonLayout from '@/Commons/CommonLayout'
import CommonCard from '@/Commons/CommonCard'

import DoctorService from '@/Application/Doctors/DoctorService'
import DoctorList from '@/Application/Doctors/Components/DoctorList'
import DoctorFilter from '@/Application/Doctors/Components/DoctorFilter'
import DoctorDetail from '@/Application/Doctors/Components/DoctorDetail'

import PolyInfo from '@/Application/Polys/Components/PolyInfo'
import PolyPopupSingle from '@/Application/Polys/Popups/PolyPopupSingle'

export default {
  name: 'DoctorMainManager',
  components: {
    'common-layout': CommonLayout,
    'common-card': CommonCard,
    'doctor-list': DoctorList,
    'doctor-filter': DoctorFilter,
    'doctor-detail': DoctorDetail,
    'poly-info': PolyInfo,
    'poly-popup-single': PolyPopupSingle
  },
  mixins: [
    MixinHttp,
    HelperNotify,
    HelperPDF,
    DoctorService
  ],
  methods: {
    async init () {
      this.httpInit()
      this.queryDoctor.is_draft = false
      await this.listDoctor()
    },
    onSelectDoctor (doctor) {
      this.retrieveDoctor(doctor.id)
        .then((response) => {
          this.$refs['modal-DoctorDetail'].show()
        })
    },
    onPolyPopupSingle () {
      this.$refs['modal-PolyPopupSingle'].show()
    },
    async onFilterDoctor (query) {
      this.queryDoctor = _.extend(
        {},
        this.queryDoctor,
        query
      )
      await this.listDoctor()
    },
    onCreateDoctor () {
      this.createDoctor()
        .then((response) => {
          this.$refs['modal-DoctorDetail'].show()
          this.init()
        })
    },
    onPaginateDoctor (page) {
      this.queryDoctor.page = page
      this.init()
    },
    onUpdateDoctor (doctor) {
      const payload = {
        name: doctor.name,
        address: doctor.address,
        gender: doctor.gender,
        phone: doctor.phone,
        price: doctor.price
      }
      this.updateDoctor(doctor.id, payload)
        .then((response) => {
          this.init()
        })
    },
    onSelectPoly (poly) {
      const payload = {
        poly: poly.id
      }
      this.updateDoctor(this.doctor.id, payload)
        .then((response) => {
          this.$refs['modal-PolyPopupSingle'].hide()
          this.init()
        })
    },
    async onPublishDoctor () {
      await this.publishDoctor(this.doctor.id)
      await this.init()
      await this.$refs['modal-DoctorDetail'].hide()
    },
    async onDraftDoctor () {
      const payload = {
        is_draft: true
      }
      await this.updateDoctor(this.doctor.id, payload)
      await this.init()
    },
    onDestroyDoctor () {
      this.destroyDoctor(this.doctor.id)
        .then((response) => {
          this.init()
        })
    },
    async onReportDoctor () {
      const { data } = await this.reportDoctor()
      this.downloadInvoicePDF(data, 'report-dokter')
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style>

</style>
