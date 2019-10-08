import {
  ChatMessage,
  ClientMessage,
  ConnectMessage,
  Connection,
  FLMetadata,
  HostMessage,
  PeerJSError,
  ServerMessage,
  timeout,
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
// Wrapper for typing
function sendToClient(client: Peer.DataConnection, data: HostMessage) {
  client.send(data)
}

export default class Host {
  host: Peer | null = null

  connectedPeers: Connection[] = []
  receiveCallback: (data: any) => void
  onHosting: (name: string) => void
  onClientConnected: (data: any) => void

  logging: boolean = true
  verbosity: number

  constructor({
    verbosity = 3,
    receiveCallback = (data: any) => {},
    onHosting = (name: string) => {},
    onClientConnected = (data: any) => {},
  } = {}) {
    this.verbosity = verbosity
    this.receiveCallback = receiveCallback
    this.onHosting = onHosting
    this.onClientConnected = onClientConnected
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

  _handleListUserRequest(client: Connection) {
    const message: ConnectMessage = {
      type: "connect-message",
      peers: this.connectedPeers.map((connection) => ({
        peerId: connection.peerId,
        username: connection.username,
      })),
    }
    sendToClient(client.conn, message)
  }

  _onClientData(data: ClientMessage, client: Connection) {
    this.log(`data received from ${client.peerId}|${client.username}`, data)
    switch (data.type) {
      case "chat-message":
        this.broadcastMsg(data.message, client.username)
        this.receiveCallback(data)
        break
      case "list-users":
        this.log("sending users")
        this._handleListUserRequest(client)
        break
      case "client-disconnect":
        this._handleDisconnect(client.peerId)
        break
      default:
        this.error("Unknown data", data)
        break
    }
  }
  // Callback handling
  _createClient(conn: Peer.DataConnection): Connection {
    const username = (conn.metadata as FLMetadata).username
    const peerId = conn.peer
    const client = { conn: conn, peerId, username }
    conn.on("data", (data: ClientMessage) => this._onClientData(data, client))
    conn.on("close", () => this.log("client closed", username))
    conn.on("disconnected", () => this.log("client disconnected", username))
    return client
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

  _onPeerDisconnected() {
    this.log("Host is disconnected.")
  }

  _handleError(errorType: PeerJSError) {
    this.log("Got error", errorType)
    handlePeerJsError(errorType)
  }

  // Public methods
  connect(sessionName: string | undefined) {
    this.host = new Peer(sessionName, {
      debug: 2,
    })
    this.host.on("open", (id) => this._onHostPeerOpen(id))
    this.host.on("disconnected", () => this._onPeerDisconnected())
    this.host.on("connection", (conn) => this._onClientDataConnection(conn))
    this.host.on("error", (err) => this._handleError(err.type as PeerJSError))
    return this
  }

  disconnect() {
    this.log("disconnecting host...")
    this.host && this.host.disconnect()
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
    const peers = connections.map((connection) => ({
      peerId: connection.peerId,
      username: connection.username,
    }))
    const message: ConnectMessage = { type: "connect-message", peers }
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
