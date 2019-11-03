<template>
  <div class="row">
    <div v-if="queues.length > 0" class="col-md-12">
      <b-table
        striped
        hover
        :items="queues"
        :fields="fields"
        @row-clicked="onSelect"
      >
        <div slot="table-busy" class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </b-table>
    </div>
    <div v-if="queues.length <= 0" class="col-md-12">
      <p>No Data...</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'QueueList',
  props: {
    queues: Array
  },
  data () {
    return {
      fields: []
    }
  },
  methods: {
    onSelect (queue) {
      this.$emit('onSelect', queue)
    }
  }
}
</script>