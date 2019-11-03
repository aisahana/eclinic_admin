<template>
  <div v-if="myCounter" class="row">
    <div class="col-md-12">
      <div class="form-group">
        <label>Nama Loket</label>
        <input
          v-model="myCounter.name"
          type="text"
          class="form-control"
          @change="onUpdate"
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CounterDetail',
  props: {
    counter: Object
  },
  data () {
    return {
      myCounter: undefined
    }
  },
  methods: {
    onUpdate () {
      this.$emit('onUpdate', this.myCounter)
    }
  },
  watch: {
    counter (n, o) {
      this.myCounter = n
    }
  },
  mounted () {
    this.myCounter = this.counter
  }
}
</script>
