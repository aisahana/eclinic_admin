<template>
  <div v-if="recipe">
    <common-info :obj="recipe" :fields="[]"/>
  </div>
</template>

<script>
import MixinHttp from '@/Mixins/MixinHttp'
import CommonInfo from '@/Commons/CommonInfo'
import RecipeService from '@/Application/Recipes/RecipesService'

export default {
  name: 'RecipeInfo',
  components: {
    'common-info': CommonInfo
  },
  mixins: [
    MixinHttp,
    RecipesService
  ],
  props: {
    id: Number
  },
  methods: {
    init () {
      if (this.id) {
        this.httpInit()
        this.retrieveRecipes(this.id)
      }
    }
  },
  watch: {
    id (n, o) {
      this.init()
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style>

</style>
