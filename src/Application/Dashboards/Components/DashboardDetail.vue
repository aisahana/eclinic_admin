<template>
  
</template>

<script>
export default {
  name: 'DashboardDetail',
  props: {
    dashboard: Object
  },
  data () {
    return {
      myDashboard: undefined
    }
  },
  methods: {
    onUpdate () {
      this.$emit('onUpdate', this.myDashboard)
    }
  },
  watch: {
    dashboard (n, o) {
      this.myDashboard = n
    }
  },
  mounted () {
    this.myDashboard = this.dashboard
  }
}
</script>
