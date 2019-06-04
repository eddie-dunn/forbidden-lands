import "./registerServiceWorker"

import App from "./App.vue"
import Vue from "vue"
import i18n from "./i18n"
import router from "./router"
import store from "./store"

import { Store as CharacterStore } from "@/characterStorage"

Vue.config.productionTip = false

// Vue.prototype.showWIP = true // DISABLE THIS LINE BEFORE PROD BUILD!
Vue.prototype.showWIP = false // DISABLE THIS LINE BEFORE PROD BUILD!
Vue.prototype.characterStore = new CharacterStore()

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app")
