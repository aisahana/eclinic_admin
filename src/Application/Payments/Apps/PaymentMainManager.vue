<template>
  <common-layout :title="'Pembayaran'">
    <div class="row mb-4">
      <div class="col-md-12">
        <button
          class="btn btn-outline-primary float-right"
          @click="onReportPayment"
        >
          Export PDF
        </button>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-md-3">
        <common-card>
          <span slot="title">Pencarian & Filter</span>
          <payment-filter
            @onFilter="onFilterPayment"
            slot="content"
          />
        </common-card>
      </div>
      <div class="col-md-9">
        <common-card>
          <span slot="title">Daftar Pembayaran</span>
          <payment-list
            :payments="payments"
            @onSelect="onSelectPayment"
            slot="content"
          />
        </common-card>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-md-12">
        <b-pagination
          class="float-right"
          v-model="queryPayment.page"
          :total-rows="paginationPayment.count"
          @change="onPaginatePayment"
          :per-page="25"
          aria-controls="my-table"
        >
        </b-pagination>
      </div>
    </div>
    <b-modal
      id="modal-PaymentDetail"
      v-if="payment"
      ref="modal-PaymentDetail"
      hide-footer
      hide-header
      size="lg"
    >
      <div class="row mb-2">
        <div class="col-md-6">
          <h5>Pembayaran</h5>
        </div>
        <div class="col-md-6">
          <button
            class="btn btn-primary float-right"
            @click="onPaidPayment"
            v-if="!payment.is_paid"
          >
            Lunas
          </button>
          <button
            class="btn btn-primary float-right ml-2"
            @click="onPrintPDFPayment"
          >
            Print
          </button>
        </div>
      </div>
      <div class="row mb-2">
        <div class="col-md-12">
          <payment-detail :payment="payment" @onUpdate="onUpdatePayment"/>
        </div>
      </div>
    </b-modal>
  </common-layout>
</template>

<script>
import _ from 'underscore'

import MixinHttp from '@/Mixins/MixinHttp'
import HelperPDF from '@/Helpers/HelperPDF'
import HelperNotify from '@/Helpers/HelperNotify'
import CommonLayout from '@/Commons/CommonLayout'
import CommonCard from '@/Commons/CommonCard'

import PaymentService from '@/Application/Payments/PaymentService'
import PaymentList from '@/Application/Payments/Components/PaymentList'
import PaymentDetail from '@/Application/Payments/Components/PaymentDetail'
import PaymentFilter from '@/Application/Payments/Components/PaymentFilter'

import RegisterService from '@/Application/Registers/RegisterService'

export default {
  name: 'PaymentMainManager',
  components: {
    'common-layout': CommonLayout,
    'common-card': CommonCard,
    'payment-list': PaymentList,
    'payment-detail': PaymentDetail,
    'payment-filter': PaymentFilter
  },
  mixins: [
    MixinHttp,
    HelperNotify,
    HelperPDF,
    PaymentService,
    RegisterService
  ],
  methods: {
    async init () {
      this.httpInit()
      this.queryPayment.is_paid = false
      this.queryPayment.is_draft = false
      this.queryPayment.ordering = '-created'
      await this.listPayment()
    },
    async onSelectPayment (payment) {
      await this.retrievePayment(payment.id)
      await this.$refs['modal-PaymentDetail'].show()
    },
    async onUpdatePayment (payment) {
      if (payment.is_paid) {
        this.toastWarning(
          'Anda tidak bisa melakukan perubahan karena pembayaran telah paid.'
        )
        return
      }
      if (payment.change < 0) {
        this.toastWarning(
          'Pembayaran kurang.'
        )
        return
      }
      const payload = {
        pay: payment.pay,
        change: payment.change
      }
      await this.updatePayment(payment.id, payload)
      await this.init()
    },
    async onPaidPayment () {
      if (this.payment.pay === 0) {
        this.toastWarning(
          'Pembayaran ditolak karena pembayaran masih 0!'
        )
        return
      }
      if (this.payment.change < 0) {
        this.toastWarning(
          'Pembayaran ditolak karena uang tidak mencukupi!'
        )
        return
      }

      await this.paidPayment(this.payment.id)
      // change register close
      await this.closeRegister(this.payment.register)
      await this.init()
      await this.$refs['modal-PaymentDetail'].hide()

      // Print faktur
      await this.downloadInvoicePDF(this.payment.invoice, this.payment.payment_number)
    },
    async onFilterPayment (query) {
      this.queryPayment = _.extend(
        {},
        this.queryPayment,
        query
      )
      await this.listPayment()
    },
    async onPaginatePayment (page) {
      this.queryPayment.page = page
      await this.init()
    },
    async onPrintPDFPayment () {
      // Print faktur
      await this.downloadInvoicePDF(
        this.payment.invoice,
        this.payment.payment_number
      )
    },
    async onReportPayment () {
      const { data } = await this.reportPayment()
      await this.downloadInvoicePDF(data, 'report-pembayaran')
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style>

</style>
