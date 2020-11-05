/* eslint-disable no-console */

import { register } from "register-service-worker"

export const SW_EVENT = "swEvent"

export enum SW_EVENT_TYPE {
  "updated" = "updated",
  "ready" = "ready",
  "registered" = "registered",
  "cached" = "cached",
  "updatefound" = "updateFound",
  "offline" = "offline",
  "error" = "error",
}

export interface IServiceWorkerMesssage {
  type: SW_EVENT_TYPE
  message: string
  registration?: ServiceWorkerRegistration
  error?: Error
}

function createEvent(event: IServiceWorkerMesssage) {
  return new CustomEvent(SW_EVENT, { detail: event })
}

function dispatchEvent(event: IServiceWorkerMesssage) {
  document.dispatchEvent(createEvent(event))
}

if (process.env.NODE_ENV === "production") {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log(
        "App is being served from cache by a service worker.\n" +
          "For more details, visit https://goo.gl/AFskqB"
      )
      dispatchEvent({
        type: SW_EVENT_TYPE.ready,
        message: "App is being served from cache by a service worker",
      })
    },
    registered(registration) {
      console.log("Service worker has been registered.")
      setInterval(() => {
        registration.update()
      }, 1000 * 60 * 60) // e.g. hourly checks
      dispatchEvent({
        type: SW_EVENT_TYPE.registered,
        message: "Service worker has been registered.",
        registration,
      })
    },

    cached() {
      const message = "Content has been cached for offline use."
      console.log(message)
      dispatchEvent({ type: SW_EVENT_TYPE.cached, message })
    },
    updatefound() {
      const message = "New content is downloading."
      console.log(message)
      dispatchEvent({ type: SW_EVENT_TYPE.updatefound, message })
    },
    updated(registration) {
      console.log("New content is available; please refresh.")
      dispatchEvent({
        type: SW_EVENT_TYPE.updated,
        message: "New content is available; please refresh.",
        registration,
      })
    },
    offline() {
      const message =
        "No internet connection found. App is running in offline mode."
      console.log(message)
      dispatchEvent({ type: SW_EVENT_TYPE.offline, message })
    },
    error(error) {
      const message = "Error during service worker registration"
      console.error(message, error)
      dispatchEvent({ type: SW_EVENT_TYPE.error, message })
    },
  })
}
