import { AbstractNode, NodeReceive } from "./fl-node"
import {
  INodeUser,
  PeerId,
  Protocol,
  ProtocolTypes,
  UserData,
} from "@/components/multiplay/protocol"
import { OK, Result } from "@/util"
import { errlog, log } from "@/util"
import {
  getGms,
  getPlayers,
  pullFilteredUserData,
  pullUserData,
} from "./multiplay-util"

import { DataConnection } from "peerjs"
import { HostMessageHandler } from "./hostMessageHandler"
import { PingModule } from "@/components/multiplay/pingModule"

export class FLHost extends AbstractNode {
  private msgHandler = new HostMessageHandler()
  private pingModule = new PingModule((peerId: PeerId) =>
    this.handleDisconnect(peerId)
  )
  constructor(
    public nodeType = "FLHost",
    public adminId: PeerId = Symbol().toString(),
    public gmIds: PeerId[] = [],
    protected connBox: INodeUser[] = []
  ) {
    super(nodeType)
  }
  private get players(): INodeUser[] {
    return getPlayers(this.connBox)
  }
  private get gms(): INodeUser[] {
    return getGms(this.connBox)
  }
  async start(roomName?: PeerId, adminId?: PeerId) {
    if (adminId) this.adminId = adminId
    const p = await this.peer.connectSelf(roomName)
    this.pingModule.start()
    return p
  }
  async stop() {
    this.pingModule.stop()
    await this.peer.disconnect()
    this.connBox = []
    return OK()
  }
  removeUser(peerId: PeerId) {
    this.connBox = this.connBox.filter((user) => user.peerId !== peerId)
    this.pingModule.users = this.connBox
    this.broadcastUsers()
  }
  handleDisconnect(peerId: PeerId) {
    const username = (
      this.connBox.find((user) => user.peerId === peerId) || {
        username: "unknown",
      }
    ).username
    this.removeUser(peerId)
    const msg: Protocol.ServerChat = {
      type: ProtocolTypes.serverChat,
      from: this.peerId,
      to: null,
      msg: `User ${username} disconnected`,
    }
    this.broadcast(msg)
  }
  _receiveData(data: NodeReceive): Result {
    const handleResult = this.msgHandler.dispatchMsg(this.connBox, data)
    handleResult.map((action) => {
      switch (action.actionType) {
        case "sendMsg":
          this._send(action.data.recipients, action.data.msg)
          break
        case "updateUsers":
          this.connBox = action.data
          this.pingModule.users = action.data
          break
        case "handle pong":
          this.pingModule.pong(action.data.from)
          break
        default:
          break
      }
    })
    return OK()
  }
  handleConnect(conn: DataConnection) {
    log(this.nodeType, "got connection", conn.metadata, conn.peer)
    const metadata = conn.metadata as UserData
    if (metadata.origin !== "FLC") {
      errlog("Invalid connection attempt from", conn)
      return false
    }
    // Override metadata provided role based on config:
    const role =
      this.adminId === conn.peer
        ? "admin"
        : this.gmIds.includes(conn.peer)
        ? "gm"
        : "player"
    const user: INodeUser = {
      ...metadata,
      conn,
      role,
      peerId: conn.peer,
    }
    // Add user:
    this.connBox.push(user)
    // Setup handling for data received from user:
    user.conn.on("data", (data) => this._receiveData(data))
    // Return current user list
    const users = ["host", "gm"].includes(user.role)
      ? this.connBox.map((user) => pullUserData(user))
      : pullFilteredUserData(this.connBox)
    const msg: Protocol.MsgUsers = {
      type: ProtocolTypes.userList,
      users,
    }
    this._send([user], msg)
    const connectedMsg: Protocol.ServerChat = {
      type: ProtocolTypes.serverChat,
      to: null,
      from: this.peerId,
      msg: `${user.username} connected`,
    }
    this.broadcast(connectedMsg)
    // this.send(user.peerId, msg)
    return true
  }
  broadcastUsers() {
    const userDataFiltered = pullFilteredUserData(this.connBox)
    const userData = this.connBox.map((user) => pullUserData(user))
    const msgFiltered: Protocol.MsgUsers = {
      type: ProtocolTypes.userList,
      users: userDataFiltered,
    }
    const msg: Protocol.MsgUsers = {
      type: ProtocolTypes.userList,
      users: userData,
    }
    this._send(this.players, msgFiltered)
    this._send(this.gms, msg)
  }
}
