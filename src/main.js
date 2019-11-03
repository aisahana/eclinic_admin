// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'
import Datepicker from 'vuejs-datepicker'
import VueSocketIO from 'vue-socket.io'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.use(BootstrapVue)
Vue.use(new VueSocketIO({
  debug: true,
  connection: process.env.SOCKET_SERVER
}))

Vue.component('datepicker', Datepicker)
Vue.component('vue-bootstrap-typeahead', VueBootstrapTypeahead)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
