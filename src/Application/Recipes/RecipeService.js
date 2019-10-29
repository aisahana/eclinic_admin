const ROOT_API = `${process.env.ROOT_API}`
const APP = `recipes`
const ENDPOINT = `${ROOT_API}/${APP}/`

export default {
  data () {
    return {
      recipes: [],
      recipe: undefined,
      paginationRecipe: {
        next: undefined,
        previous: undefined,
        count: 0
      },
      queryRecipe: {
        page: 1
      }
    }
  },
  methods: {
    listRecipe () {
      return this.axios.get(ENDPOINT, {params: this.queryRecipe})
        .then((response) => {
          this.recipes = response.data.results
          this.paginationRecipe.next = response.data.next
          this.paginationRecipe.previous = response.data.previous
          this.paginationRecipe.count = response.data.count
        })
    },
    retrieveRecipe (id) {
      return this.axios.get(`${ENDPOINT}${id}/`)
        .then((response) => {
          this.recipe = response.data
        })
    },
    updateRecipe (id, payload) {
      return this.axios.patch(`${ENDPOINT}${id}/`, payload)
        .then((response) => {
          this.recipe = response.data
        })
    },
    createRecipe (payload) {
      return this.axios.post(ENDPOINT, payload)
        .then((response) => {
          this.recipe = response.data
        })
    },
    destroyRecipe (id) {
      return this.axios.delete(`${ENDPOINT}${id}/`)
        .then((response) => {
          this.recipe = undefined
        })
    },
    publishRecipe (id) {
      return this.axios.post(`${ENDPOINT}${id}/publish/`)
        .then((response) => {
          this.recipe = response.data
        })
    },
    checkedRecipe (id) {
      return this.axios.post(`${ENDPOINT}${id}/checked/`)
        .then((response) => {
          this.recipe = response.data
        })
    },
    reportRecipe () {
      return this.axios.get(`${ENDPOINT}report/`, {params: this.queryRecipe})
    }
  }
}
