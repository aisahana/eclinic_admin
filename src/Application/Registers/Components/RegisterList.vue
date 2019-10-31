<template>
  <div class="row">
    <div v-if="registers.length > 0" class="col-md-12">
      <b-table
        striped
        hover
        :items="registers"
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
        <template v-slot:cell(is_open)="data">
          <small v-if="!data.item.is_open">
            <i class="fa fa-check text-success"></i> Selesai
          </small>
          <small v-if="data.item.is_open">
            <i class="fa fa-pencil text-primary"></i> Dibuka
          </small>
        </template>
        <div slot="table-busy" class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </b-table>
    </div>
    <div v-if="registers.length <= 0" class="col-md-12">
      <p>No Data...</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'RegisterList',
  props: {
    registers: Array
  },
  data () {
    return {
      fields: [
        {key: 'register_number', label: 'Nomer Registrasi'},
        {key: 'doctor_name', label: 'Dokter'},
        {key: 'patient_name', label: 'Pasien'},
        {key: 'poly_name', label: 'Poli'},
        {key: 'is_open', label: 'Registrasi Baru'},
        {key: 'is_draft', label: 'Draft'}
      ]
    }
  },
  methods: {
    onSelect (register) {
      this.$emit('onSelect', register)
    }
  }
}
</script>
