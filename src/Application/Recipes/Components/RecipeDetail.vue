<template>
  <div class="row" v-if="myRecipe">
    <div class="col-md-12">
      <div class="form-group">
        <label>Nomer Resep</label>
        <input
          type="text"
          class="form-control"
          disabled
          :value="myRecipe.recipe_number"
        >
      </div>
      <div class="form-group">
        <label>Diagnosa</label>
        <textarea
          v-model="myRecipe.diagnosis"
          cols="10"
          rows="5"
          @change="onUpdate"
          class="form-control"
        ></textarea>
      </div>
      <div class="form-group">
        <label>Tindakan</label>
        <textarea
          v-model="myRecipe.action"
          cols="10"
          rows="5"
          @change="onUpdate"
          class="form-control"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecipeDetail',
  props: {
    recipe: Object
  },
  data () {
    return {
      myRecipe: undefined
    }
  },
  methods: {
    onUpdate () {
      this.$emit('onUpdate', this.myRecipe)
    }
  },
  watch: {
    recipe (n, o) {
      this.myRecipe = n
    }
  },
  mounted () {
    this.myRecipe = this.recipe
  }
}
</script>
