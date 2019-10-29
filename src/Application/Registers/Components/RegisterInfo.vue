<template>
  <div v-if="register">
    <common-info :obj="register" :fields="[
      'register_number',
      'is_open'
    ]"/>
  </div>
</template>

<script>
import MixinHttp from '@/Mixins/MixinHttp'
import CommonInfo from '@/Commons/CommonInfo'
import RegisterService from '@/Application/Registers/RegisterService'

export default {
  name: 'RegisterInfo',
  components: {
    'common-info': CommonInfo
  },
  mixins: [
    MixinHttp,
    RegisterService
  ],
  props: {
    id: Number
  },
  methods: {
    init () {
      if (this.id) {
        this.httpInit()
        this.retrieveRegister(this.id)
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
