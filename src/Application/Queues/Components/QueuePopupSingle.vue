<template>
  <div>
    <div class="row mb-4">
      <div class="col-md-12">
        <button @click="onCreateQueue" class="btn btn-primary float-right">
          Queue Baru
        </button>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-md-3">
        <common-card>
          <span slot="title">Filter</span>
          <queue-filter slot="content" @onFilter="onFilterQueue" />
        </common-card>
      </div>
      <div class="col-md-9">
        <common-card>
          <span slot="title">Daftar Queue</span>
          <queue-list slot="content" :queues="queues" @onSelect="onSelectQueue" />
        </common-card>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-md-12">
        <b-pagination
          class="float-right"
          v-model="queryQueue.page"
          :total-rows="paginationQueue.count"
          @change="onPaginateQueue"
          :per-page="25"
          aria-controls="my-table"
        >
        </b-pagination>
      </div>
    </div>
    <!-- modal-queue-detail -->
    <b-modal
      id="modal-QueueDetail"
      v-if="queue"
      ref="modal-QueueDetail"
      hide-footer
      size="lg"
    >
      <div class="row mb-2">
        <div class="col-md-6">
          <h5>Queue</h5>
        </div>
        <div class="col-md-6">
          <button
            v-if="queue.is_draft"
            class="btn btn-primary float-right ml-2"
            @click="onPublishQueue"
          >
            Publikasi
          </button>
        </div>
      </div>
      <div class="row mb-2">
        <div class="col-md-12">
          <queue-detail :poly="queue" @onUpdate="onUpdateQueue" />
        </div>
      </div>
    </b-modal>
    <!-- ./modal-queue-detail -->
  </div>
</template>

<script>
import _ from 'underscore'

import MixinHttp from '@/Mixins/MixinHttp'
import HelperNotify from '@/Helpers/HelperNotify'
import CommonCard from '@/Commons/CommonCard'

import QueueService from '@/Application/Queues/PolyService'
import QueueList from '@/Application/Queues/Components/QueueList'
import QueueFilter from '@/Application/Queues/Components/QueueFilter'
import QueueDetail from '@/Application/Queues/Components/QueueDetail'

export default {
  name: 'QueuePopupSingle',
  components: {
    'common-card': CommonCard,
    'queue-list': QueueList,
    'queue-filter': QueueFilter,
    'queue-detail': QueueDetail
  },
  mixins: [
    MixinHttp,
    HelperNotify,
    QueueService
  ],
  props: {
    query: Object
  },
  methods: {
    init () {
      this.queryQueue = _.extend(
        {},
        this.queryQueue,
        this.query
      )
      this.httpInit()
      this.listQueue()
    },
    onSelectQueue (queue) {
      this.retrieveQueue(queue.id)
        .then((response) => {
          this.$emit('onSelect', this.queue)
        })
    },
    onFilterQueue (query) {
      this.queryQueue.queue_number = query.queue_number
      this.queryQueue.name = query.name
      this.init()
    },
    onPaginateQueue (page) {
      this.queryQueue.page = page
      this.init()
    },
    onCreateQueue () {
      this.createQueue()
        .then((response) => {
          this.$refs['modal-QueueDetail'].show()
          this.init()
        })
    },
    onPublishQueue () {
      this.publishQueue(this.queue.id)
        .then((response) => {
          this.$refs['modal-QueueDetail'].hide()
          this.init()
          this.$emit('onSelect', this.queue)
        })
    },
    onUpdateQueue (queue) {
      const payload = {
        name: queue.name
      }
      this.updatePoly(queue.id, payload)
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
