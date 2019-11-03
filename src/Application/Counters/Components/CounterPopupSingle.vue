<template>
  <div>
    <div class="row mb-4">
      <div class="col-md-12">
        <button @click="onCreateCounter" class="btn btn-primary float-right">
          Counter Baru
        </button>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-md-3">
        <common-card>
          <span slot="title">Filter</span>
          <counter-filter slot="content" @onFilter="onFilterCounter" />
        </common-card>
      </div>
      <div class="col-md-9">
        <common-card>
          <span slot="title">Daftar Counter</span>
          <counter-list slot="content" :counters="counters" @onSelect="onSelectCounter" />
        </common-card>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-md-12">
        <b-pagination
          class="float-right"
          v-model="queryCounter.page"
          :total-rows="paginationCounter.count"
          @change="onPaginateCounter"
          :per-page="25"
          aria-controls="my-table"
        >
        </b-pagination>
      </div>
    </div>
    <!-- modal-counter-detail -->
    <b-modal
      id="modal-CounterDetail"
      v-if="counter"
      ref="modal-CounterDetail"
      hide-footer
      size="lg"
    >
      <div class="row mb-2">
        <div class="col-md-6">
          <h5>Counter</h5>
        </div>
        <div class="col-md-6">
          <button
            v-if="counter.is_draft"
            class="btn btn-primary float-right ml-2"
            @click="onPublishCounter"
          >
            Publikasi
          </button>
        </div>
      </div>
      <div class="row mb-2">
        <div class="col-md-12">
          <counter-detail :poly="counter" @onUpdate="onUpdateCounter" />
        </div>
      </div>
    </b-modal>
    <!-- ./modal-counter-detail -->
  </div>
</template>

<script>
import _ from 'underscore'

import MixinHttp from '@/Mixins/MixinHttp'
import HelperNotify from '@/Helpers/HelperNotify'
import CommonCard from '@/Commons/CommonCard'

import CounterService from '@/Application/Counters/PolyService'
import CounterList from '@/Application/Counters/Components/CounterList'
import CounterFilter from '@/Application/Counters/Components/CounterFilter'
import CounterDetail from '@/Application/Counters/Components/CounterDetail'

export default {
  name: 'CounterPopupSingle',
  components: {
    'common-card': CommonCard,
    'counter-list': CounterList,
    'counter-filter': CounterFilter,
    'counter-detail': CounterDetail
  },
  mixins: [
    MixinHttp,
    HelperNotify,
    CounterService
  ],
  props: {
    query: Object
  },
  methods: {
    init () {
      this.queryCounter = _.extend(
        {},
        this.queryCounter,
        this.query
      )
      this.httpInit()
      this.listCounter()
    },
    onSelectCounter (counter) {
      this.retrieveCounter(counter.id)
        .then((response) => {
          this.$emit('onSelect', this.counter)
        })
    },
    onFilterCounter (query) {
      this.queryCounter.counter_number = query.counter_number
      this.queryCounter.name = query.name
      this.init()
    },
    onPaginateCounter (page) {
      this.queryCounter.page = page
      this.init()
    },
    onCreateCounter () {
      this.createCounter()
        .then((response) => {
          this.$refs['modal-CounterDetail'].show()
          this.init()
        })
    },
    onPublishCounter () {
      this.publishCounter(this.counter.id)
        .then((response) => {
          this.$refs['modal-CounterDetail'].hide()
          this.init()
          this.$emit('onSelect', this.counter)
        })
    },
    onUpdateCounter (counter) {
      const payload = {
        name: counter.name
      }
      this.updatePoly(counter.id, payload)
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
