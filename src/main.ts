import "./registerServiceWorker"

import { Route } from "vue-router/types/router"

import { Notification, notify } from "@/util/notifications"

import App from "./App.vue"
import { Store as CharacterStore } from "@/localstorage/characterStorage"
import Vue from "vue"
import i18n from "./i18n"
import router from "./router"
import { store } from "@/store/store.ts"
// @ts-ignore
import { DEBUG_KEY, BETA_KEY } from "@/util/const"

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
const DEBUG_MODE = Boolean(sessionStorage.getItem(DEBUG_KEY))
Vue.prototype.$debugMode = DEBUG_MODE
const BETA_MODE = Boolean(sessionStorage.getItem(BETA_KEY))
Vue.prototype.$betaMode = BETA_MODE

// Enable debug mode by adding query string, e.g., http://localhost:3000?debug=on
function checkDebugMode(to: Route) {
  const debugOn = ["1", "on", "true"].includes(
    String(to.query.debug).toLowerCase()
  )
  const debugOff = ["0", "off", "false", ""].includes(
    String(to.query.debug).toLowerCase()
  )
  if (debugOn || debugOff) {
    if (debugOn) sessionStorage.setItem(DEBUG_KEY, "ON")
    if (debugOff) sessionStorage.removeItem(DEBUG_KEY)
  }
  return debugOn || debugOff
}

// Enable beta mode by adding query string, e.g., http://localhost:3000?beta=on
function checkBetaMode(to: Route) {
  const betaOn = ["1", "on", "true"].includes(
    String(to.query.beta).toLowerCase()
  )
  const betaOff = ["0", "off", "false", ""].includes(
    String(to.query.debug).toLowerCase()
  )
  if (betaOn || betaOff) {
    if (betaOn) sessionStorage.setItem(BETA_KEY, "ON")
    if (betaOff) sessionStorage.removeItem(BETA_KEY)
  }
  return betaOn || betaOff
}

router.afterEach((to: Route) => {
  const debugModeChange = checkDebugMode(to)
  const betaModeChange = checkBetaMode(to)
  if (debugModeChange || betaModeChange) {
    window.location.replace(window.location.pathname)
  }
})

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app")
