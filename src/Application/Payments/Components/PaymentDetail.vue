<template>
  <div v-if="myPayment">
    <div class="row mb-2">
      <div class="form-group col-md-6">
        <label>Nomer Pembayaran</label>
        <input
          type="text"
          class="form-control"
          disabled
          :value="myPayment.payment_number"
        >
      </div>
      <div class="form-group col-md-6">
        <label>Nomer Resep</label>
        <input
          type="text"
          class="form-control"
          disabled
          :value="myPayment.recipe_number"
        >
      </div>
    </div>
    <div class="row mb-2">
      <div class="form-group col-md-4">
        <label>Jumlah Bayar</label>
        <input
          type="number"
          class="form-control"
          disabled
          :value="myPayment.amount"
        >
      </div>
      <div class="form-group col-md-4">
        <label>Dibayar</label>
        <input
          type="number"
          class="form-control"
          v-model="myPayment.pay"
          @change="onUpdate"
        >
      </div>
      <div class="form-group col-md-4">
        <label>Kembalian</label>
        <input
          type="number"
          class="form-control"
          disabled
          :value="myPayment.change"
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaymentDetail',
  props: {
    payment: Object
  },
  data () {
    return {
      myPayment: undefined
    }
  },
  methods: {
    onUpdate () {
      this.$emit('onUpdate', this.myPayment)
    }
  },
  watch: {
    payment (n, o) {
      this.myPayment = n
    },
    'myPayment.pay' (n, o) {
      this.myPayment.change = this.myPayment.pay - this.myPayment.amount
    }
  },
  mounted () {
    this.myPayment = this.payment
  }
}
</script>
