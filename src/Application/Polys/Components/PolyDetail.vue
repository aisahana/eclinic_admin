<template>
  <div v-if="myPoly" class="row">
    <div class="col-md-12">
      <div class="form-group">
        <label>Nomer Poli</label>
        <input
          :value="myPoly.poly_number"
          type="text"
          class="form-control"
          disabled
        >
      </div>
      <div class="form-group">
        <label>Nama Poli</label>
        <input
          v-model="myPoly.name"
          type="text"
          class="form-control"
          @change="onUpdate"
        >
        <common-text-default />
      </div>
    </div>
  </div>
</template>

<script>
import CommonTextDefault from '@/Commons/CommonTextDefault'

export default {
  name: 'PolyDetail',
  components: {
    'common-text-default': CommonTextDefault
  },
  props: {
    poly: Object
  },
  data () {
    return {
      myPoly: undefined
    }
  },
  methods: {
    onUpdate () {
      this.$emit('onUpdate', this.myPoly)
      this.$bvToast.toast(`Saving...`, {
        title: 'Save Data',
        autoHideDelay: 500,
        append: true,
        toaster: 'b-toaster-bottom-full'
      })
    }
  },
  watch: {
    poly (n, o) {
      this.myPoly = n
    }
  },
  mounted () {
    this.myPoly = this.poly
  }
}
</script>
