<template>
  <div style="margin-top: 40px;" class="container">
    <div class="col-md-12 mb-4">
      <h3 class="text-primary">
        eClinic
        <small v-if="socketOn" class="text-secondary">
          <i class="text-primary fa fa-bullhorn" aria-hidden="true"></i> Antrian Loket
        </small>
        <small v-if="!socketOn" class="text-secondary">
          <i class="text-muted fa fa-bullhorn" aria-hidden="true"></i> Antrian Loket
        </small>
      </h3>
    </div>
    <div class="col-md-12">
      <counter-public
        :counters="counters"
        @onSelect="onGenerateQueue"
      />
    </div>
    <!-- modal -->
    <b-modal
      id="modal-QueueDetail"
      v-if="queue"
      ref="modal-QueueDetail"
      hide-footer
      hide-header
      scrollable
    >
      <div class="row mb-2">
        <div class="col-md-12">
          <h5 class="text-center">
            Nomer Antrian Anda:
          </h5>
          <h1 class="text-center display-1">
            <strong class="text-primary">{{ queue.number }}</strong>
          </h1>
          <h5 class="text-center">
            <small>Loket:</small> {{ queue.counter_name }}
          </h5>
        </div>
      </div>
    </b-modal>
    <!-- ./modal -->
  </div>
</template>

<script>
import HelperNotify from '@/Helpers/HelperNotify'

import CounterService from '@/Application/Counters/CounterService'
import CounterPublic from '@/Application/Counters/Components/CounterPublic'

import QueueService from '@/Application/Queues/QueueService'

export default {
  name: 'CounterPublicManager',
  components: {
    'counter-public': CounterPublic
  },
  mixins: [
    HelperNotify,
    CounterService,
    QueueService
  ],
  data () {
    return {
      socketOn: false
    }
  },
  methods: {
    async init () {
      try {
        this.queryCounter.is_draft = false
        await this.publicCounter()
      } catch (err) {}
    },
    async onGenerateQueue (counter) {
      try {
        await this.generateQueue(counter.id)
        await this.$refs['modal-QueueDetail'].show()
        this.$socket.emit('channelBase', {})
      } catch (err) {}
    }
  },
  async mounted () {
    try {
      await this.init()
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
