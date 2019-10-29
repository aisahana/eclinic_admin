const ROOT_API = `${process.env.ROOT_API}`
const APP = `doctors`
const ENDPOINT = `${ROOT_API}/${APP}/`

export default {
  data () {
    return {
      doctors: [],
      doctor: undefined,
      paginationDoctor: {
        next: undefined,
        previous: undefined,
        count: 0
      },
      queryDoctor: {
        page: 1
      }
    }
  },
  methods: {
    listDoctor () {
      return this.axios.get(ENDPOINT, {params: this.queryDoctor})
        .then((response) => {
          this.doctors = response.data.results
          this.paginationDoctor.next = response.data.next
          this.paginationDoctor.previous = response.data.previous
          this.paginationDoctor.count = response.data.count
        })
    },
    retrieveDoctor (id) {
      return this.axios.get(`${ENDPOINT}${id}/`)
        .then((response) => {
          this.doctor = response.data
        })
    },
    updateDoctor (id, payload) {
      return this.axios.patch(`${ENDPOINT}${id}/`, payload)
        .then((response) => {
          this.doctor = response.data
        })
    },
    createDoctor (payload) {
      return this.axios.post(ENDPOINT, payload)
        .then((response) => {
          this.doctor = response.data
        })
    },
    destroyDoctor (id) {
      return this.axios.delete(`${ENDPOINT}${id}/`)
        .then((response) => {
          this.doctor = undefined
        })
    },
    publishDoctor (id) {
      return this.axios.post(`${ENDPOINT}${id}/publish/`)
        .then((response) => {
          this.doctor = response.data
        })
    },
    reportDoctor () {
      return this.axios.get(`${ENDPOINT}report/`, {params: this.queryDoctor})
    }
  }
}
