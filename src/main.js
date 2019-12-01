import Vue from 'vue'
import App from './App'
import EventBus from './js/EventBus'
import { router } from './router'
import BoostrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BoostrapVue)

Vue.config.productionTip = false

Vue.prototype.$bus = EventBus

new Vue({
  components: { App },
  el: '#app',
  router,
  template: '<App/>'
})
