import { Err, OK, Result, log } from "@/util"
import {
  INodeUser,
  PeerId,
  Protocol,
  UserData,
} from "@/components/multiplay/protocol"

import { DataConnection } from "peerjs"
import { FLPeer } from "@/components/multiplay/fl-peer"

/** Public interface for implementing a Node */
interface INode {
  /** Return true if connected to network */
  connected: boolean
  /** PeerJS network id */
  peerId: PeerId
  /** Setup node and connect to network */
  start(peerId?: string): Promise<Result>
  /** Disconnect from network. */
  stop(): Promise<Result>
  /** Broadcast data to all peers connected to this node */
  broadcast?(data: Protocol.Base): Result
  /** Send data to peer specified by id */
  send(to: PeerId, data: Protocol.Base): Result
}

export interface ChatMessage {
  username: string | undefined
  message: Protocol.Chat | Protocol.ServerChat
}

export interface PlayerNode extends INode {
  messages: ChatMessage[]
  hostId: string | undefined
  users: UserData[]
  start(peerId?: string): Promise<Result>
  stop(): Promise<Result>
  connectTo(nodeName: string, metadata: UserData): void
  broadcast(data: Protocol.Base): Result
}

export abstract class AbstractNode implements INode {
  constructor(public nodeType: string) {
    const onConnection = this.handleConnect.bind(this)
    this.peer = new FLPeer({ onConnection }, nodeType)
  }

  get connected() {
    if (!this.peer) return false
    return this.peer.connected
  }

  get peerId() {
    return this.peer.peerId
  }

  /** container for connected users */
  protected connBox: INodeUser[] = []

  /** Own connection to network */
  protected peer: FLPeer

  /** Connect to network.
   *
   * Once connected the node can start receiving and sending data.
   *
   * @param peerId - Will try to use this id, if supplied
   * @return A Promise that will resolve on successful connect
   */
  abstract start(peerId?: PeerId): Promise<Result>

  /** Disconnect node from network */
  stop(): Promise<Result> {
    return this.peer.disconnect()
  }

  /** Handle data received */
  protected abstract _receiveData(data: Protocol.Base): Result

  /** Handle incoming connections to node */
  protected handleConnect(conn: DataConnection): boolean {
    const handled = log("got connection", conn)
    return Boolean(handled)
  }

  /** Used internally to send data to other peer */
  protected _send(to: INodeUser[], data: Protocol.Base | null): Result {
    to.map((user) => {
      user.conn.send(data)
    })
    return OK("msg sent")
  }

  /** Send data to specific user */
  send(to: PeerId, data: Protocol.Base): Result {
    const user: INodeUser | undefined = this.connBox.find(
      (usr) => usr.peerId === to
    )
    if (!user) return Err("user not found")
    return this._send([user], data)
  }

  /** Broadcast data to all connected users */
  broadcast(data: NodeSend | NodeReceive, peers?: PeerId[]): Result {
    if (!peers) {
      return this._send(this.connBox, data)
    }
    const peerCons = this.connBox.filter((user) => peers.includes(user.peerId))
    return this._send(peerCons, data)
  }
}

export type NodeSend =
  | Protocol.Chat
  | Protocol.MsgCharacter
  | Protocol.MsgUser
  | Protocol.MsgUsers
  | Protocol.NotifyDisconnect
  | Protocol.ServerChat

export type NodeReceive =
  | Protocol.Chat
  | Protocol.MsgCharacter
  | Protocol.MsgUser
  | Protocol.MsgUsers
  | Protocol.NotifyDisconnect
  | Protocol.Pong
