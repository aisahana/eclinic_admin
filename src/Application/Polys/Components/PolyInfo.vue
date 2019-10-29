<template>
  <div v-if="poly">
    <common-info :obj="poly" :fields="[
      'poly_number',
      'name'
    ]"/>
  </div>
</template>

<script>
import MixinHttp from '@/Mixins/MixinHttp'
import CommonInfo from '@/Commons/CommonInfo'
import PolyService from '@/Application/Polys/PolyService'

export default {
  name: 'PolyInfo',
  components: {
    'common-info': CommonInfo
  },
  mixins: [
    MixinHttp,
    PolyService
  ],
  props: {
    id: Number
  },
  methods: {
    init () {
      if (this.id) {
        this.httpInit()
        this.retrievePoly(this.id)
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
