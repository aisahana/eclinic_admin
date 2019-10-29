<template>
  <div v-if="user">
    <common-info :obj="user" :fields="[]"/>
  </div>
</template>

<script>
import MixinHttp from '@/Mixins/MixinHttp'
import CommonInfo from '@/Commons/CommonInfo'
import UserService from '@/Application/Users/UserService'

export default {
  name: 'UserInfo',
  components: {
    'common-info': CommonInfo
  },
  mixins: [
    MixinHttp,
    UserService
  ],
  props: {
    id: Number
  },
  methods: {
    init () {
      if (this.id) {
        this.httpInit()
        this.retrieveUser(this.id)
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
