const ROOT_API = `${process.env.ROOT_API}`
const APP = `medicines`
const ENDPOINT = `${ROOT_API}/${APP}/`

export default {
  data () {
    return {
      medicines: [],
      medicine: undefined,
      paginationMedicine: {
        next: undefined,
        previous: undefined,
        count: 0
      },
      queryMedicine: {
        page: 1
      }
    }
  },
  methods: {
    listMedicine () {
      return this.axios.get(ENDPOINT, {params: this.queryMedicine})
        .then((response) => {
          this.medicines = response.data.results
          this.paginationMedicine.next = response.data.next
          this.paginationMedicine.previous = response.data.previous
          this.paginationMedicine.count = response.data.count
        })
    },
    retrieveMedicine (id) {
      return this.axios.get(`${ENDPOINT}${id}/`)
        .then((response) => {
          this.medicine = response.data
        })
    },
    updateMedicine (id, payload) {
      return this.axios.patch(`${ENDPOINT}${id}/`, payload)
        .then((response) => {
          this.medicine = response.data
        })
    },
    createMedicine (payload) {
      return this.axios.post(ENDPOINT, payload)
        .then((response) => {
          this.medicine = response.data
        })
    },
    destroyMedicine (id) {
      return this.axios.delete(`${ENDPOINT}${id}/`)
        .then((response) => {
          this.medicine = undefined
        })
    },
    publishMedicine (id) {
      return this.axios.post(`${ENDPOINT}${id}/publish/`)
        .then((response) => {
          this.medicine = response.data
        })
    },
    totalUsedMedicine () {
      return this.axios.get(`${ENDPOINT}total_used/`)
    },
    reportMedicine () {
      return this.axios.get(`${ENDPOINT}report/`, {params: this.queryMedicine})
    }
  }
}
