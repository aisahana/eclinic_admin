<template>
  <common-layout :title="'Loket Antrian'">
    <div class="row mb-4">
      <div class="col-md-12">
        <button
          class="btn btn-primary float-right ml-2"
          @click="onCreateCounter"
        >
          Loket Baru
        </button>
        <button
          class="btn btn-outline-primary float-right ml-2"
          @click="onRedirectCounterPublic"
        >
          Layar Antrian
        </button>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-md-12">
        <counter-list
          :counters="counters"
          @onSelect="onSelectCounter"
          @onNext="onNextNumberQueue"
        />
      </div>
    </div>
    <!-- modal -->
    <b-modal
      id="modal-CounterDetail"
      v-if="counter"
      ref="modal-CounterDetail"
      hide-footer
      hide-header
      size="lg"
      scrollable
    >
      <div class="row mb-2">
        <div class="col-md-6">
          <h5>Loket {{ counter.counter_number }}</h5>
        </div>
        <div class="col-md-6">
          <button
            class="btn btn-primary float-right ml-2"
            v-if="counter.is_draft"
            @click="onPublishCounter"
          >
            Publikasikan
          </button>
          <button
            class="btn btn-outline-dark float-right ml-2"
            v-if="!counter.is_draft"
            @click="onDraftCounter"
          >
            Simpan ke Draft
          </button>
          <button
            class="btn btn-link text-muted float-right"
            @click="onDestroyCounter"
          >
            Hapus
          </button>
        </div>
      </div>
      <div class="row mb-2">
        <div class="col-md-12">
          <counter-detail
            @onUpdate="onUpdateCounter"
            :counter="counter"
          />
        </div>
      </div>
    </b-modal>
    <!-- ./modal -->
  </common-layout>
</template>

<script>
import MixinHttp from '@/Mixins/MixinHttp'
import HelperNotify from '@/Helpers/HelperNotify'
import CommonLayout from '@/Commons/CommonLayout'
import CommonCard from '@/Commons/CommonCard'

import CounterService from '@/Application/Counters/CounterService'
import CounterDetail from '@/Application/Counters/Components/CounterDetail'
import CounterList from '@/Application/Counters/Components/CounterList'

import QueueService from '@/Application/Queues/QueueService'

export default {
  name: 'CounterMainManager',
  components: {
    'common-layout': CommonLayout,
    'common-card': CommonCard,
    'counter-detail': CounterDetail,
    'counter-list': CounterList
  },
  mixins: [
    MixinHttp,
    HelperNotify,
    CounterService,
    QueueService
  ],
  methods: {
    async init () {
      try {
        this.httpInit()
        this.queryCounter.is_draft = false
        await this.listCounter()
      } catch (err) {}
    },
    async onCreateCounter () {
      try {
        await this.createCounter()
        await this.$refs['modal-CounterDetail'].show()
      } catch (err) {}
    },
    async onUpdateCounter (counter) {
      try {
        const payload = {
          name: counter.name
        }
        await this.updateCounter(counter.id, payload)
        await this.listCounter()
        this.$socket.emit('channelBase', {})
      } catch (err) {}
    },
    async onPublishCounter () {
      try {
        await this.publishCounter(this.counter.id)
        await this.listCounter()
        await this.$refs['modal-CounterDetail'].hide()
        this.$socket.emit('channelBase', {})
      } catch (err) {}
    },
    async onDraftCounter () {
      try {
        await this.draftCounter(this.counter.id)
        await this.listCounter()
        await this.$refs['modal-CounterDetail'].hide()
        this.$socket.emit('channelBase', {})
      } catch (err) {}
    },
    async onDestroyCounter () {
      await this.$refs['modal-CounterDetail'].hide()
      try {
        const isDestroy = await this.confirmDestroy()
        if (isDestroy) {
          await this.destroyCounter(this.counter.id)
          await this.listCounter()
          this.$socket.emit('channelBase', {})
        }
      } catch (err) {}
    },
    async onSelectCounter (counter) {
      try {
        await this.retrieveCounter(counter.id)
        await this.$refs['modal-CounterDetail'].show()
      } catch (err) {}
    },
    onRedirectCounterPublic () {
      this.$router.push({
        name: 'CounterPublicManager'
      })
    },
    async onNextNumberQueue (counter) {
      console.log(counter)
      try {
        if (counter.current_queue_id) {
          await this.nextNumberQueue(counter.current_queue_id)
          await this.listCounter()
          this.$socket.emit('channelBase', {})
        }
      } catch (err) {}
    }
  },
  async mounted () {
    try {
      this.init()
    } catch (err) {}
  },
  sockets: {
    connect () {
      this.socketOn = true
    },
    disconnect () {
      this.socketOn = false
    },
    channelBase (data) {
      this.init()
    }
  }
}
</script>

<style>

</style>
