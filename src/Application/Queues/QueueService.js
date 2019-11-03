const ROOT_API = `${process.env.ROOT_API}`
const APP = `queues`
const ENDPOINT = `${ROOT_API}/${APP}/`

export default {
  data () {
    return {
      queues: [],
      queue: undefined,
      paginationQueue: {
        next: undefined,
        previous: undefined,
        count: 0
      },
      queryQueue: {
        page: 1
      }
    }
  },
  methods: {
    listQueue () {
      return this.axios.get(ENDPOINT, {params: this.queryQueue})
        .then((response) => {
          this.queues = response.data.results
          this.paginationQueue.next = response.data.next
          this.paginationQueue.previous = response.data.previous
          this.paginationQueue.count = response.data.count
        })
    },
    retrieveQueue (id) {
      return this.axios.get(`${ENDPOINT}${id}/`)
        .then((response) => {
          this.queue = response.data
        })
    },
    updateQueue (id, payload) {
      return this.axios.patch(`${ENDPOINT}${id}/`, payload)
        .then((response) => {
          this.queue = response.data
        })
    },
    createQueue (payload) {
      return this.axios.post(ENDPOINT, payload)
        .then((response) => {
          this.queue = response.data
        })
    },
    destroyQueue (id) {
      return this.axios.delete(`${ENDPOINT}${id}/`)
        .then((response) => {
          this.queue = undefined
        })
    },
    generateQueue (counter) {
      const payload = {
        counter: counter
      }
      return this.axios.post(`${ENDPOINT}generate/`, payload)
        .then((response) => {
          this.queue = response.data
        })
    },
    nextNumberQueue (id) {
      return this.axios.post(`${ENDPOINT}${id}/next_number/`)
        .then((response) => {
          this.queue = response.data
        })
    }
  }
}
