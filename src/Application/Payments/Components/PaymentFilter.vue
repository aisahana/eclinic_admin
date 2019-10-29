<template>
  <div class="row">
    <div class="col-md-12">
      <div class="form-group">
        <input
          type="text"
          v-model="query.search"
          class="form-control"
          @keypress.enter="onFilter"
          placeholder="Cari Pembayaran..."
        >
        <small class="text-muted form-text">
          Pencarian berdasarkan Nomer Pembayaran dan Nomer Resep
        </small>
      </div>
      <div class="form-group">
        <label>Dari Tanggal</label>
        <input
          type="date"
          @change="onFilter"
          v-model="query.start_date"
          class="form-control"
        >
      </div>
      <div class="form-group">
        <label>Sampai Tanggal</label>
        <input
          type="date"
          @change="onFilter"
          v-model="query.end_date"
          class="form-control"
        >
      </div>
      <div class="form-group">
        <input
          type="checkbox"
          @change="onFilter"
          v-model="query.is_paid"
        >
        <label class="form-check-label">
          Lunas
        </label>
      </div>
      <div class="form-group">
        <input
          type="checkbox"
          @change="onFilter"
          v-model="query.is_draft"
        >
        <label
          class="form-check-label"
        >
          Draft
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaymentFilter',
  data () {
    return {
      query: {
        search: '',
        is_paid: false,
        is_draft: false,
        start_date: undefined,
        end_date: undefined
      }
    }
  },
  methods: {
    onFilter () {
      this.$emit('onFilter', this.query)
    }
  }
}
</script>
