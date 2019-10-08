import {
  ChatMessage,
  ClientMessage,
  ConnectMessage,
  FLMetadata,
  HostMessage,
  ServerMessage,
  timeout,
} from "@/components/multiplay/multi.ts"

import Peer from "peerjs"

export default class Client {
  client: Peer | null = null
  host: Peer.DataConnection | null = null
  destination: string = ""

  receiveMsgCb: (data: ChatMessage) => void
  connectionCb: (data: ConnectMessage) => void
  handleServerMessage: (data: ServerMessage) => void

  constructor({
    receiveMsgCb = (data: ChatMessage) => {},
    handleServerMessage = (data: ServerMessage) => {},
    connectionCb = (data: ConnectMessage) => {},
  } = {}) {
    this.receiveMsgCb = receiveMsgCb
    this.connectionCb = connectionCb
    this.handleServerMessage = handleServerMessage
  }

  get clientId() {
    return this.client ? this.client.id : null
  }

  get hostId() {
    return this.host ? this.host.peer : null
  }

  get connected() {
    return this.host && this.host.open
  }

  log(message: any, ...optionalParams: any[]) {
    /* eslint-disable-next-line no-console */
    console.log(`[CLIENT:${this.clientId}]`, message, ...optionalParams)
  }

  /* Setup and initialize a client peer connection */
  init(): Client {
    this.client = new Peer(undefined, {
      debug: 2,
    })

    this.client.on("open", (id: string) => {
      this.log(`my client id is: ${id}`)
    })
    this.client.on("close", () => {
      this.log("Client connection closed:", this.clientId)
    })
    this.client.on("disconnected", () => {
      this.log("Client disconnected:", this.clientId)
    })
    this.client.on("error", (error) => {
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
    this.client = client

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
  // TODO: Convert to Promise to remove callback dependency?
  join(hostId: string, username: string): Client {
    if (!this.client) {
      /* eslint-disable-next-line no-console */
      console.error("Init client first")
      return this
    }

    this.log("connecting to", hostId)
    this.host = this.client.connect(hostId, {
      metadata: { username } as FLMetadata,
    })

    this.host.on("data", (data: HostMessage) => this.onHostData(data))
    this.host.on("open", () => this.host && this.onHostConnected(this.host))
    return this
  }

  onHostConnected(host: Peer.DataConnection) {
    this.log("connection open, getting data")
    this._hostSend(host, { type: "list-users" })
  }

  onHostData(data: HostMessage) {
    this.log("got data from host", data)
    switch (data.type) {
      case "chat-message":
        this.receiveMsgCb(data)
        break
      case "server-message":
        this.handleServerMessage(data)
        break
      case "connect-message":
        this.connectionCb(data)
        break
      default:
        break
    }
  }

  // Wrapper for ensuring type compatibility
  _hostSend(host: Peer.DataConnection, data: ClientMessage) {
    host.send(data)
  }

  sendChat(message: string) {
    if (!this.host) return
    const username = this.host.metadata ? this.host.metadata.username : ""
    this.log("sending chat message", message)
    this._hostSend(this.host, {
      type: "chat-message",
      message,
      username,
    })
  }

  disconnect() {
    // TODO: Implement disconnect handling & timeout fallback
    this.log("disconnecting client...")
    if (this.host) {
      this._hostSend(this.host, {
        type: "client-disconnect",
        peerId: this.clientId || "",
      })
    }
    timeout(1000)
      .then(() => {
        if (this.host) {
          this.host.close()
        }
      })
      .then(() => {
        if (this.client) {
          this.client.disconnect()
          // this.client.destroy()
        }
      })
  }
}
/**
 * https://github.com/jmcker/Peer-to-Peer-Cue-System/blob/master/send.html
 * https://github.com/jmcker/Peer-to-Peer-Cue-System/blob/master/receive.html
 *
 */
