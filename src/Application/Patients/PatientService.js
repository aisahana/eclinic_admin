const ROOT_API = `${process.env.ROOT_API}`
const APP = `patients`
const ENDPOINT = `${ROOT_API}/${APP}/`

export default {
  data () {
    return {
      patients: [],
      patient: undefined,
      paginationPatient: {
        next: undefined,
        previous: undefined,
        count: 0
      },
      queryPatient: {
        page: 1
      }
    }
  },
  methods: {
    listPatient () {
      return this.axios.get(ENDPOINT, {params: this.queryPatient})
        .then((response) => {
          this.patients = response.data.results
          this.paginationPatient.next = response.data.next
          this.paginationPatient.previous = response.data.previous
          this.paginationPatient.count = response.data.count
        })
    },
    retrievePatient (id) {
      return this.axios.get(`${ENDPOINT}${id}/`)
        .then((response) => {
          this.patient = response.data
        })
    },
    updatePatient (id, payload) {
      return this.axios.patch(`${ENDPOINT}${id}/`, payload)
        .then((response) => {
          this.patient = response.data
        })
    },
    createPatient (payload) {
      return this.axios.post(ENDPOINT, payload)
        .then((response) => {
          this.patient = response.data
        })
    },
    destroyPatient (id) {
      return this.axios.delete(`${ENDPOINT}${id}/`)
        .then((response) => {
          this.patient = undefined
        })
    },
    publishPatient (id) {
      return this.axios.post(`${ENDPOINT}${id}/publish/`)
        .then((response) => {
          this.patient = response.data
        })
    },
    totalNewPatient () {
      return this.axios.get(`${ENDPOINT}total_new/`)
    },
    visitorPatient () {
      return this.axios.get(`${ENDPOINT}visitor/`)
    },
    reportPatient () {
      return this.axios.get(`${ENDPOINT}report/`, {params: this.queryPatient})
    },
    reportMedicalRecordPatient (id) {
      return this.axios.post(`${ENDPOINT}${id}/report_medical_record/`)
    }
  }
}
