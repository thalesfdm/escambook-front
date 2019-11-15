import Vue from 'vue'
import App from './App'
import EventBus from './js/EventBus'
import { router } from './router'

Vue.config.productionTip = false

Vue.prototype.$bus = EventBus

new Vue({
  components: { App },
  el: '#app',
  router,
  template: '<App/>'
})
