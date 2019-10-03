import Vue from 'vue'
import App from '@/App.vue'
import store from '@/store'
import router from '@/router'
import vuetify from '@/plugins/vuetify';
import Api from '@/services/api'

Vue.config.productionTip = false

new Vue({
  Api,
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
