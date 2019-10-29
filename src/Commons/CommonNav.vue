<template>
  <nav class="navbar navbar-expand-lg sticky-top" color-on-scroll="500">
    <div class="container-fluid">
      <router-link
        class="navbar-brand"
        :to="{name: 'DashboardMainManager'}"
      >
        {{ title }}
        <common-interceptor />
      </router-link>
      <button
        class="navbar-toggler navbar-toggler-right"
        type="button"
        data-toggle="collapse"
        aria-controls="navigation-index"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-bar burger-lines"></span>
        <span class="navbar-toggler-bar burger-lines"></span>
        <span class="navbar-toggler-bar burger-lines"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navigation">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="javascript:void(0)"
              id="navbarDropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span class="no-icon">
                {{ username }}&nbsp;<i class="fa fa-user-circle-o"></i>
              </span>
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <a @click="onLogout" class="dropdown-item" href="javascript:void(0)">
                <i class="fa fa-lock"></i>&nbsp;Logout
              </a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import CommonInterceptor from '@/Commons/CommonInterceptor'

export default {
  name: 'CommonPanel',
  components: {
    'common-interceptor': CommonInterceptor
  },
  props: {
    title: String
  },
  methods: {
    onLogout () {
      this.$bvModal.msgBoxConfirm('Please confirm that you want to logout.', {
        title: 'Please Confirm',
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: 'YES',
        cancelTitle: 'NO',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true
      })
        .then(value => {
          localStorage.clear()
          this.$router.push({
            name: 'UserLoginManager'
          })
        })
    }
  },
  computed: {
    username () {
      return localStorage.getItem('username')
    }
  }
}
</script>

<style>

</style>
