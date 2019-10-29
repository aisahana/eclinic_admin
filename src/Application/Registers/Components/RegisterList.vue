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
