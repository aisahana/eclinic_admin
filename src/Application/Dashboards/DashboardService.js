const ROOT_API = `${process.env.ROOT_API}`
const APP = `dashboards`
const ENDPOINT = `${ROOT_API}/${APP}/`

export default {
  data () {
    return {
      dashboards: [],
      dashboard: undefined,
      paginationDashboard: {
        next: undefined,
        previous: undefined,
        count: 0
      },
      queryDashboard: {
        page: 1
      }
    }
  },
  methods: {
    listDashboard () {
      return this.axios.get(ENDPOINT, {params: this.queryDashboard})
        .then((response) => {
          this.dashboards = response.data.results
          this.paginationDashboard.next = response.data.next
          this.paginationDashboard.previous = response.data.previous
          this.paginationDashboard.count = response.data.count
        })
    },
    retrieveDashboard (id) {
      return this.axios.get(`${ENDPOINT}${id}/`)
        .then((response) => {
          this.dashboard = response.data
        })
    },
    updateDashboard (id, payload) {
      return this.axios.patch(`${ENDPOINT}${id}/`, payload)
        .then((response) => {
          this.dashboard = response.data
        })
    },
    createDashboard (payload) {
      return this.axios.post(ENDPOINT, payload)
        .then((response) => {
          this.dashboard = response.data
        })
    },
    destroyDashboard (id) {
      return this.axios.delete(`${ENDPOINT}${id}/`)
        .then((response) => {
          this.dashboard = undefined
        })
    },
    exportDashboard (prefix) {
      const filename = `${prefix}_${new Date()}_.csv`
      return this.axios({
        url: `${ENDPOINT}export/`,
        method: 'GET',
        responseType: 'blob',
        params: this.queryDashboard
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
