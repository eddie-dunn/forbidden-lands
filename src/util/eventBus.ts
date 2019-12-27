import Vue from "vue"
export const EventBus = new Vue()

export enum BusEvent {
  notification = "event notification",
  characterUpdate = "char update",
}
