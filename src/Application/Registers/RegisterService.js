const ROOT_API = `${process.env.ROOT_API}`
const APP = `registers`
const ENDPOINT = `${ROOT_API}/${APP}/`

export default {
  data () {
    return {
      registers: [],
      register: undefined,
      paginationRegister: {
        next: undefined,
        previous: undefined,
        count: 0
      },
      queryRegister: {
        page: 1
      }
    }
  },
  methods: {
    listRegister () {
      return this.axios.get(ENDPOINT, {params: this.queryRegister})
        .then((response) => {
          this.registers = response.data.results
          this.paginationRegister.next = response.data.next
          this.paginationRegister.previous = response.data.previous
          this.paginationRegister.count = response.data.count
        })
    },
    retrieveRegister (id) {
      return this.axios.get(`${ENDPOINT}${id}/`)
        .then((response) => {
          this.register = response.data
        })
    },
    updateRegister (id, payload) {
      return this.axios.patch(`${ENDPOINT}${id}/`, payload)
        .then((response) => {
          this.register = response.data
        })
    },
    createRegister (payload) {
      return this.axios.post(ENDPOINT, payload)
        .then((response) => {
          this.register = response.data
        })
    },
    destroyRegister (id) {
      return this.axios.delete(`${ENDPOINT}${id}/`)
        .then((response) => {
          this.register = undefined
        })
    },
    publishRegister (id) {
      return this.axios.post(`${ENDPOINT}${id}/publish/`)
        .then((response) => {
          this.register = response.data
        })
    },
    checkPatientRegister (patientId) {
      const payload = {
        patient_id: patientId
      }
      return this.axios.post(`${ENDPOINT}check_patient/`, payload)
    },
    totalOpenRegister () {
      return this.axios.get(`${ENDPOINT}total_open/`)
    },
    closeRegister (id) {
      return this.axios.post(`${ENDPOINT}${id}/close/`)
        .then((response) => {
          this.register = response.data
        })
    },
    reportRegister () {
      return this.axios.get(`${ENDPOINT}report/`, {params: this.queryRegister})
    }
  }
}
