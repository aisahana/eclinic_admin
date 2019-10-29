<template>
  <common-layout v-if="recipe" :title="'Resep'">
    <div class="row mb-4">
      <div class="col-md-6">
        <span
          v-if="!recipe.is_checked"
          class="badge badge-warning"
        >
          <i class="fa fa-warning"></i> Dokter belum melakukan diagnosa!
        </span>
        <span
          v-if="recipe.is_checked"
          class="badge badge-success"
        >
          <i class="fa fa-check-circle"></i> Dokter sudah melakukan diagnosa
        </span>
      </div>
      <div class="col-md-6">
        <button
          class="btn btn-primary float-right"
          @click="onCheckedRecipe"
          v-if="!recipe.is_checked"
        >
          Selesai
        </button>
        <button
          class="btn btn-primary float-right"
          @click="onPrintPDF"
        >
          Print PDF
        </button>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-md-6">
        <common-card class="mb-4">
          <span slot="title">Resep</span>
          <recipe-detail slot="content" :recipe="recipe" @onUpdate="onUpdateRecipe" />
        </common-card>
        <div class="mb-4">
          <button
            @click="onModalMedicinePopupSingle"
            v-if="!recipe.is_checked"
            class="btn btn-success">
            Pilih Obat
          </button>
        </div>
        <common-card class="mb-4">
          <span slot="title">Item Obat</span>
          <recipe-item-list
            v-if="!recipe.is_checked"
            slot="content"
            :recipeItems="recipeItems"
            @onSelect="onSelectRecipeItem"
          />
          <recipe-item-list
            v-if="recipe.is_checked"
            slot="content"
            :recipeItems="recipeItems"
          />
        </common-card>
        <common-card class="mb-4">
          <span slot="title">Rincian Harga</span>
          <recipe-sub-total slot="content" :recipe="recipe" />
        </common-card>
      </div>
      <div class="col-md-6">
        <common-card >
          <span slot="title">Registrasi</span>
          <register-info slot="content" v-if="recipe.register" :id="recipe.register" />
          <small slot="content" class="text-danger" v-if="!recipe.register">
            <i class="fa fa-warning"></i> Tidak ada pendaftaran yang terpilih.
          </small>
        </common-card>
        <common-card class="mb-4">
          <span slot="title">Dokter</span>
          <doctor-info slot="content" v-if="recipe.doctor" :id="recipe.doctor" />
          <small slot="content" class="text-danger" v-if="!recipe.doctor">
            <i class="fa fa-warning"></i> Tidak ada dokter yang terpilih.
          </small>
        </common-card>
        <common-card class="mb-4">
          <span slot="title">Pasien</span>
          <patient-info slot="content" v-if="recipe.patient" :id="recipe.patient" />
          <small slot="content" class="text-danger" v-if="!recipe.patient">
            <i class="fa fa-warning"></i> Tidak ada pasien yang terpilih.
          </small>
        </common-card>
      </div>
    </div>
    <!-- modal-medicine-popup-single -->
    <b-modal
      id="modal-MedicinePopupSingle"
      ref="modal-MedicinePopupSingle"
      hide-footer
      hide-header
      size="xl"
    >
      <div class="row mb-2">
        <div class="col-md-6">
          <h5>Daftar Obat</h5>
        </div>
      </div>
      <div class="row mb-2">
        <div class="col-md-12">
          <medicine-popup-single
            :query="queryMedicine"
            @onSelect="onSelectMedicine"
          />
        </div>
      </div>
    </b-modal>
    <!-- ./modal-medicine-popup-single -->
    <!-- modal-recipe-item-popup-single -->
    <b-modal
      id="modal-RecipeItemDetail"
      ref="modal-RecipeItemDetail"
      v-if="recipeItem"
      hide-footer
      hide-header
      size="lg"
    >
      <div class="row mb-2">
        <div class="col-md-6">
          <h5>Item Obat {{ recipeItem.name }}</h5>
        </div>
        <div class="col-md-6">
          <button
            class="btn btn-danger float-right"
            @click="onDestroyRecipeItem"
          >
            Hapus
          </button>
        </div>
      </div>
      <div class="row mb-2">
        <div class="col-md-12">
          <recipe-item-detail
            @onUpdate="onUpdateRecipeItem"
            :recipeItem="recipeItem"
          />
        </div>
      </div>
    </b-modal>
    <!-- ./modal-recipe-item-popup-single -->
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
import RecipeDetail from '@/Application/Recipes/Components/RecipeDetail'
import RecipeSubTotal from '@/Application/Recipes/Components/RecipeSubTotal'

import RecipeItemService from '@/Application/RecipeItems/RecipeItemService'
import RecipeItemList from '@/Application/RecipeItems/Components/RecipeItemList'
import RecipeItemDetail from '@/Application/RecipeItems/Components/RecipeItemDetail'

import RegisterService from '@/Application/Registers/RegisterService'
import RegisterInfo from '@/Application/Registers/Components/RegisterInfo'

