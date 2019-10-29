const ROOT_API = `${process.env.ROOT_API}`
const APP = `payments`
const ENDPOINT = `${ROOT_API}/${APP}/`

export default {
  data () {
    return {
      payments: [],
      payment: undefined,
      paginationPayment: {
        next: undefined,
        previous: undefined,
        count: 0
      },
      queryPayment: {
        page: 1
      }
    }
  },
  methods: {
    listPayment () {
      return this.axios.get(ENDPOINT, {params: this.queryPayment})
        .then((response) => {
          this.payments = response.data.results
          this.paginationPayment.next = response.data.next
          this.paginationPayment.previous = response.data.previous
          this.paginationPayment.count = response.data.count
        })
    },
    retrievePayment (id) {
      return this.axios.get(`${ENDPOINT}${id}/`)
        .then((response) => {
          this.payment = response.data
        })
    },
    updatePayment (id, payload) {
      return this.axios.patch(`${ENDPOINT}${id}/`, payload)
        .then((response) => {
          this.payment = response.data
        })
    },
    createPayment (payload) {
      return this.axios.post(ENDPOINT, payload)
        .then((response) => {
          this.payment = response.data
        })
    },
    destroyPayment (id) {
      return this.axios.delete(`${ENDPOINT}${id}/`)
        .then((response) => {
          this.payment = undefined
        })
    },
    publishPayment (id) {
      return this.axios.post(`${ENDPOINT}${id}/publish/`)
        .then((response) => {
          this.payment = response.data
        })
    },
    paidPayment (id) {
      return this.axios.post(`${ENDPOINT}${id}/paid/`)
        .then((response) => {
          this.payment = response.data
        })
    },
    totalSalePayment () {
      return this.axios.get(`${ENDPOINT}total_sale/`)
    },
    reportPayment () {
      return this.axios.get(`${ENDPOINT}report/`, {params: this.queryPayment})
    }
  }
}
