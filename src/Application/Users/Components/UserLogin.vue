<template>
  <div class="row">
    <div class="col-md-12">
      <div class="form-group">
        <label>Username</label>
        <input
          type="text"
          v-model="myUser.username"
          @keypress.enter="onLogin"
          class="form-control"
        >
      </div>
      <div class="form-group">
        <label>Password</label>
        <input
          type="password"
          v-model="myUser.password"
          @keypress.enter="onLogin"
          class="form-control"
        >
      </div>
      <div class="form-group">
        <button
          @click="onLogin"
          class="btn btn-primary btn-fill"
        >
          Login
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserLogin',
  data () {
    return {
      myUser: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    onLogin () {
      this.$emit('onLogin', this.myUser)
    }
  }
}
</script>

<style>

</style>
