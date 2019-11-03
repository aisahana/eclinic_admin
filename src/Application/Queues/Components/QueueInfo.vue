<template>
  <div v-if="queue">
    <common-info :obj="queue" :fields="[]"/>
  </div>
</template>

<script>
import MixinHttp from '@/Mixins/MixinHttp'
import CommonInfo from '@/Commons/CommonInfo'
import QueueService from '@/Application/Queues/QueueService'

export default {
  name: 'QueueInfo',
  components: {
    'common-info': CommonInfo
  },
  mixins: [
    MixinHttp,
    QueueService
  ],
  props: {
    id: Number
  },
  methods: {
    init () {
      if (this.id) {
        this.httpInit()
        this.retrieveQueue(this.id)
      }
    }
  },
  watch: {
    id (n, o) {
      this.init()
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style>

</style>
