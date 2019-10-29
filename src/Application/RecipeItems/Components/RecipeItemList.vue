<template>
  <div class="row">
    <div v-if="recipeItems.length > 0" class="col-md-12">
      <b-table
        striped
        hover
        :items="recipeItems"
        :fields="fields"
        @row-clicked="onSelect"
        responsive
      >
        <div slot="table-busy" class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </b-table>
    </div>
    <div v-if="recipeItems.length <= 0" class="col-md-12">
      <p>No Data...</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecipeItemList',
  props: {
    recipeItems: Array
  },
  data () {
    return {
      fields: [
        {key: 'medicine_number', label: 'Nomer Obat'},
        {key: 'name', label: 'Nama Obat'},
        {key: 'price', label: 'Harga Obat'},
        {key: 'quantity', label: 'Jumlah'},
        {key: 'unfulfilled', label: 'Tidak Terpenuhi'},
        {key: 'total', label: 'Total'}
      ]
    }
  },
  methods: {
    onSelect (recipeItem) {
      this.$emit('onSelect', recipeItem)
    },
    onDoubleClick (recipeItem) {
      this.$emit('onDoubleClick', recipeItem)
    },
    onDestroy (recipeItem) {
      this.$emit('onDestroy', recipeItem)
    }
  }
}
</script>
