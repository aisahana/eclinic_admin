<template>
  <div v-if="myMedicine" class="row">
    <div class="col-md-12">
      <div class="form-group">
        <label>Nomer Obat</label>
        <input
          disabled
          :value="myMedicine.medicine_number"
          type="text"
          class="form-control"
        >
      </div>
      <div class="form-group">
        <label>Nama Obat</label>
        <input
          v-model="myMedicine.name"
          @change="onUpdate"
          type="text"
          class="form-control"
        >
        <small class="form-text text-muted">
          * Jika kosong, sistem akan mengisi field dengan nilai default
        </small>
      </div>
      <div class="form-group">
        <label>Unit</label>
        <input
          v-model="myMedicine.unit"
          @change="onUpdate"
          type="text"
          class="form-control"
        >
        <small class="form-text text-muted">
          * Jika kosong, sistem akan mengisi field dengan nilai default
        </small>
      </div>
      <div class="form-group">
        <label>Jenis Obat</label>
        <input
          v-model="myMedicine.medicine_type"
          @change="onUpdate"
          placeholder="Cair/Tablet dll.."
          type="text"
          class="form-control"
        >
        <small class="form-text text-muted">
          * Jika kosong, sistem akan mengisi field dengan nilai default
        </small>
      </div>
      <div class="form-group">
        <label>Stok Obat</label>
        <input
          v-model="myMedicine.stock"
          @change="onUpdate"
          type="number"
          class="form-control"
        >
        <small class="form-text text-muted">
          * Jika stok dikosongkan, sistem akan mengisi field dengan nilai default
        </small>
      </div>
      <div class="form-group">
        <label>Harga</label>
        <input
          v-model="myMedicine.price"
          @change="onUpdate"
          type="number"
          class="form-control"
        >
        <small class="form-text text-muted">
          * Jika harga dikosongkan, sistem akan mengisi field dengan nilai default
        </small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MedicineDetail',
  props: {
    medicine: Object
  },
  data () {
    return {
      myMedicine: undefined
    }
  },
  methods: {
    onUpdate () {
      this.$emit('onUpdate', this.myMedicine)
    }
  },
  watch: {
    medicine (n, o) {
      this.myMedicine = n
    }
  },
  mounted () {
    this.myMedicine = this.medicine
  }
}
</script>
