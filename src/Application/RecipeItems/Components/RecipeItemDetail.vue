<template>
  <div v-if="myRecipeItem">
    <div class="row mb-2">
      <div class="form-group col-md-6">
        <label>Nomer Obat</label>
        <input
          type="text"
          class="form-control"
          disabled
          :value="myRecipeItem.medicine_number"
        >
      </div>
      <div class="form-group col-md-6">
        <label>Nama Obat</label>
        <input
          type="text"
          class="form-control"
          disabled
          :value="myRecipeItem.name"
        >
      </div>
    </div>
    <div class="row mb-2">
      <div class="form-group col-md-4">
        <label>Unit</label>
        <input
          type="text"
          class="form-control"
          disabled
          :value="myRecipeItem.unit"
        >
      </div>
      <div class="form-group col-md-4">
        <label>Harga</label>
        <input
          type="text"
          class="form-control"
          disabled
          :value="myRecipeItem.price"
        >
      </div>
      <div class="form-group col-md-4">
        <label>Jumlah</label>
        <input
          type="number"
          class="form-control"
          @change="onUpdate"
          v-model="myRecipeItem.quantity"
        >
      </div>
    </div>
    <div class="row mb-2">
      <div class="form-group col-md-12">
        <label>Keterangan Obat</label>
        <textarea
          v-model="myRecipeItem.description"
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
  name: 'RecipeItemDetail',
  props: {
    recipeItem: Object
  },
  data () {
    return {
      myRecipeItem: undefined
    }
  },
  methods: {
    onUpdate () {
      this.$emit('onUpdate', this.myRecipeItem)
    }
  },
  watch: {
    recipeItem (n, o) {
      this.myRecipeItem = n
    }
  },
  mounted () {
    this.myRecipeItem = this.recipeItem
  }
}
</script>
