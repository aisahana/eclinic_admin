<template>
  
</template>

<script>
export default {
  name: 'UserFilter',
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
