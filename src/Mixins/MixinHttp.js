export default {
  methods: {
    httpInit () {
      const token = localStorage.getItem('token')
      this.axios.defaults.headers.common = {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      }
    }
  }
}
