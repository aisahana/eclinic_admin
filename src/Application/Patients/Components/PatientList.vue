<template>
  <div class="row">
    <div v-if="patients.length > 0" class="col-md-12">
      <b-table
        striped
        hover
        :items="patients"
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
    <div v-if="patients.length <= 0" class="col-md-12">
      <p>No Data...</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PatientList',
  props: {
    patients: Array
  },
  data () {
    return {
      fields: [
        {key: 'patient_number', label: 'Nomer Pasien'},
        {key: 'name', label: 'Nama'},
        {key: 'date_birth', label: 'Tanggal Lahir'},
        {key: 'blood', label: 'Golongan Darah'},
        {key: 'occupation', label: 'Pekerjaan'},
        {key: 'is_draft', label: 'Draft'}
      ]
    }
  },
  methods: {
    onSelect (patient) {
      this.$emit('onSelect', patient)
    }
  }
}
</script>
