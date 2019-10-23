/**
 * https://github.com/jmcker/Peer-to-Peer-Cue-System/blob/master/send.html
 * https://github.com/jmcker/Peer-to-Peer-Cue-System/blob/master/receive.html
 *
 */

import { CharacterData } from "@/characterData.ts"
import Peer from "peerjs"

export const NAMES = [
  "Alice",
  "Bob",
  "Charles",
  // radio
  "Alpha",
  "Bravo",
  "Charlie",
  "Delta",
  "Echo",
  "Foxtrot",
  "Golf",
  "Hotel",
  "India",
  "Juliet",
  "Kilo",
  "Lima",
  "Mike",
  "November",
  "Oscar",
  "Papa",
  "Quebec",
  "Romeo",
  "Sierra",
  "Tango",
  "Uniform",
  "Victor",
  "Whiskey",
  "X-ray",
  "Yankee",
  "Zulu",
]

export function randomName(words = 1, nameList: string[] = NAMES): string {
  const getName = () => nameList[Math.floor(Math.random() * nameList.length)]
  let names = []
  for (let i = 0; i < words; i++) {
    names.push(getName())
  }
  return names.join(" ")
}

// Types/Interfaces
export interface User {
  peerId: string
  username: string
  charData: CharacterData | null
  admin?: boolean
}

export interface FLMetadata {
  username: string
  charData?: CharacterData
}

export interface Connection {
  conn: Peer.DataConnection
  peerId: string
  username: string
  charData: CharacterData | null
}

export interface ChatMessage {
  type: "chat-message"
  message: string
  username: string
}

export interface UserListMsg {
  type: "userlist"
  users: User[]
  // peers: {
  //   peerId: string
  //   username: string
  //   charData?: CharacterData
  // }[]
}

export interface ServerMessage {
  type: "server-message"
  message: string
}

export type HostMessage = UserListMsg | ChatMessage | ServerMessage

export interface ListUsers {
  type: "list-users"
}

export interface DisconnectMessage {
  type: "client-disconnect"
  peerId: string
}

export interface SendCharData {
  type: "send-chardata"
  user: User
}

export type ClientMessage =
  | ChatMessage
  | ListUsers
  | DisconnectMessage
  | SendCharData

// PeerJS doesn't currently support error types, so let's declare them here:
export type PeerJSError =
  /*
   * ERROR FATAL
   * The client's browser does not support some or all WebRTC features that you
   * are trying to use.
   */
  | "browser-incompatible"
  /*
   *You've already disconnected this peer from the server and can no
   * longer make any new connections on it. */
  | "disconnected" // ERROR
  /*
   * The ID passed into the Peer constructor contains illegal characters. */
  | "invalid-id" // ERROR FATAL
  /*
   * The API key passed into the Peer constructor contains illegal characters or
   * is not in the system (cloud server only). */
  | "invalid-key" // ERROR FATAL
  /*
   *  Lost or cannot establish a connection to the signalling server. */
  | "network" // ERROR
  /*
   * The peer you're trying to connect to does not exist. */
  | "peer-unavailable" // ERROR
  /*
   * PeerJS is being used securely, but the cloud server does not support SSL.
   * Use a custom PeerServer. */
  | "ssl-unavailable" // ERROR FATAL
  /*
   * Unable to reach the server. */
  | "server-error" // ERROR FATAL
  /*
   * An error from the underlying socket. */
  | "socket-error" // ERROR FATAL
  /*
   * The underlying socket closed unexpectedly. */
  | "socket-closed" // ERROR FATAL
  /*
   * The ID passed into the Peer constructor is already taken. This error is not
   * fatal if your peer has open peer-to-peer connections. This can happen if you
   * attempt to reconnect a peer that has been disconnected from the server, but
   * its old ID has now been taken. 'webrtc' ERROR Native WebRTC errors. */
  | "unavailable-id" // ERROR SOMETIMES FATAL
