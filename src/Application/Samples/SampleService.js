const ROOT_API = `${process.env.ROOT_API}`
const APP = `samples`
const ENDPOINT = `${ROOT_API}/${APP}/`

export default {
  data () {
    return {
      samples: [],
      sample: undefined,
      paginationSample: {
        next: undefined,
        previous: undefined,
        count: 0
      },
      querySample: {
        page: 1
      }
    }
  },
  methods: {
    listSample () {
      return this.axios.get(ENDPOINT, {params: this.querySample})
        .then((response) => {
          this.samples = response.data.results
          this.paginationSample.next = response.data.next
          this.paginationSample.previous = response.data.previous
          this.paginationSample.count = response.data.count
        })
    },
    retrieveSample (id) {
      return this.axios.get(`${ENDPOINT}${id}/`)
        .then((response) => {
          this.sample = response.data
        })
    },
    updateSample (id, payload) {
      return this.axios.patch(`${ENDPOINT}${id}/`, payload)
        .then((response) => {
          this.sample = response.data
        })
    },
    createSample (payload) {
      return this.axios.post(ENDPOINT, payload)
        .then((response) => {
          this.sample = response.data
        })
    },
    destroySample (id) {
      return this.axios.delete(`${ENDPOINT}${id}/`)
        .then((response) => {
          this.sample = undefined
        })
    },
    exportSample (prefix) {
      const filename = `${prefix}_${new Date()}_.csv`
      return this.axios({
        url: `${ENDPOINT}export/`,
        method: 'GET',
        responseType: 'blob',
        params: this.querySample
      })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', filename)
          document.body.appendChild(link)
          link.click()
        })
    }
  }
}