import PatientService from '@/Application/Patients/PatientService'
import PatientInfo from '@/Application/Patients/Components/PatientInfo'

import DoctorService from '@/Application/Doctors/DoctorService'
import DoctorInfo from '@/Application/Doctors/Components/DoctorInfo'

import MedicineService from '@/Application/Medicines/MedicineService'
import MedicinePopupSingle from '@/Application/Medicines/Components/MedicinePopupSingle'

import PaymentService from '@/Application/Payments/PaymentService'

export default {
  name: 'RecipeComposeManager',
  components: {
    'common-layout': CommonLayout,
    'common-card': CommonCard,
    'register-info': RegisterInfo,
    'patient-info': PatientInfo,
    'recipe-detail': RecipeDetail,
    'recipe-sub-total': RecipeSubTotal,
    'doctor-info': DoctorInfo,
    'recipe-item-list': RecipeItemList,
    'recipe-item-detail': RecipeItemDetail,
    'medicine-popup-single': MedicinePopupSingle
  },
  mixins: [
    MixinHttp,
    HelperNotify,
    HelperPDF,
    RecipeService,
    RegisterService,
    PatientService,
    DoctorService,
    RecipeItemService,
    MedicineService,
    PaymentService
  ],
  methods: {
    async init () {
      const id = this.$route.params.id
      this.httpInit()
      await this.retrieveRecipe(id)
      this.queryRecipeItem.recipe = id
      this.queryRecipeItem.is_draft = false
      await this.listRecipeItem()
    },
    async onUpdateRecipe (recipe) {
      const payload = {
        diagnosis: recipe.diagnosis,
        action: recipe.action
      }
      await this.updateRecipe(recipe.id, payload)
      await this.init()
    },
    async onSelectRecipeItem (recipeItem) {
      await this.retrieveRecipeItem(recipeItem.id)
      this.$refs['modal-RecipeItemDetail'].show()
    },
    async onSelectMedicine (medicine) {
      try {
        // -----------
        // check stock
        // -----------
        if (medicine.stock <= 0) {
          const yes = await this.confirmAnything(
            `Item ${medicine.name} saat ini kosong.
            Apakah Anda ingin menjadikan ini sebagai
            quantity yang tidak terpenuhi? Jika YES,
            pasien mungkin akan menebus obatnya di apotik lain.`
          )
          if (!yes) {
            return
          }
        }
        // ----------------
        // check item exist
        // ----------------
        const isExists = _.find(
          this.recipeItems,
          (o) => {
            return o.medicine_number === medicine.medicine_number
          }
        )

        if (isExists) {
          this.toastWarning(
            `Item ${medicine.name} telah dimasukan sebelumnya.
            Untuk menambahkan atau mengurangi jumlah / kuantitas,
            silahkan klik item di daftar item obat.`
          )
          return
        }

        const payload = {
          recipe: this.recipe.id,
          medicine: medicine.id,
          name: medicine.name,
          unit: medicine.unit,
          price: medicine.price,
          quantity: 1
        }
        await this.$refs['modal-MedicinePopupSingle'].hide()
        await this.createRecipeItem(payload)
        await this.onSelectRecipeItem(this.recipeItem)
        await this.publishRecipeItem(this.recipeItem.id)
        await this.init()
      } catch (e) {}
    },
    async onUpdateRecipeItem (recipeItem) {
      try {
        await this.retrieveMedicine(recipeItem.medicine)
        const payload = {
          quantity: recipeItem.quantity,
          description: recipeItem.description,
          medicine: recipeItem.medicine,
          is_draft: false
        }
        await this.updateRecipeItem(recipeItem.id, payload)
        await this.init()
      } catch (e) {
      }
    },
    async onModalMedicinePopupSingle () {
      this.queryMedicine.is_draft = false
      await this.$refs['modal-MedicinePopupSingle'].show()
    },
    async onDestroyRecipeItem () {
      const isDestroy = await this.confirmDestroy(this.recipeItem.name)
      if (isDestroy) {
        await this.destroyRecipeItem(this.recipeItem.id)
        await this.init()
        await this.$refs['modal-RecipeItemDetail'].hide()
      }
    },
    async onCheckedRecipe () {
      try {
        await this.checkedRecipe(this.recipe.id)
        if (this.recipe.payment) {
          const payload = {
            amount: this.recipe.total
          }
          await this.updatePayment(this.recipe.payment, payload)
        }
        await this.init()
        await this.downloadInvoicePDF(this.recipe.invoice, this.recipe.recipe_number)
        await this.toastPublish('Diagnosa dan Resep berhasil dibuat!')
      } catch (e) {
        console.log(e)
      }
    },
    async onPrintPDF () {
      await this.downloadInvoicePDF(
        this.recipe.invoice,
        this.recipe.recipe_number
      )
    }
  },
  async mounted () {
    await this.init()
  }
}
</script>

<style>

</style>
