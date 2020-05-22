import "./registerServiceWorker"

import { Route } from "vue-router/types/router"

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
const DEBUG_KEY = "FLC_DEBUG_MODE"
const DEBUG_MODE = Boolean(sessionStorage.getItem(DEBUG_KEY))
Vue.prototype.$debugMode = DEBUG_MODE

router.afterEach((to: Route) => {
  const debugOn = ["1", "on", "true"].includes(
    String(to.query.debug).toLowerCase()
  )
  const debugOff = ["0", "off", "false", ""].includes(
    String(to.query.debug).toLowerCase()
  )
  if (debugOn || debugOff) {
    if (debugOn) sessionStorage.setItem(DEBUG_KEY, "ON")
    if (debugOff) sessionStorage.removeItem(DEBUG_KEY)
    window.location.replace(window.location.pathname)
  }
})

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app")
