import "./registerServiceWorker"

import { Notification, notify } from "@/util/notifications"

import App from "./App.vue"
import { Store as CharacterStore } from "@/localstorage/characterStorage"
import Vue from "vue"
import i18n from "./i18n"
import router from "./router"
import { store } from "@/store/store.ts"

Vue.config.productionTip = false

declare module "vue/types/vue" {
  interface Vue {
    $characterStore: CharacterStore
    $debugMode: boolean
    $notify: (msg: Notification) => void
  }
}
Vue.prototype.$characterStore = new CharacterStore()

Vue.prototype.$notify = notify

// $debugMode is used to toggle stuff that is not ready for production yet
Vue.prototype.$debugMode = false
// Vue.prototype.$debugMode = true // DISABLE THIS LINE BEFORE PROD BUILD!

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app")
