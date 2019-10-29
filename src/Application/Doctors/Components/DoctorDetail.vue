<template>
  <div v-if="myDoctor">
    <div class="row mb-2">
      <div class="form-group col-md-6">
        <label>Nomer Dokter</label>
        <input
          disabled
          :value="myDoctor.doctor_number"
          type="text"
          class="form-control"
        >
      </div>
    </div>
    <div class="row mb-2">
      <div class="form-group col-md-6">
        <label>Nama Dokter</label>
        <input
          @change="onUpdate"
          v-model="myDoctor.name"
          type="text"
          class="form-control"
        >
        <small class="form-text text-muted">
          * Jika kosong, sistem akan mengisi field dengan nilai default
        </small>
      </div>
      <div class="form-group col-md-6">
        <label>Gender</label>
        <select v-model="myDoctor.gender" class="form-control">
          <option value="male">Pria</option>
          <option value="female">Wanita</option>
        </select>
        <small class="form-text text-muted">
          * Jika kosong, sistem akan mengisi field dengan nilai default
        </small>
      </div>
    </div>
    <div class="row mb-2">
      <div class="form-group col-md-6">
        <label>Nomer Telepon</label>
        <input
          @change="onUpdate"
          v-model="myDoctor.phone"
          type="text"
          class="form-control"
        >
        <small class="form-text text-muted">
          * Jika kosong, sistem akan mengisi field dengan nilai default
        </small>
      </div>
      <div class="form-group col-md-6">
        <label>Tarif Dokter</label>
        <input
          @change="onUpdate"
          v-model="myDoctor.price"
          type="number"
          class="form-control"
        >
        <small class="form-text text-muted">
          * Jika kosong, sistem akan mengisi field dengan nilai default
        </small>
      </div>
    </div>
    <div class="row mb-2">
      <div class="form-group col-md-12">
        <label>Alamat</label>
        <textarea
          class="form-control"
          cols="30"
          rows="10"
          @change="onUpdate"
          v-model="myDoctor.address"
        >
        </textarea>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DoctorDetail',
  props: {
    doctor: Object
  },
  data () {
    return {
      myDoctor: undefined
    }
  },
  methods: {
    onUpdate () {
      this.$emit('onUpdate', this.myDoctor)
    }
  },
  watch: {
    doctor (n, o) {
      this.myDoctor = n
    }
  },
  mounted () {
    this.myDoctor = this.doctor
  }
}
</script>
