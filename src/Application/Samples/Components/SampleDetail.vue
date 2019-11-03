<template>
  <div v-if="mySample" class="row">
    <div class="col-md-12">
      <div class="form-group">
        <label>Example Field</label>
        <input
          disabled
          type="text"
          class="form-control"
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SampleDetail',
  props: {
    sample: Object
  },
  data () {
    return {
      mySample: undefined
    }
  },
  methods: {
    onUpdate () {
      this.$emit('onUpdate', this.mySample)
    }
  },
  watch: {
    sample (n, o) {
      this.mySample = n
    }
  },
  mounted () {
    this.mySample = this.sample
  }
}
</script>
