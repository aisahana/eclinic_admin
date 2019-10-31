<template>
  <div class="row">
    <div v-if="polys.length > 0" class="col-md-12">
      <b-table
        striped
        hover
        :items="polys"
        :fields="fields"
        @row-clicked="onSelect"
        responsive
      >
        <template v-slot:cell(is_draft)="data">
          <small v-if="!data.item.is_draft">
            <i class="fa fa-check text-success"></i> Terbit
          </small>
          <small v-if="data.item.is_draft">
            <i class="fa fa-warning text-warning"></i> Draft
          </small>
        </template>
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
        {key: 'is_draft', label: 'Status'}
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
