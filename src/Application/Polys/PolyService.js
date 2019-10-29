const ROOT_API = `${process.env.ROOT_API}`
const APP = `polys`
const ENDPOINT = `${ROOT_API}/${APP}/`

export default {
  data () {
    return {
      polys: [],
      poly: undefined,
      paginationPoly: {
        next: undefined,
        previous: undefined,
        count: 0
      },
      queryPoly: {
        page: 1
      }
    }
  },
  methods: {
    listPoly () {
      return this.axios.get(ENDPOINT, {params: this.queryPoly})
        .then((response) => {
          this.polys = response.data.results
          this.paginationPoly.next = response.data.next
          this.paginationPoly.previous = response.data.previous
          this.paginationPoly.count = response.data.count
        })
    },
    retrievePoly (id) {
      return this.axios.get(`${ENDPOINT}${id}/`)
        .then((response) => {
          this.poly = response.data
        })
    },
    updatePoly (id, payload) {
      return this.axios.patch(`${ENDPOINT}${id}/`, payload)
        .then((response) => {
          this.poly = response.data
        })
    },
    createPoly (payload) {
      return this.axios.post(ENDPOINT, payload)
        .then((response) => {
          this.poly = response.data
        })
    },
    destroyPoly (id) {
      return this.axios.delete(`${ENDPOINT}${id}/`)
        .then((response) => {
          this.poly = undefined
        })
    },
    publishPoly (id) {
      return this.axios.post(`${ENDPOINT}${id}/publish/`)
        .then((response) => {
          this.poly = response.data
        })
    },
    reportPoly () {
      return this.axios.get(`${ENDPOINT}report/`, {params: this.queryPoly})
    }
  }
}
