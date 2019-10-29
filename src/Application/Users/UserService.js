const ROOT_API = `${process.env.ROOT_API}`
const APP = `users`
const ENDPOINT = `${ROOT_API}/${APP}/`

export default {
  data () {
    return {
      users: [],
      user: undefined,
      paginationUser: {
        next: undefined,
        previous: undefined,
        count: 0
      },
      queryUser: {
        page: 1
      }
    }
  },
  methods: {
    listUser () {
      return this.axios.get(ENDPOINT, {params: this.queryUser})
        .then((response) => {
          this.users = response.data.results
          this.paginationUser.next = response.data.next
          this.paginationUser.previous = response.data.previous
          this.paginationUser.count = response.data.count
        })
    },
    retrieveUser (id) {
      return this.axios.get(`${ENDPOINT}${id}/`)
        .then((response) => {
          this.user = response.data
        })
    },
    updateUser (id, payload) {
      return this.axios.patch(`${ENDPOINT}${id}/`, payload)
        .then((response) => {
          this.user = response.data
        })
    },
    createUser (payload) {
      return this.axios.post(ENDPOINT, payload)
        .then((response) => {
          this.user = response.data
        })
    },
    destroyUser (id) {
      return this.axios.delete(`${ENDPOINT}${id}/`)
        .then((response) => {
          this.user = undefined
        })
    },
    loginUser (payload) {
      const url = `${ROOT_API}/api-token-auth/`
      return this.axios.post(url, payload)
    }
  }
}
