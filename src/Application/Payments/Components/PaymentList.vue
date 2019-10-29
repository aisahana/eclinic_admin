<template>
  <div class="row">
    <div v-if="payments.length > 0" class="col-md-12">
      <b-table
        striped
        hover
        :items="payments"
        :fields="fields"
        @row-clicked="onSelect"
      >
        <div slot="table-busy" class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </b-table>
    </div>
    <div v-if="payments.length <= 0" class="col-md-12">
      <p>No Data...</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaymentList',
  props: {
    payments: Array
  },
  data () {
    return {
      fields: [
        {key: 'payment_number', label: 'Nomer Pembayaran'},
        {key: 'recipe_number', label: 'Nomer Resep'},
        {key: 'patient_name', label: 'Pasien'},
        {key: 'amount', label: 'Jumlah'},
        {key: 'pay', label: 'Dibayar'},
        {key: 'change', label: 'Kembalian'},
        {key: 'is_paid', label: 'Lunas?'},
        {key: 'is_draft', label: 'Draft'}
      ]
    }
  },
  methods: {
    onSelect (payment) {
      this.$emit('onSelect', payment)
    }
  }
}
</script>
