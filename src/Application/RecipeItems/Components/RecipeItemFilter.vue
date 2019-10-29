<template>
  
</template>

<script>
export default {
  name: 'RecipeItemFilter',
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
