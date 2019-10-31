<template>
  <div class="row">
    <div v-if="medicines.length > 0" class="col-md-12">
      <b-table
        striped
        hover
        :items="medicines"
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
    <div v-if="medicines.length <= 0" class="col-md-12">
      <p>No Data...</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MedicineList',
  props: {
    medicines: Array
  },
  data () {
    return {
      fields: [
        {key: 'medicine_number', label: 'Nomer Obat'},
        {key: 'name', label: 'Nama Obat'},
        {key: 'unit', label: 'Satuan'},
        {key: 'medicine_type', label: 'Jenis Obat'},
        {key: 'stock', label: 'Stok'},
        {key: 'price', label: 'Harga'},
        {key: 'is_draft', label: 'Draft'}
      ]
    }
  },
  methods: {
    onSelect (medicine) {
      this.$emit('onSelect', medicine)
    }
  }
}
</script>
