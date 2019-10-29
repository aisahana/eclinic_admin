<template>
  <div v-if="dashboard">
    <common-info :obj="dashboard" :fields="[]"/>
  </div>
</template>

<script>
import MixinHttp from '@/Mixins/MixinHttp'
import CommonInfo from '@/Commons/CommonInfo'
import DashboardService from '@/Application/Dashboards/DashboardService'

export default {
  name: 'DashboardInfo',
  components: {
    'common-info': CommonInfo
  },
  mixins: [
    MixinHttp,
    DashboardService
  ],
  props: {
    id: Number
  },
  methods: {
    init () {
      if (this.id) {
        this.httpInit()
        this.retrieveDashboard(this.id)
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
