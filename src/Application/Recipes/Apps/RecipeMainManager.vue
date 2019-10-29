<template>
  <common-layout :title="'Resep'">
    <div class="row mb-4">
      <div class="col-md-12">
        <button
          class="btn btn-outline-primary float-right"
          @click="onReportRecipe"
        >
          Export PDF
        </button>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-md-3">
        <common-card>
          <span slot="title">Pencarian & Filter</span>
          <recipe-filter slot="content" @onFilter="onFilterRecipe" />
        </common-card>
      </div>
      <div class="col-md-9">
        <common-card>
          <span slot="title">Daftar Resep</span>
          <recipe-list slot="content" :recipes="recipes" @onSelect="onSelectRecipe" />
        </common-card>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-md-12">
        <b-pagination
          class="float-right"
          v-model="queryRecipe.page"
          :total-rows="paginationRecipe.count"
          @change="onPaginateRecipe"
          :per-page="100"
          aria-controls="my-table"
        >
        </b-pagination>
      </div>
    </div>
  </common-layout>
</template>

<script>
import _ from 'underscore'

import MixinHttp from '@/Mixins/MixinHttp'
import HelperNotify from '@/Helpers/HelperNotify'
import HelperPDF from '@/Helpers/HelperPDF'
import CommonLayout from '@/Commons/CommonLayout'
import CommonCard from '@/Commons/CommonCard'

import RecipeService from '@/Application/Recipes/RecipeService'
import RecipeList from '@/Application/Recipes/Components/RecipeList'
import RecipeFilter from '@/Application/Recipes/Components/RecipeFilter'

export default {
  name: 'RecipeMainManager',
  components: {
    'common-layout': CommonLayout,
    'common-card': CommonCard,
    'recipe-list': RecipeList,
    'recipe-filter': RecipeFilter
  },
  mixins: [
    MixinHttp,
    HelperNotify,
    HelperPDF,
    RecipeService
  ],
  methods: {
    async init () {
      this.httpInit()
      this.queryRecipe.is_draft = false
      this.queryRecipe.is_checked = false
      this.queryRecipe.register__is_open = true
      await this.listRecipe()
    },
    async onSelectRecipe (recipe) {
      await this.retrieveRecipe(recipe.id)
      this.$router.push({
        name: 'RecipeComposeManager',
        params: {
          id: recipe.id
        }
      })
    },
    async onFilterRecipe (query) {
      this.queryRecipe = _.extend(
        {},
        this.queryRecipe,
        query
      )
      await this.listRecipe()
    },
    async onPaginateRecipe (page) {
      this.queryRecipe.page = page
      await this.listRecipe()
    },
    async onReportRecipe () {
      const { data } = await this.reportRecipe()
      await this.downloadInvoicePDF(data, 'report-resep')
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style>

</style>
