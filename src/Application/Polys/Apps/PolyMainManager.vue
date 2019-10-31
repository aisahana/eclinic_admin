<template>
  <common-layout :title="'Poli'">
    <div class="row mb-4">
      <div class="col-md-12">
        <button
          @click="onCreatePoly"
          class="btn btn-primary float-right ml-2"
        >
          Poli Baru
        </button>
        <button
          @click="onReportPoly"
          class="btn btn-outline-primary float-right"
        >
          Export PDF
        </button>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-md-3">
        <common-card>
          <span slot="title">Pencarian & Filter</span>
          <poly-filter slot="content" @onFilter="onFilterPoly" />
        </common-card>
      </div>
      <div class="col-md-9">
        <common-card>
          <span slot="title">Daftar Poli</span>
          <poly-list slot="content" :polys="polys" @onSelect="onSelectPoly" />
        </common-card>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-md-12">
        <b-pagination
          class="float-right"
          v-model="queryPoly.page"
          :total-rows="paginationPoly.count"
          @change="onPaginatePoly"
          :per-page="25"
          aria-controls="my-table"
        >
        </b-pagination>
      </div>
    </div>
    <!-- modal-poly-detail -->
    <b-modal
      id="modal-PolyDetail"
      v-if="poly"
      ref="modal-PolyDetail"
      hide-footer
      hide-header
      size="lg"
    >
      <div class="row mb-2">
        <div class="col-md-6">
          <h5>Poli</h5>
        </div>
        <div class="col-md-6">
          <button
            v-if="poly.is_draft"
            class="btn btn-primary float-right ml-2"
            @click="onPublishPoly"
          >
            Publikasikan
          </button>
          <button
            class="btn btn-outline-dark float-right ml-2"
            @click="onDraftPoly"
            v-if="!poly.is_draft"
          >
            Simpan Ke Draft
          </button>
          <button
            class="btn btn-link text-muted float-right ml-2"
            @click="onDestroyPoly"
          >
            Hapus
          </button>
        </div>
      </div>
      <div class="row mb-2">
        <div class="col-md-12">
          <poly-detail :poly="poly" @onUpdate="onUpdatePoly" />
        </div>
      </div>
    </b-modal>
    <!-- ./modal-poly-detail -->
  </common-layout>
</template>

<script>
import _ from 'underscore'

import MixinHttp from '@/Mixins/MixinHttp'
import HelperNotify from '@/Helpers/HelperNotify'
import HelperPDF from '@/Helpers/HelperPDF'
import CommonLayout from '@/Commons/CommonLayout'
import CommonCard from '@/Commons/CommonCard'

import PolyService from '@/Application/Polys/PolyService'
import PolyList from '@/Application/Polys/Components/PolyList'
import PolyFilter from '@/Application/Polys/Components/PolyFilter'
import PolyDetail from '@/Application/Polys/Components/PolyDetail'

export default {
  name: 'PolyMainManager',
  components: {
    'common-layout': CommonLayout,
    'common-card': CommonCard,
    'poly-list': PolyList,
    'poly-filter': PolyFilter,
    'poly-detail': PolyDetail
  },
  mixins: [
    MixinHttp,
    HelperNotify,
    PolyService,
    HelperPDF
  ],
  methods: {
    async init () {
      this.httpInit()
      this.queryPoly.is_draft = false
      await this.listPoly()
    },
    async onSelectPoly (poly) {
      await this.retrievePoly(poly.id)
      await this.$refs['modal-PolyDetail'].show()
    },
    async onFilterPoly (query) {
      this.queryPoly = _.extend(
        {},
        this.queryPoly,
        query
      )
      await this.listPoly()
    },
    onPaginatePoly (page) {
      this.queryPoly.page = page
      this.init()
    },
    async onUpdatePoly (poly) {
      const payload = {
        name: poly.name
      }
      await this.updatePoly(poly.id, payload)
      await this.init()
    },
    onCreatePoly () {
      this.createPoly()
        .then((response) => {
          this.$refs['modal-PolyDetail'].show()
          this.init()
        })
    },
    async onPublishPoly () {
      await this.publishPoly(this.poly.id)
      await this.listPoly()
      await this.$refs['modal-PolyDetail'].hide()
    },
    async onDraftPoly () {
      const payload = {
        is_draft: true
      }
      await this.updatePoly(this.poly.id, payload)
      await this.init()
    },
    async onDestroyPoly () {
      try {
        const approved = await this.confirmDestroy('Poli')
        if (approved) {
          await this.$refs['modal-PolyDetail'].hide()
          await this.destroyPoly(this.poly.id)
          await this.init()
        }
      } catch (err) {}
    },
    async onReportPoly () {
      const { data } = await this.reportPoly()
      this.downloadInvoicePDF(data, 'report-poly.pdf')
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style>

</style>
