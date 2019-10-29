<template>
  <div class="row" style="margin-top: 100px;">
    <div class="col-md-4"></div>
    <div class="col-md-4">
      <div class="card">
        <div class="card-header">
          <h4 class="card-title text-primary">
            <common-interceptor /> Login - eClinic
          </h4>
        </div>
        <div class="card-body">
          <user-login @onLogin="onLoginUser" />
        </div>
      </div>
    </div>
    <div class="col-md-4"></div>
  </div>
</template>

<script>
import CommonInterceptor from '@/Commons/CommonInterceptor'
import UserService from '@/Application/Users/UserService'
import UserLogin from '@/Application/Users/Components/UserLogin'

export default {
  name: 'UserLoginManager',
  components: {
    'user-login': UserLogin,
    'common-interceptor': CommonInterceptor
  },
  mixins: [
    UserService
  ],
  methods: {
    onLoginUser (user) {
      this.loginUser(user)
        .then((response) => {
          const data = response.data
          localStorage.setItem('token', data.token)
          localStorage.setItem('user_id', data.user_id)
          localStorage.setItem('username', data.username)
          localStorage.setItem('email', data.email)
          this.$router.push({
            name: 'DashboardMainManager'
          })
        })
    }
  }
}
</script>

<style>

</style>
