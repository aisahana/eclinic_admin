<template>
  <div class="row">
    <div class="col-md-12">
      <div class="form-group">
        <input
          @keypress.enter="onFilter"
          v-model="query.search"
          type="text"
          class="form-control"
          placeholder="Cari Resep..."
        >
        <small class="form-text text-muted">
          Pencarian berdasarkan Nomer Resep,
          Nomer Registrasi, Nomer Dokter, Nama Dokter,
          Nomer Pasien dan Nama Pasien
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
          v-model="query.is_checked"
        >
        <label
          class="form-check-label"
        >
          Sudah Diperiksa
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
  name: 'RecipeFilter',
  data () {
    return {
      query: {
        search: '',
        is_draft: false,
        is_checked: false,
        register__is_open: true,
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
