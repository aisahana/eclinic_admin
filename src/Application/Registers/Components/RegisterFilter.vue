<template>
  <div class="row">
    <div class="col-md-12">
      <div class="form-group">
        <input
          @keypress.enter="onFilter"
          v-model="query.search"
          type="text"
          class="form-control"
        >
        <small class="form-text text-muted">
          Pencarian berdasarkan Nomer Pendaftaran,
          Nomer Dokter, Nama Dokter, Nomer Pasien,
          Nama Pasien, Nomer Poli dan Nama Poli
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
          v-model="query.is_draft"
        >
        <label
          class="form-check-label"
        >
          Draft
        </label>
      </div>
      <div class="form-group">
        <input
          type="checkbox"
          @change="onFilter"
          v-model="query.is_open"
        >
        <label
          class="form-check-label"
        >
          Registrasi Baru
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterFilter',
  data () {
    return {
      query: {
        search: '',
        is_draft: false,
        is_open: true,
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
