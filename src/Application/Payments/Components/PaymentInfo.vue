<template>
  <div v-if="payment">
    <common-info :obj="payment" :fields="[]"/>
  </div>
</template>

<script>
import MixinHttp from '@/Mixins/MixinHttp'
import CommonInfo from '@/Commons/CommonInfo'
import PaymentService from '@/Application/Payments/PaymentService'

export default {
  name: 'PaymentInfo',
  components: {
    'common-info': CommonInfo
  },
  mixins: [
    MixinHttp,
    PaymentService
  ],
  props: {
    id: Number
  },
  methods: {
    init () {
      if (this.id) {
        this.httpInit()
        this.retrievePayment(this.id)
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
