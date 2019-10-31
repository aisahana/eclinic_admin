<template>
  <div class="row">
    <div v-if="doctors.length > 0" class="col-md-12">
      <b-table
        striped
        hover
        :items="doctors"
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
    <div v-if="doctors.length <= 0" class="col-md-12">
      <p>No Data...</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DoctorList',
  props: {
    doctors: Array
  },
  data () {
    return {
      fields: [
        {key: 'doctor_number', label: 'Nomer Dokter'},
        {key: 'name', label: 'Nama'},
        {key: 'phone', label: 'Telepon'},
        {key: 'poly_name', label: 'Poli'},
        {key: 'is_draft', label: 'Draft'}
      ]
    }
  },
  methods: {
    onSelect (doctor) {
      this.$emit('onSelect', doctor)
    }
  }
}
</script>
