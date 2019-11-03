<template>
  <div>
    <div class="row mb-4">
      <div class="col-md-12">
        <button @click="onCreateSample" class="btn btn-primary float-right">
          Sample Baru
        </button>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-md-3">
        <common-card>
          <span slot="title">Filter</span>
          <sample-filter slot="content" @onFilter="onFilterSample" />
        </common-card>
      </div>
      <div class="col-md-9">
        <common-card>
          <span slot="title">Daftar Sample</span>
          <sample-list slot="content" :samples="samples" @onSelect="onSelectSample" />
        </common-card>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-md-12">
        <b-pagination
          class="float-right"
          v-model="querySample.page"
          :total-rows="paginationSample.count"
          @change="onPaginateSample"
          :per-page="25"
          aria-controls="my-table"
        >
        </b-pagination>
      </div>
    </div>
    <!-- modal-sample-detail -->
    <b-modal
      id="modal-SampleDetail"
      v-if="sample"
      ref="modal-SampleDetail"
      hide-footer
      size="lg"
    >
      <div class="row mb-2">
        <div class="col-md-6">
          <h5>Sample</h5>
        </div>
        <div class="col-md-6">
          <button
            v-if="sample.is_draft"
            class="btn btn-primary float-right ml-2"
            @click="onPublishSample"
          >
            Publikasi
          </button>
        </div>
      </div>
      <div class="row mb-2">
        <div class="col-md-12">
          <sample-detail :poly="sample" @onUpdate="onUpdateSample" />
        </div>
      </div>
    </b-modal>
    <!-- ./modal-sample-detail -->
  </div>
</template>

<script>
import _ from 'underscore'

import MixinHttp from '@/Mixins/MixinHttp'
import HelperNotify from '@/Helpers/HelperNotify'
import CommonCard from '@/Commons/CommonCard'

import SampleService from '@/Application/Samples/PolyService'
import SampleList from '@/Application/Samples/Components/SampleList'
import SampleFilter from '@/Application/Samples/Components/SampleFilter'
import SampleDetail from '@/Application/Samples/Components/SampleDetail'

export default {
  name: 'SamplePopupSingle',
  components: {
    'common-card': CommonCard,
    'sample-list': SampleList,
    'sample-filter': SampleFilter,
    'sample-detail': SampleDetail
  },
  mixins: [
    MixinHttp,
    HelperNotify,
    SampleService
  ],
  props: {
    query: Object
  },
  methods: {
    init () {
      this.querySample = _.extend(
        {},
        this.querySample,
        this.query
      )
      this.httpInit()
      this.listSample()
    },
    onSelectSample (sample) {
      this.retrieveSample(sample.id)
        .then((response) => {
          this.$emit('onSelect', this.sample)
        })
    },
    onFilterSample (query) {
      this.querySample.sample_number = query.sample_number
      this.querySample.name = query.name
      this.init()
    },
    onPaginateSample (page) {
      this.querySample.page = page
      this.init()
    },
    onCreateSample () {
      this.createSample()
        .then((response) => {
          this.$refs['modal-SampleDetail'].show()
          this.init()
        })
    },
    onPublishSample () {
      this.publishSample(this.sample.id)
        .then((response) => {
          this.$refs['modal-SampleDetail'].hide()
          this.init()
          this.$emit('onSelect', this.sample)
        })
    },
    onUpdateSample (sample) {
      const payload = {
        name: sample.name
      }
      this.updatePoly(sample.id, payload)
        .then((response) => {
          this.init()
        })
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style>

</style>
