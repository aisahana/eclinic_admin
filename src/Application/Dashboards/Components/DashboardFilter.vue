<template>
  
</template>

<script>
export default {
  name: 'DashboardFilter',
  data () {
    return {
      query: {
        name: ''
      }
    }
  },
  methods: {
    onFilter () {
      this.$emit('onFilter', this.query)
    }
  }
}
</script>
