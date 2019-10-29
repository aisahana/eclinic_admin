<template>
  <common-layout :title="'Pendaftaran'">
    <div class="row mb-4">
      <div class="col-md-12">
        <button
          @click="onCreateRegister"
          class="btn btn-primary float-right ml-2"
        >
          Daftar Baru
        </button>
        <button
          @click="onReportRegister"
          class="btn btn-outline-primary float-right ml-2"
        >
          Export PDF
        </button>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-md-3">
        <common-card>
          <span slot="title">Pencarian & Filter</span>
          <register-filter slot="content" @onFilter="onFilterRegister" />
        </common-card>
      </div>
      <div class="col-md-9">
        <common-card>
          <span slot="title">Daftar Pendaftaran</span>
          <register-list slot="content" :registers="registers" @onSelect="onSelectRegister" />
        </common-card>
      </div>
    </div>
    <div v-if="paginationRegister.count > 0" class="row mb-4">
      <div class="col-md-12">
        <b-pagination
          class="float-right"
          v-model="queryRegister.page"
          :total-rows="paginationRegister.count"
          @change="onPaginateRegister"
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

import RegisterService from '@/Application/Registers/RegisterService'
import RegisterList from '@/Application/Registers/Components/RegisterList'
import RegisterFilter from '@/Application/Registers/Components/RegisterFilter'

import RecipeService from '@/Application/Recipes/RecipeService'

import PaymentService from '@/Application/Payments/PaymentService'

export default {
  name: 'RegisterMainManager',
  components: {
    'common-layout': CommonLayout,
    'common-card': CommonCard,
    'register-list': RegisterList,
    'register-filter': RegisterFilter
  },
  mixins: [
    MixinHttp,
    HelperNotify,
    HelperPDF,
    RegisterService,
    RecipeService,
    PaymentService
  ],
  methods: {
    init () {
      this.httpInit()
      this.queryRegister.is_open = true
      this.queryRegister.is_draft = false
      this.listRegister()
    },
    async onPaginateRegister (page) {
      this.queryRegister.page = page
      await this.listRegister()
    },
    async onCreateRegister () {
      await this.createRegister()

      const payloadRecipe = {
        register: this.register.id,
        is_draft: this.register.is_draft
      }
      await this.createRecipe(payloadRecipe)

      const payloadPayment = {
        recipe: this.recipe.id,
        is_draft: this.recipe.is_draft
      }
      await this.createPayment(payloadPayment)

      this.$router.push({
        name: 'RegisterComposeManager',
        params: {
          id: this.register.id
        }
      })
    },
    async onSelectRegister (register) {
      await this.retrieveRegister(register.id)
      this.$router.push({
        name: 'RegisterComposeManager',
        params: {
          id: this.register.id
        }
      })
    },
    async onFilterRegister (query) {
      this.queryRegister = _.extend(
        {},
        this.queryRegister,
        query
      )
      await this.listRegister()
    },
    async onReportRegister () {
      const { data } = await this.reportRegister()
      await this.downloadInvoicePDF(data, 'report-register')
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style>

</style>
