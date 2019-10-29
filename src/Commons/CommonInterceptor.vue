<template>
  <span id="autosaveStatus">
    <span
      v-if="message"
      id="autosaveStatus"
      class="badge badge-light text-secondary ml-2"
    >
      <b-spinner
        v-if="green"
        variant="success"
        small
        label="Process..."
      >
      </b-spinner>
      {{ message }}
    </span>
    <span
      v-if="messageUpdate"
      id="autosaveStatus"
      class="badge badge-warning ml-2"
    >
      <b-spinner
        v-if="green"
        variant="light"
        type="grow"
        small
        label="Process..."
      >
      </b-spinner>
      {{ messageUpdate }}
    </span>
  </span>
</template>

<script>
import HelperError from '@/Helpers/HelperError'

export default {
  name: 'CommonInterceptor',
  mixins: [
    HelperError
  ],
  data () {
    return {
      message: '',
      messageUpdate: '',
      green: false
    }
  },
  methods: {
    // TODO: [1] Only one call interceptor object
    // ------------------------------------------
    // This axios interceptor can multiple
    // invoke. please update your code for
    // cleaning interceptors.
    // ------------------------------------------
    intercept () {
      // Add a request interceptor
      this.axios.interceptors.request.use((config) => {
        // Do something before request is sent
        return config
      }, (error) => {
        // Do something with request error
        setTimeout(() => { this.message = '' }, 1000)
        return Promise.reject(error)
      })
      // Add a response interceptor
      this.axios.interceptors.response.use((response) => {
        this.setMessage(response.config.method)
        return response
      }, (error) => {
        setTimeout(() => { this.message = '' }, 1400)
        this.errorHandler(error)
        return Promise.reject(error)
      })
    },
    setMessage (method) {
      this.green = true
      if (method === 'post' ||
          method === 'put' ||
          method === 'patch') {
        this.messageUpdate = `is changing data`
        setTimeout(() => { this.messageUpdate = '' }, 1400)
      } else {
        this.message = 'loading...'
        setTimeout(() => {
          this.message = ''
        }, 1400)
      }
      setTimeout(() => {
        this.green = false
      }, 1400)
    }
  },
  mounted () {
    this.intercept()
  }
}
</script>

<style>
#autosaveStatus {
  /* position: absolute; */
  padding: 2px;
  bottom: 0px;
  font-size: small;
}
</style>
