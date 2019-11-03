<template>
  <div v-if="myPatient">
    <div class="row mb-2">
      <div class="form-group col-md-4">
        <label>Nomor Pasien</label>
        <input
          type="text"
          class="form-control"
          :value="myPatient.patient_number"
          disabled
        >
      </div>
      <div class="form-group col-md-4">
        <label>Nama Pasien</label>
        <input
          type="text"
          class="form-control"
          @change="onUpdate"
          v-model="myPatient.name"
        >
        <small class="form-text text-muted">
          * Jika nama kosong, sistem akan mengisi field dengan nilai default
        </small>
      </div>
      <div class="form-group col-md-4">
        <label>Jenis Kelamin</label>
        <select
          v-model="myPatient.gender"
          class="form-control"
          @change="onUpdate"
        >
          <option value="male">Pria</option>
          <option value="female">Wanita</option>
        </select>
        <small class="form-text text-muted">
          * Jika gender kosong, sistem akan mengisi field dengan nilai default
        </small>
      </div>
    </div>
    <div class="row mb-2">
      <div class="form-group col-md-12">
        <label>Alamat</label>
        <textarea
          @change="onUpdate"
          v-model="myPatient.address"
          class="form-control"
        >
        </textarea>
      </div>
    </div>
    <div class="row mb-2">
      <div class="form-group col-md-4">
        <label>Tempat Lahir</label>
        <input
          type="text"
          class="form-control"
          @change="onUpdate"
          v-model="myPatient.place_birth"
        >
        <small class="form-text text-muted">
          * Jika tempat lahir kosong, sistem akan mengisi field dengan nilai default
        </small>
      </div>
      <div class="form-group col-md-4">
        <label>Tanggal Lahir</label>
        <datepicker
          @input="onUpdate"
          :format="'D dsu MMM yyyy'"
          v-model="myPatient.date_birth"
          :language="lang"
        />
        <small class="form-text text-muted">
          * Jika tanggal lahir kosong, sistem akan mengisi field dengan nilai default
        </small>
      </div>
      <div class="form-group col-md-4">
        <label>Umur</label>
        <input
          type="number"
          class="form-control"
          disabled
          :value="myPatient.age"
        >
        <small class="form-text text-muted">
          * Jika umur kosong, sistem akan mengisi field dengan nilai default
        </small>
      </div>
    </div>
    <div class="row mb-2">
      <div class="form-group col-md-4">
        <label>Nomer Telepon</label>
        <input
          type="text"
          class="form-control"
          @change="onUpdate"
          v-model="myPatient.phone"
        >
        <small class="form-text text-muted">
          * Jika nomer telepon kosong, sistem akan mengisi field dengan nilai default
        </small>
      </div>
      <div class="form-group col-md-4">
        <label>Golongan Darah</label>
        <select
          v-model="myPatient.blood"
          class="form-control"
          @change="onUpdate"
        >
          <option value="A">A</option>
          <option value="O">O</option>
          <option value="B">B</option>
          <option value="AB">AB</option>
        </select>
        <small class="form-text text-muted">
          * Jika golongan darah kosong, sistem akan mengisi field dengan nilai default
        </small>
      </div>
      <div class="form-group col-md-4">
        <label>Pekerjaan</label>
        <input
          type="text"
          class="form-control"
          @change="onUpdate"
          v-model="myPatient.occupation"
        >
        <small class="form-text text-muted">
          * Jika pekerjaan kosong, sistem akan mengisi field dengan nilai default
        </small>
      </div>
    </div>
    <div class="row mb-2">
      <div class="form-group col-md-6">
        <label>Agama</label>
        <select
          v-model="myPatient.religion"
          class="form-control"
          @change="onUpdate"
        >
          <option value="muslim">Muslim</option>
          <option value="protestant">Protestant</option>
          <option value="catholic">Katolik</option>
          <option value="hindu">Hindu</option>
          <option value="buddha">Budha</option>
          <option value="conficius">Khonghucu</option>
        </select>
        <small class="form-text text-muted">
          * Jika agama kosong, sistem akan mengisi field dengan nilai default
        </small>
      </div>
      <div class="form-group col-md-6">
        <label>Status Pernikahan</label>
        <select
          v-model="myPatient.marital"
          class="form-control"
          @change="onUpdate"
        >
          <option value="single">Single</option>
          <option value="married">Menikah</option>
          <option value="widow">Janda</option>
          <option value="widower">Duda</option>
        </select>
        <small class="form-text text-muted">
          * Jika status pernikahan kosong, sistem akan mengisi field dengan nilai default
        </small>
      </div>
    </div>
  </div>
</template>

<script>
import {id} from 'vuejs-datepicker/dist/locale'

export default {
  name: 'PatientDetail',
  props: {
    patient: Object
  },
  data () {
    return {
      myPatient: undefined,
      lang: id
    }
  },
  methods: {
    onUpdate () {
      this.$emit('onUpdate', this.myPatient)
    }
  },
  watch: {
    patient (n, o) {
      this.myPatient = n
    }
  },
  mounted () {
    this.myPatient = this.patient
  }
}
</script>
