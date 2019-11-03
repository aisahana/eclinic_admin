<template>
  <div class="row">
    <div class="col-md-12">
      <div class="form-group">
        <label>Example Field</label>
        <input
          v-model="query.exampleField"
          @keypress.enter="onFilter"
          type="text"
          class="form-control"
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SampleFilter',
  data () {
    return {
      query: {
        exampleField: ''
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