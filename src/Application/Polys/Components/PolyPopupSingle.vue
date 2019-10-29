<template>
  <div>
    <div class="row mb-4">
      <div class="col-md-12">
        <button @click="onCreatePoly" class="btn btn-primary float-right">
          Poli Baru
        </button>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-md-3">
        <common-card>
          <span slot="title">Filter</span>
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
            Publikasi
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
  </div>
</template>

<script>
import _ from 'underscore'

import MixinHttp from '@/Mixins/MixinHttp'
import HelperNotify from '@/Helpers/HelperNotify'
import CommonCard from '@/Commons/CommonCard'

import PolyService from '@/Application/Polys/PolyService'
import PolyList from '@/Application/Polys/Components/PolyList'
import PolyFilter from '@/Application/Polys/Components/PolyFilter'
import PolyDetail from '@/Application/Polys/Components/PolyDetail'

export default {
  name: 'PolyPopupSingle',
  components: {
    'common-card': CommonCard,
    'poly-list': PolyList,
    'poly-filter': PolyFilter,
    'poly-detail': PolyDetail
  },
  mixins: [
    MixinHttp,
    HelperNotify,
    PolyService
  ],
  props: {
    query: Object
  },
  methods: {
    init () {
      this.queryPoly = _.extend(
        {},
        this.queryPoly,
        this.query
      )

      this.listPoly()
    },
    onSelectPoly (poly) {
      this.retrievePoly(poly.id)
        .then((response) => {
          this.$emit('onSelect', this.poly)
        })
    },
    onFilterPoly (query) {
      console.log(query)
      this.queryPoly = _.extend(
        {},
        this.queryPoly,
        query
      )
      this.listPoly()
    },
    onPaginatePoly (page) {
      this.queryPoly.page = page
      this.init()
    },
    onCreatePoly () {
      this.createPoly()
        .then((response) => {
          this.$refs['modal-PolyDetail'].show()
          this.init()
        })
    },
    onPublishPoly () {
      this.publishPoly(this.poly.id)
        .then((response) => {
          this.$refs['modal-PolyDetail'].hide()
          this.init()
          this.$emit('onSelect', this.poly)
        })
    },
    onUpdatePoly (poly) {
      const payload = {
        name: poly.name
      }
      this.updatePoly(poly.id, payload)
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
