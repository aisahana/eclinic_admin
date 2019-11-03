<template>
  <div class="row">
    <div v-if="counters.length > 0" class="col-md-12">
      <div class="row">
        <div v-for="counter in counters" :key="counter.id" class="col-md-3">
          <div style="cursor: pointer;"  class="card">
            <div class="card-body text-center">
              <h5 class="card-text">{{ counter.name }}</h5>
              <small class="text-secondary">Antrian Saat Ini</small>
              <h1 class="display-2">{{ counter.current_queue }}</h1>
              <small v-if="counter.next_queue > 0" class="text-info">
                Antrian berikutnya nomer <strong>{{ counter.next_queue }}</strong>
                dari <strong>{{ counter.total_queue }}</strong> antrian.
              </small>
              <small v-if="counter.next_queue === 0" class="text-info">
                Antrian telah habis.
              </small>
            </div>
            <div class="card-body text-center">
              <button
                class="btn btn-outline-primary"
                @click="onSelect(counter)"
              >
                Pilih
              </button>
              <button
                class="btn btn-primary"
                @click="onNext(counter)"
              >
                Selanjutnya
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="counters.length <= 0" class="col-md-12">
      <p>No Data...</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CounterList',
  props: {
    counters: Array
  },
  data () {
    return {
      fields: []
    }
  },
  methods: {
    onSelect (counter) {
      this.$emit('onSelect', counter)
    },
    onNext (counter) {
      this.$emit('onNext', counter)
    }
  }
}
</script>
