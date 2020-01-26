import { BusEvent, EventBus } from "@/util/eventBus"

import { timeout } from "@/util"
import uuid1 from "uuid/v1"

type info = "info"
type warning = "warning"
type error = "error"

export interface Notification {
  type: info | warning | error
  message: string
  title?: string
  displayTime?: number // ms, falsy => inf
  icon?: string
  id?: string
}

class Notifier {
  private notifications: Notification[] = []

  add(msg: Notification) {
    if (!msg.id) msg.id = uuid1()
    this.notifications = [...this.notifications, msg]
    if (msg.displayTime) {
      timeout(msg.displayTime).then(() => this.remove(msg.id))
    }
    EventBus.$emit(BusEvent.notification, this.notifications)
  }
  remove(id: string | undefined) {
    this.notifications = this.notifications.filter((notification) => {
      return notification.id !== id
    })
    EventBus.$emit(BusEvent.notification, this.notifications)
  }
}

export const notifier = new Notifier()

export function notify(msg: Notification) {
  notifier.add(msg)
}
