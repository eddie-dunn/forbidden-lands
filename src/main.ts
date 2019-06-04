import "./registerServiceWorker"

import App from "./App.vue"
import Vue from "vue"
import i18n from "./i18n"
import router from "./router"
import store from "./store"

import { Store as CharacterStore } from "@/characterStorage"

Vue.config.productionTip = false

// TODO: Stop using this horrible hack; go with vuex or something similar
declare module "vue/types/vue" {
  interface Vue {
    $characterStore: CharacterStore
  }
}
Vue.prototype.$characterStore = new CharacterStore()

// showWIP is used to toggle stuff that is not ready for production yet
Vue.prototype.showWIP = false
// Vue.prototype.showWIP = true // DISABLE THIS LINE BEFORE PROD BUILD!

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app")
