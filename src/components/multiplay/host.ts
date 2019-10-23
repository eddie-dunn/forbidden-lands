import {
  ChatMessage,
  ClientMessage,
  Connection,
  FLMetadata,
  HostMessage,
  PeerJSError,
  SendCharData,
  ServerMessage,
  User,
  UserListMsg,
} from "@/components/multiplay/multi.ts"

import Peer from "peerjs"

function handlePeerJsError(errorType: PeerJSError) {
  switch (errorType) {
    case "browser-incompatible":
      alert("Your browser does not support Multiplay")
      break
    case "unavailable-id":
      alert("Room ID unavailable; please choose another")
      break
    default:
      /* eslint-disable-next-line no-console */
      console.error(errorType, "TODO not handled")
      break
  }
}

export default class Host {
  host: Peer | null = null

  connectedPeers: Connection[] = []
  onHosting: (name: string) => void

  logging: boolean = true
  verbosity: number

  constructor({ verbosity = 3, onHosting = (name: string) => {} } = {}) {
    this.verbosity = verbosity
    this.onHosting = onHosting
  }

  _handleDisconnect(peerId: string) {
    const user = this.connectedPeers.find((client) => client.peerId === peerId)
    const username = user ? user.username : "???"
    const text = `${username} disconnected`
    this.connectedPeers = this.connectedPeers.filter(
      (client) => client.peerId !== peerId
    )
    this.log(text)
    this.broadCastConnected(this.connectedPeers)
    this.sendServerMsg(text)
  }

  get hostId() {
    return this.host ? this.host.id : null
  }
  get connected() {
    return this.host && !this.host.disconnected
  }

  // Server logging
  info(message: string, ...optionalParams: any[]) {
    if (!this.logging || this.verbosity < 3) return
    /* eslint-disable-next-line no-console */
    console.info(`[HOST:${this.hostId}]`, message, ...optionalParams)
  }
  log(message: any, ...optionalParams: any[]) {
    if (!this.logging || this.verbosity < 2) return
    /* eslint-disable-next-line no-console */
    console.log(`[HOST:${this.hostId}]`, message, ...optionalParams)
  }
  error(message: string, ...optionalParams: any[]) {
    if (!this.logging || this.verbosity < 1) return
    /* eslint-disable-next-line no-console */
    console.error(`[HOST:${this.hostId}]`, message, ...optionalParams)
  }
  // Wrapper for typing
  sendToClient(client: Peer.DataConnection, data: HostMessage) {
    this.info("sending to", client.peer, data)
    client.send(data)
  }

  _handleListUserRequest(client: Connection) {
    const users = this.connectedPeers.map((connection) => ({
      peerId: connection.peerId,
      username: connection.username,
      // metadata: connection.conn.metadata,
      charData: connection.charData,
    }))
    const message: UserListMsg = {
      type: "userlist",
      users,
    }
    this.sendToClient(client.conn, message)
  }

  _onCharData(data: SendCharData, client: Connection) {
    this.info("got chardata from", client.username, data)
    const users: User[] = this.connectedPeers.map((connection: Connection) => {
      if (connection.peerId === data.user.peerId) {
        return {
          peerId: data.user.peerId,
          username: data.user.username,
          charData: data.user.charData,
        }
      }
      return {
        peerId: connection.peerId,
        username: connection.username,
        charData: connection.charData,
      }
    })
    const broadCastData: UserListMsg = {
      type: "userlist",
      users,
    }
    this._broadCast(broadCastData)
  }

  _onClientData(data: ClientMessage, client: Connection) {
    this.log(`data received from ${client.peerId}|${client.username}`, data)
    switch (data.type) {
      case "chat-message":
        this.broadcastMsg(data.message, client.username)
        break
      case "list-users":
        this._handleListUserRequest(client)
        break
      case "client-disconnect":
        this._handleDisconnect(client.peerId)
        break
      case "send-chardata":
        this._onCharData(data, client)
        break
      default:
        this.error("Unknown data", data)
        break
    }
  }
  // Callback handling
  _createClient(conn: Peer.DataConnection): Connection {
    const { username, charData = null } = conn.metadata as FLMetadata
    const peerId = conn.peer
    const client = { conn: conn, peerId, username, charData }
    conn.on("data", (data: ClientMessage) => this._onClientData(data, client))
    conn.on("close", () => {
      this.log("client closed", username, peerId)
      this.connectedPeers = this.connectedPeers.filter(
        (peer) => peer.peerId !== peerId
      )
      this.broadCastConnected(this.connectedPeers)
    })
    conn.on("disconnected", () => {
      this.log("client disconnected", username)
      this._onPeerDisconnect(peerId)
    })
    return client
  }

  _onPeerDisconnect(peerId: string) {
    this.connectedPeers = this.connectedPeers.filter(
      (peer) => peer.peerId !== peerId
    )
    this.broadCastConnected(this.connectedPeers)
  }

  _onClientDataConnection(conn: Peer.DataConnection) {
    const message = `${conn.metadata.username} connected`
    this.log(message, conn.peer)
    const client = this._createClient(conn)
    this.connectedPeers.push(client)
    this.broadCastConnected(this.connectedPeers)
    this.sendServerMsg(message)
  }

  _onHostPeerOpen(id: string) {
    this.log("my host id is:", id)
    this.onHosting(id)
  }

  _onHostPeerDisconnected() {
    this.log("Host is disconnected.")
  }

  _handleError(errorType: PeerJSError) {
    this.log("Got error", errorType)
    handlePeerJsError(errorType)
  }

  // Public methods
  connect(sessionName: string | undefined) {
    const host = new Peer(sessionName, {
      debug: 2,
    })
    this.host = host
    this.host.on("open", (id) => this._onHostPeerOpen(id))
    this.host.on("disconnected", () => this._onHostPeerDisconnected())
    this.host.on("connection", (conn) => this._onClientDataConnection(conn))
    this.host.on("error", (err) => this._handleError(err.type as PeerJSError))
    return new Promise<Host>((resolve, reject) => {
      host.on("open", (id: string) => {
        this.log("my host id is:", id)
        resolve(this)
      })
      host.on("error", (err) => reject(err))
    })
  }

  disconnect() {
    if (!this.host) return
    this.log("disconnecting host...")
    return new Promise<Host>((resolve, reject) => {
      if (!this.host) {
        reject("No host to disconnect")
      } else {
        this.host.on("disconnected", () => {
          resolve(this)
        })
        this.host.disconnect()
      }
    })
    // return new Promise<Client>((resolve, reject) => {
    //   client.on("open", (id: string) => {
    //     resolve(this)
    //   })
    //   client.on("error", (error) => {
    //     /* eslint-disable-next-line no-console */
    //     console.error(">>> ERROR:", error.type, error)
    //     reject(error.type)
    //   })
    // })
  }

  // Broadcasting
  _broadCast(data: HostMessage) {
    this.log("broadcasting", data)
    this.connectedPeers.map((conn) => {
      this.log("sending message to", conn.peerId, conn.username)
      conn.conn.send(data)
    })
  }

  broadCastConnected(connections: Connection[]) {
    const users: User[] = connections.map((connection) => ({
      peerId: connection.peerId,
      username: connection.username,
      charData: null, // FIXME
    }))
    const message: UserListMsg = { type: "userlist", users }
    this._broadCast(message)
  }

  broadcastMsg(message: string, username: string = "???") {
    const data: ChatMessage = { type: "chat-message", message, username }
    this._broadCast(data)
  }

  sendServerMsg(message: string) {
    const data: ServerMessage = { type: "server-message", message }
    this._broadCast(data)
  }
}
