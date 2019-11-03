<template>
  <div v-if="myQueue" class="row">
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
  name: 'QueueDetail',
  props: {
    queue: Object
  },
  data () {
    return {
      myQueue: undefined
    }
  },
  methods: {
    onUpdate () {
      this.$emit('onUpdate', this.myQueue)
    }
  },
  watch: {
    queue (n, o) {
      this.myQueue = n
    }
  },
  mounted () {
    this.myQueue = this.queue
  }
}
</script>
