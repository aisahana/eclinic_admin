<template>
  <div v-if="myRegister">
    <div class="row mb-2">
      <div class="form-group col-md-12">
        <label>Nomer Pendaftaran</label>
        <input
          type="text"
          class="form-control"
          disabled
          :value="myRegister.register_number"
        >
      </div>
    </div>
    <div class="row mb-2">
      <div class="form-group col-md-12">
        <label>Keluhan</label>
        <textarea
          v-model="myRegister.complain"
          cols="30"
          rows="10"
          @change="onUpdate"
          class="form-control"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterDetail',
  props: {
    register: Object
  },
  data () {
    return {
      myRegister: undefined
    }
  },
  methods: {
    onUpdate () {
      this.$emit('onUpdate', this.myRegister)
    }
  },
  watch: {
    register (n, o) {
      this.myRegister = n
    }
  },
  mounted () {
    this.myRegister = this.register
  }
}
</script>
