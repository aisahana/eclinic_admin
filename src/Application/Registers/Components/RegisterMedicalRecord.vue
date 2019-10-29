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
  name: 'RegisterMedicalRecord',
  props: {
    registers: Array
  },
  data () {
    return {
      fields: [
        {key: 'date', label: 'Tanggal'},
        {key: 'doctor_name', label: 'Dokter'},
        {key: 'poly_name', label: 'Poli'},
        {key: 'complain', label: 'Keluhan'},
        {key: 'diagnosis', label: 'Diagnosa'},
        {key: 'action', label: 'Tindakan'}
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
