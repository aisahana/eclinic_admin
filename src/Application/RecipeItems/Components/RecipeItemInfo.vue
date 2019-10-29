<template>
  <div v-if="recipeItem">
    <common-info :obj="recipeItem" :fields="[]"/>
  </div>
</template>

<script>
import MixinHttp from '@/Mixins/MixinHttp'
import CommonInfo from '@/Commons/CommonInfo'
import RecipeItemService from '@/Application/RecipeItems/RecipeItemService'

export default {
  name: 'RecipeItemInfo',
  components: {
    'common-info': CommonInfo
  },
  mixins: [
    MixinHttp,
    RecipeItemService
  ],
  props: {
    id: Number
  },
  methods: {
    init () {
      if (this.id) {
        this.httpInit()
        this.retrieveRecipeItem(this.id)
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
