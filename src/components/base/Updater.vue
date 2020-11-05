<script lang="ts">
/* eslint-disable no-console */
// Service worker update inspired by:
// https://medium.com/@dougallrich/give-users-control-over-app-updates-in-vue-cli-3-pwas-20453aedc1f2

import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"
// @ts-ignore
import { APP_VERSION } from "@/util/const"

import {
  IServiceWorkerMesssage,
  SW_EVENT_TYPE,
  SW_EVENT,
} from "@/registerServiceWorker"
import { timeout } from "@/util/util"

import FLButton from "@/components/base/FLButton.vue"

@Component({
  components: { FLButton },
})
export class Updater extends Vue {
  @Prop({ default: false }) showLog!: boolean

  refreshing = false
  updateExists = false
  registration: null | ServiceWorkerRegistration = null
  log: string[] = [`Build version ${APP_VERSION}`]

  handleServiceWorkerEvent(e: CustomEventInit<IServiceWorkerMesssage>) {
    const ev = e.detail
    if (!ev) return

    switch (ev?.type) {
      case SW_EVENT_TYPE.updated:
        this.updateExists = true
        this.registration = ev?.registration || null
        break

      default:
        break
    }
    this.log.push(ev.message)
  }

  refreshApp(reload: boolean = true) {
    this.refreshing = true
    this.updateExists = false
    reload && window.location.reload()
  }

  controllerChangeCallback() {
    if (this.refreshing) return
    this.refreshApp()
  }

  created() {
    document.addEventListener(SW_EVENT, this.handleServiceWorkerEvent)
    navigator.serviceWorker?.addEventListener(
      "controllerchange",
      this.controllerChangeCallback
    )
  }
  beforeDestroy() {
    document.removeEventListener(SW_EVENT, this.handleServiceWorkerEvent)
    navigator.serviceWorker?.removeEventListener(
      "controllerchange",
      this.controllerChangeCallback
    )
  }

  async updateApp() {
    this.log.push("Update clicked")
    this.refreshing = true
    if (!this.registration || !this.registration.waiting) {
      this.log.push("Error: No registration waiting to update")
      await timeout(2000)
      this.refreshApp()
      return
    }
    this.registration.waiting.postMessage("skipWaiting")

    // After this, the app should reload itself automatically; however, as a
    // fallback, we will force a refresh after 10 seconds in order to avoid
    // having the app end up in a half-way state
    await timeout(10000)
    this.log.push("Error: Update took to long, forcing refresh")
    await timeout(2000)
    this.refreshApp()
  }

  get info() {
    return this.log.join("\n")
  }
}
export default Updater
</script>

<template>
  <div class="updater">
    <FLButton
      v-if="updateExists"
      type="danger"
      class="updater-button"
      :disabled="refreshing"
      @click="updateApp"
    >
      New version available! Click to update
    </FLButton>
    <div v-if="showLog || $debugMode" class="updater-log">
      <pre>{{ info }}</pre>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import "~Style/colors.less";

.updater {
  display: flex;
  flex-direction: column;
}

.updater-button {
  margin: 1rem;
}

.updater-log {
  text-align: left;
  margin: 0.5rem auto;
  > pre {
    margin: 0;
  }
}
</style>
