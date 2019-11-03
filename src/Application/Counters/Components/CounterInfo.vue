<template>
  <div v-if="counter">
    <common-info :obj="counter" :fields="[]"/>
  </div>
</template>

<script>
import MixinHttp from '@/Mixins/MixinHttp'
import CommonInfo from '@/Commons/CommonInfo'
import CounterService from '@/Application/Counters/CounterService'

export default {
  name: 'CounterInfo',
  components: {
    'common-info': CommonInfo
  },
  mixins: [
    MixinHttp,
    CounterService
  ],
  props: {
    id: Number
  },
  methods: {
    init () {
      if (this.id) {
        this.httpInit()
        this.retrieveCounter(this.id)
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
