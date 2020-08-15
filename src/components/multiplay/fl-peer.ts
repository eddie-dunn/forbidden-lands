/* eslint-disable no-console */
import { Err, OK, Result, errlog, log } from "@/util/util"
import { Notification, notify } from "@/util/notifications"
import { PeerId, PeerJSError, UserData } from "@/components/multiplay/protocol"

import Peer from "peerjs"

interface IPeer {
  /** True when connected to PeerJS network */
  connected: boolean

  /** ID that identifies this peer on the network */
  peerId: PeerId

  /** Async connect to PeerJS network
   *
   * @param id Brokering ID for receiveing connections
   */
  connectSelf(id?: string): Promise<Result>

  /** Async disconnect from PeerJS network */
  disconnect(): Promise<Result>

  /** Async connect to peer on network */
  connectTo(
    brokerId: string,
    metadata: UserData
  ): Promise<Peer.DataConnection | null>
}

abstract class BasePeer implements IPeer {
  constructor(
    {
      onConnection,
      onClose,
      onDisconnected,
      onError,
    }: PeerConstructorOptions = {},
    public nodeType: string
  ) {
    if (onConnection) this.onConnection = onConnection
    if (onClose) this.onClose = onClose
    if (onDisconnected) this.onDisconnected = onDisconnected
    if (onError) this.onError = onError
    this.onConnection.bind(this)
    this.onClose.bind(this)
    this.onDisconnected.bind(this)
    this.onError.bind(this)
  }
  protected abstract peer: Peer | null

  get connected() {
    if (!this.peer) return false
    return !this.peer.disconnected
  }
  get peerId(): PeerId {
    return this.peer ? this.peer.id : ""
  }

  abstract connectSelf(nodeId?: string): Promise<Result>
  abstract connectTo(
    brokerId: string,
    metadata: UserData
  ): Promise<Peer.DataConnection | null>

  async disconnect(): Promise<Result> {
    return new Promise<Result>((resolve, reject) => {
      if (this.peer) {
        this.peer.disconnect()
        this.peer.destroy()
        resolve(OK())
      } else {
        reject(Err("Already disconnected"))
      }
    })
  }

  /* eslint-disable no-console */
  private get logPrefix() {
    return `[${this.nodeType}:${this.peerId || "no peerId"}]`
  }
  log(...args: any) {
    console.log(...args)
  }
  onConnection(conn: Peer.DataConnection) {
    console.log(this.logPrefix, `got conn: ${conn}`)
  }
  onClose(): void {
    console.log(this.logPrefix, "closed")
  }
  onDisconnected(): void {
    console.log(this.logPrefix, "disconnected")
  }
  onError(err: any): void {
    console.error(this.logPrefix, `got error ${err.type}: ${err}`)
  }
  /* eslint-enable no-console */
}

/** Wrapper for PeerJS Peer */
export class FLPeer extends BasePeer {
  protected peer: Peer | null = null

  async connectSelf(id?: string): Promise<Result> {
    const peer = new Peer(id, { debug: 2 })
    return new Promise<Result>((resolve, reject) => {
      peer.on("error", (err) => {
        reject(Err("Connection error", err))
      })
      peer.on("connection", (conn) => this.onConnection(conn))
      peer.on("close", () => this.onClose())
      peer.on("disconnected", () => this.onDisconnected())
      peer.on("error", (err) => this.onError(err))
      peer.on("open", (id: string) => {
        log("conn open", id, "connected", !peer.disconnected)
        this.peer = peer
        resolve(OK({ id }))
      })
      // TODO: Verify resolve/rejection mechanic
    })
  }

  async connectTo(
    peerId: PeerId,
    metadata: UserData
  ): Promise<Peer.DataConnection | null> {
    return new Promise<Peer.DataConnection>((resolve, reject) => {
      if (!this.peer) {
        const msg = `[ERROR] FLPeer not connected to network, ${this.peer}`
        errlog(msg)
        reject(msg)
      }
      log("connecting with metadata", { ...metadata, peerId: this.peerId })
      const conn = (this.peer as Peer).connect(peerId, { metadata })
      conn.on("error", (err) => {
        conn.on("error", (err) => this.onError(err))
        reject(null)
      })
      conn.on("open", () => {
        resolve(conn)
      })
    })
  }

  onError(err: any): void {
    handlePeerJsError(err)
  }
}

/**
 * Handle PeerJS Error
 * * TODO: Move inside class, or extend with callback?
 */
function handlePeerJsError(err: any) {
  const errorType: PeerJSError = err.type
  errlog("Got peerjs error:", err, "\ntype:", errorType)
  switch (errorType) {
    case "browser-incompatible":
    case "unavailable-id":
    case "network":
    case "peer-unavailable":
      notify({
        type: "error",
        message: err,
      })
      break
    default:
      /* eslint-disable-next-line no-console */
      errlog("Error type not handled:", errorType)
      break
  }
}

interface PeerConstructorOptions {
  onConnection?: (conn: Peer.DataConnection) => void
  onClose?: () => void
  onDisconnected?: () => void
  onError?: (err: string) => void
}
