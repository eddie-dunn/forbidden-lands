import {
  ChatMessage,
  ClientMessage,
  UserListMsg,
  FLMetadata,
  HostMessage,
  ServerMessage,
} from "@/components/multiplay/multi.ts"
import { timeout } from "@/util.ts"

import Peer from "peerjs"

export default class Client {
  clientPeer: Peer | null = null
  hostConn: Peer.DataConnection | null = null
  destination: string = ""
  _userList: { peerId: string; username: string }[] = []
  chatMessages: ChatMessage[] = []

  receiveMsgCb: (data: ChatMessage) => void
  connectionCb: (data: UserListMsg) => void
  handleServerMessage: (data: ServerMessage) => void

  constructor({
    receiveMsgCb = (data: ChatMessage) => {},
    handleServerMessage = (data: ServerMessage) => {},
    connectionCb = (data: UserListMsg) => {},
  } = {}) {
    this.receiveMsgCb = receiveMsgCb
    this.connectionCb = connectionCb
    this.handleServerMessage = handleServerMessage
  }

  get userList() {
    return this._userList
  }
  set userList(list: { peerId: string; username: string }[]) {
    this._userList = list
  }

  get clientId() {
    return this.clientPeer ? this.clientPeer.id : null
  }

  get hostId() {
    return this.hostConn ? this.hostConn.peer : null
  }

  get connected() {
    return this.hostConn && this.hostConn.open
  }

  log(message: any, ...optionalParams: any[]) {
    /* eslint-disable-next-line no-console */
    console.log(`[CLIENT:${this.clientId}]`, message, ...optionalParams)
  }

  /* Setup and initialize a client peer connection */
  init(): Client {
    this.clientPeer = new Peer(undefined, {
      debug: 2,
    })

    this.clientPeer.on("open", (id: string) => {
      this.log(`my client id is: ${id}`)
    })
    this.clientPeer.on("close", () => {
      this.log("Client connection closed:", this.clientId)
    })
    this.clientPeer.on("disconnected", () => {
      this.log("Client disconnected:", this.clientId)
    })
    this.clientPeer.on("error", (error) => {
      /* eslint-disable-next-line no-console */
      console.error(">>> ERROR:", error.type, error)
    })
    return this
  }
  // TODO: Fixup/merge init & initPromise
  initPromise() {
    const client = new Peer(undefined, {
      debug: 2,
    })
    this.clientPeer = client

    client.on("close", () => {
      this.log("Client connection closed:", this.clientId)
    })
    client.on("disconnected", () => {
      this.log("Client disconnected:", this.clientId)
    })
    return new Promise<Client>((resolve, reject) => {
      client.on("open", (id: string) => {
        resolve(this)
      })
      client.on("error", (error) => {
        /* eslint-disable-next-line no-console */
        console.error(">>> ERROR:", error.type, error)
        reject(error.type)
      })
    })
  }

  /* Connect to server */
  async join(hostId: string, username: string) {
    if (!this.clientPeer) {
      /* eslint-disable-next-line no-console */
      console.error("Init client first")
      return this
    }

    this.log("connecting to", hostId, "as", username)
    const hostConn = this.clientPeer.connect(hostId, {
      metadata: { username } as FLMetadata,
    })
    this.hostConn = hostConn

    hostConn.on("data", (data: HostMessage) => this.onHostData(data))
    return new Promise<Client>((resolve, reject) => {
      hostConn.on("open", () => {
        this._hostSend(hostConn, { type: "list-users" })
        resolve(this)
      })
      hostConn.on("error", (error) => {
        /* eslint-disable-next-line no-console */
        console.error(">>> ERROR:", error.type, error)
        reject(error.type)
      })
    })
  }

  onHostData(data: HostMessage) {
    this.log("got data from host", data)
    switch (data.type) {
      case "chat-message":
        this.receiveMsgCb(data)
        this.receiveChat(data)
        break
      case "server-message":
        this.handleServerMessage(data)
        break
      case "connect-message":
        this.connectionCb(data)
        this.userList = data.peers
        break
      default:
        break
    }
  }

  receiveChat(data: ChatMessage) {
    this.chatMessages.push(data)
  }
  // Wrapper for ensuring type compatibility
  _hostSend(host: Peer.DataConnection, data: ClientMessage) {
    host.send(data)
  }

  sendChat(message: string) {
    if (!this.hostConn) return
    const username = this.hostConn.metadata
      ? this.hostConn.metadata.username
      : ""
    this.log("sending chat message", message)
    this._hostSend(this.hostConn, {
      type: "chat-message",
      message,
      username,
    })
  }

  disconnect() {
    // TODO: Implement disconnect handling & timeout fallback
    this.log("disconnecting client...")
    if (this.hostConn) {
      this._hostSend(this.hostConn, {
        type: "client-disconnect",
        peerId: this.clientId || "",
      })
    }
    return new Promise<Client>((resolve, reject) => {
      if (!this.clientPeer) {
        reject("No client to disconnect")
      } else {
        this.clientPeer.on("disconnected", () => {
          resolve(this)
        })
        this.clientPeer.disconnect()
      }
    })
  }
}
/**
 * https://github.com/jmcker/Peer-to-Peer-Cue-System/blob/master/send.html
 * https://github.com/jmcker/Peer-to-Peer-Cue-System/blob/master/receive.html
 *
 */
