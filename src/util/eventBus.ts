import Vue from "vue"
import { Protocol, ProtocolTypes } from "@/components/multiplay/protocol"
import { CharData } from "@/characterData"

export const EventBus = new Vue()

export enum BusEvent {
  notification = "event notification",
  characterUpdate = "char update",
}

export function eventSendCharData(charData: CharData, peerId = "") {
  const busData: Protocol.MsgCharacter = {
    type: ProtocolTypes.charData,
    peerId,
    character: charData,
  }
  EventBus.$emit(BusEvent.characterUpdate, busData)
}
