const ROOT_API = `${process.env.ROOT_API}`
const APP = `counters`
const ENDPOINT = `${ROOT_API}/${APP}/`

export default {
  data () {
    return {
      counters: [],
      counter: undefined,
      paginationCounter: {
        next: undefined,
        previous: undefined,
        count: 0
      },
      queryCounter: {
        page: 1
      }
    }
  },
  methods: {
    listCounter () {
      return this.axios.get(ENDPOINT, {params: this.queryCounter})
        .then((response) => {
          this.counters = response.data.results
          this.paginationCounter.next = response.data.next
          this.paginationCounter.previous = response.data.previous
          this.paginationCounter.count = response.data.count
        })
    },
    retrieveCounter (id) {
      return this.axios.get(`${ENDPOINT}${id}/`)
        .then((response) => {
          this.counter = response.data
        })
    },
    updateCounter (id, payload) {
      return this.axios.patch(`${ENDPOINT}${id}/`, payload)
        .then((response) => {
          this.counter = response.data
        })
    },
    createCounter (payload) {
      return this.axios.post(ENDPOINT, payload)
        .then((response) => {
          this.counter = response.data
        })
    },
    destroyCounter (id) {
      return this.axios.delete(`${ENDPOINT}${id}/`)
        .then((response) => {
          this.counter = undefined
        })
    },
    publishCounter (id) {
      return this.axios.post(`${ENDPOINT}${id}/publish/`)
    },
    draftCounter (id) {
      return this.axios.post(`${ENDPOINT}${id}/draft/`)
    },
    publicCounter () {
      return this.axios.get(`${ENDPOINT}public/`, {params: this.queryCounter})
        .then((response) => {
          this.counters = response.data
        })
    }
  }
}
