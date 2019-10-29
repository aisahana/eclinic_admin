<template>
  <div>
    <div class="row mb-4">
      <div class="col-md-12">
        <button @click="onCreateDoctor" class="btn btn-primary float-right">
          Dokter Baru
        </button>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-md-3">
        <common-card>
          <span slot="title">Filter</span>
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
      size="xl"
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
            Publikasi
          </button>
          <button
            class="btn btn-danger float-right"
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
      size="xl"
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
  </div>
</template>

<script>
import _ from 'underscore'

import MixinHttp from '@/Mixins/MixinHttp'
import HelperNotify from '@/Helpers/HelperNotify'
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
    DoctorService
  ],
  props: {
    query: Object
  },
  methods: {
    async init () {
      this.queryDoctor = _.extend(
        {},
        this.queryDoctor,
        this.query
      )
      await this.listDoctor()
    },
    onSelectDoctor (doctor) {
      this.retrieveDoctor(doctor.id)
        .then((response) => {
          this.$emit('onSelect', doctor)
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
    onPublishDoctor () {
      this.publishDoctor(this.doctor.id)
        .then((response) => {
          this.$refs['modal-DoctorDetail'].hide()
          this.init()
        })
    },
    onDestroyDoctor () {
      this.destroyDoctor(this.doctor.id)
        .then((response) => {
          this.init()
        })
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
