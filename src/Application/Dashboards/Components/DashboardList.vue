<template>
  <pre>
    {{ dashboards }}
  </pre>
</template>

<script>
export default {
  name: 'DashboardList',
  props: {
    dashboards: Array
  },
  data () {
    return {
      fields: []
    }
  },
  methods: {
    onSelect (dashboard) {
      this.$emit('onSelect', dashboard)
    },
    onDoubleClick (dashboard) {
      this.$emit('onDoubleClick', dashboard)
    },
    onDestroy (dashboard) {
      this.$emit('onDestroy', dashboard)
    }
  }
}
</script>
