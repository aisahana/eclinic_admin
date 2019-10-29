export default {
  methods: {
    errorHandler (error) {
      if (error.response.status === 400) {
        if (Array.isArray(error.response.data)) {
          for (let msg in error.response.data) {
            const message = error.response.data[msg]
            this.$bvToast.toast(message, {
              title: 'Ups',
              variant: 'warning',
              solid: true
            })
          }
        } else {
          for (let key in error.response.data) {
            const message = error.response.data[key].join()
            this.$bvToast.toast(message, {
              title: key,
              variant: 'warning',
              solid: true
            })
          }
        }
      } else if (error.response.status === 401) {
        const message = 'Please login!'
        this.$bvToast.toast(message, {
          title: 'Login Required',
          variant: 'warning',
          solid: true
        })
      } else if (error.response.status === 404) {
        const message = error.response.data.detail
        this.$bvToast.toast(message, {
          title: 'Not Found',
          variant: 'light',
          solid: true
        })
      } else if (error.response.status === 500) {
        this.$bvToast.toast('Please contact me when you found this error.', {
          title: 'Error 500',
          variant: 'danger',
          solid: true
        })
      } else if (error.response.status === 403) {
        const message = error.response.data.detail
        this.$bvToast.toast(message, {
          title: 'Ups',
          variant: 'warning',
          solid: true
        })
      }
    }
  }
}
