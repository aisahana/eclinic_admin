<template>
  <div class="row">
    <div class="col-md-12">
      <div class="form-group">
        <input
          @keypress.enter="onFilter"
          v-model="query.search"
          type="text"
          class="form-control"
          placeholder="Cari poli..."
        />
        <small class="form-text text-muted">
          Pencarian berdasarkan nomer poli atau nama poli
        </small>
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
  name: 'PolyFilter',
  data () {
    return {
      query: {
        search: '',
        is_draft: false
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
