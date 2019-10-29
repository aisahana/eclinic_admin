const ROOT_API = `${process.env.ROOT_API}`
const APP = `recipe-items`
const ENDPOINT = `${ROOT_API}/${APP}/`

export default {
  data () {
    return {
      recipeItems: [],
      recipeItem: undefined,
      paginationRecipeItem: {
        next: undefined,
        previous: undefined,
        count: 0
      },
      queryRecipeItem: {
        page: 1
      }
    }
  },
  methods: {
    listRecipeItem () {
      return this.axios.get(ENDPOINT, {params: this.queryRecipeItem})
        .then((response) => {
          this.recipeItems = response.data.results
          this.paginationRecipeItem.next = response.data.next
          this.paginationRecipeItem.previous = response.data.previous
          this.paginationRecipeItem.count = response.data.count
        })
    },
    retrieveRecipeItem (id) {
      return this.axios.get(`${ENDPOINT}${id}/`)
        .then((response) => {
          this.recipeItem = response.data
        })
    },
    updateRecipeItem (id, payload) {
      return this.axios.patch(`${ENDPOINT}${id}/`, payload)
        .then((response) => {
          this.recipeItem = response.data
        })
    },
    createRecipeItem (payload) {
      return this.axios.post(ENDPOINT, payload)
        .then((response) => {
          this.recipeItem = response.data
        })
    },
    publishRecipeItem (id) {
      return this.axios.post(`${ENDPOINT}${id}/publish/`)
        .then((response) => {
          this.recipeItem = response.data
        })
    },
    destroyRecipeItem (id) {
      return this.axios.delete(`${ENDPOINT}${id}/`)
        .then((response) => {
          this.recipeItem = undefined
        })
    },
    exportRecipeItem (prefix) {
      const filename = `${prefix}_${new Date()}_.csv`
      return this.axios({
        url: `${ENDPOINT}export/`,
        method: 'GET',
        responseType: 'blob',
        params: this.queryRecipeItem
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
