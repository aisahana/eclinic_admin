<template>
  <div class="row">
    <div v-if="polys.length > 0" class="col-md-12">
      <b-table
        striped
        hover
        :items="polys"
        :fields="fields"
        @row-clicked="onSelect"
        v-b-tooltip.hover
      >
        <div slot="table-busy" class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </b-table>
    </div>
    <div v-if="polys.length <= 0" class="col-md-12">
      <p>No Data...</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'PolyList',
  props: {
    polys: Array
  },
  data () {
    return {
      fields: [
        {key: 'poly_number', label: 'Nomer Poli'},
        {key: 'name', label: 'Nama Poli'},
        {key: 'is_draft', label: 'Draft'}
      ]
    }
  },
  methods: {
    onSelect (poly) {
      this.$emit('onSelect', poly)
    }
  }
}
</script>
