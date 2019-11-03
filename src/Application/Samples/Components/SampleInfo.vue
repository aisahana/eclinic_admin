<template>
  <div v-if="sample">
    <common-info :obj="sample" :fields="[]"/>
  </div>
</template>

<script>
import MixinHttp from '@/Mixins/MixinHttp'
import CommonInfo from '@/Commons/CommonInfo'
import SampleService from '@/Application/Samples/SampleService'

export default {
  name: 'SampleInfo',
  components: {
    'common-info': CommonInfo
  },
  mixins: [
    MixinHttp,
    SampleService
  ],
  props: {
    id: Number
  },
  methods: {
    init () {
      if (this.id) {
        this.httpInit()
        this.retrieveSample(this.id)
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
