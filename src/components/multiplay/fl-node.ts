/* eslint-disable no-console */
import { Err, OK, Result } from "@/util"
import {
  INodeUser,
  PeerId,
  Protocol,
  ProtocolTypes,
  UserData,
} from "@/components/multiplay/protocol"
import { DataConnection } from "peerjs"

import { CharacterData } from "@/characterData.ts"
import { FLPeer } from "@/components/multiplay/fl-peer"
import { PingModule } from "@/components/multiplay/pingModule"

// TODO: Split into multiple modules

/** Return a list of all GMs/Admins */
export function getGms(users: INodeUser[]): INodeUser[] {
  return users.filter((user) => ["gm", "admin"].includes(user.role))
}

/** Return a list of all Players */
export function getPlayers(users: INodeUser[]): INodeUser[] {
  return users.filter((user) => user.role === "player")
}

/** Take chardata and remove sensitive information */
export function filterCharData(charData: CharacterData): CharacterData {
  if (!charData) return charData // Handle null chardata
  const gear = { ...charData.gear, money: { copper: 0, gold: 0, silver: 0 } }
  return {
    ...charData,
    darkSecret: "", // Hide dark secret
    relationships: "", // Hide relationships
    notes: "", // Hide notes
    gear, // Hide money
  }
} // TODO: add test? :)

function filterCharDataList(
  charDataList: (CharacterData | null)[]
): (CharacterData | null)[] {
  return charDataList.map((char) => {
    if (!char) return null
    return filterCharData(char)
  })
}

function pullUserData(user: INodeUser): UserData {
  const { username, origin, peerId, characters, role } = user
  return { username, origin, peerId, characters, role }
}

function pullFilteredUserData(users: INodeUser[]): UserData[] {
  const filteredUsers: UserData[] = users.map((user) => {
    return {
      ...pullUserData(user),
      characters: filterCharDataList(user.characters),
    }
  })
  return filteredUsers
}

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

interface PlayerNode extends INode {
  messages: ChatMessage[]
  hostId: string | undefined
  users: UserData[]
  start(peerId?: string): Promise<Result>
  stop(): Promise<Result>
  connectTo(nodeName: string, metadata: UserData): void
  broadcast(data: Protocol.Base): Result
}

abstract class AbstractNode implements INode {
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
    const handled = console.log("got connection", conn)
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
  broadcast(data: HostSend | HostReceive, peers?: PeerId[]): Result {
    if (!peers) {
      return this._send(this.connBox, data)
    }
    const peerCons = this.connBox.filter((user) => peers.includes(user.peerId))
    return this._send(peerCons, data)
  }
}

type HostSend =
  | Protocol.Chat
  | Protocol.MsgCharacter
  | Protocol.MsgUser
  | Protocol.MsgUsers
  | Protocol.ServerChat
  | Protocol.NotifyDisconnect

type HostReceive =
  | Protocol.Chat
  | Protocol.MsgCharacter
  | Protocol.MsgUser
  | Protocol.MsgUsers
  | Protocol.NotifyDisconnect
  | Protocol.Pong

interface HandleActionSendMsg {
  actionType: "sendMsg"
  data: {
    recipients: INodeUser[]
    msg: HostSend | null
  }
}
interface HandleActionUpdateUsers {
  actionType: "updateUsers"
  data: INodeUser[]
}
interface HandlePong {
  actionType: "handle pong"
  data: Protocol.Pong
}
interface HandleNoop {
  actionType: "noop"
}
type HandleAction =
  | HandleActionSendMsg
  | HandleActionUpdateUsers
  | HandlePong
  | HandleNoop

/** Handles incoming messages to Host broker */
class HostMessageHandler {
  dispatchMsg(users: INodeUser[], incoming: HostReceive): HandleAction[] {
    switch (incoming.type) {
      case ProtocolTypes.chat:
        return this.handleMsgChat(users, incoming)
      case ProtocolTypes.disconnect:
        return this.handleNotifyDisconnect(users, incoming)
      case ProtocolTypes.charData:
        return this.handleMsgCharacter(users, incoming)
      case ProtocolTypes.userData: // user update; filter chardata from user, broadcast
        return this.handleMsgUser(users, incoming)
      case ProtocolTypes.pong:
        return [{ actionType: "handle pong", data: incoming }]
      default:
        console.error("Host got unhandled message", incoming)
        return [{ actionType: "noop" }] // noop
    }
  }
  handleMsgChat(
    users: INodeUser[],
    chat: Protocol.Chat
  ): HandleActionSendMsg[] {
    if (chat.to) {
      const recipient = users.filter((user) => user.peerId === chat.to)
      // return { actions: [{ recipients: recipient, msg: chat }] }
      return [
        {
          actionType: "sendMsg",
          data: { recipients: recipient, msg: chat },
        },
      ]
    }
    return [{ actionType: "sendMsg", data: { recipients: users, msg: chat } }]
  }
  /** Update character; broadcast character update, distinguishing between gms and players */
  handleMsgCharacter(
    connBox: INodeUser[],
    charMsg: Protocol.MsgCharacter
  ): (HandleActionSendMsg | HandleActionUpdateUsers)[] {
    const updatedUsers = connBox.map((user) => {
      if (user.peerId === charMsg.peerId) {
        const characters = user.characters.map((char) => {
          if (char && char.metadata.id === charMsg.character.metadata.id) {
            return charMsg.character
          }
          return char
        })
        return { ...user, characters }
      }
      return user
    })
    const gms = getGms(updatedUsers)
    const players = getPlayers(updatedUsers)
    const { type, peerId, character } = charMsg
    const playerCharMsg: Protocol.MsgCharacter = {
      type,
      peerId,
      character: filterCharData(character),
    }
    return [
      { actionType: "updateUsers", data: updatedUsers },
      { actionType: "sendMsg", data: { recipients: gms, msg: charMsg } },
      {
        actionType: "sendMsg",
        data: { recipients: players, msg: playerCharMsg },
      },
    ]
  }
  /** Take user data, add to own list of users, send to GMs, send filtered userdata to players */
  handleMsgUser(
    connBox: INodeUser[],
    userMsg: Protocol.MsgUser
  ): (HandleActionSendMsg | HandleActionUpdateUsers)[] {
    // broadcast user
    const updatedUsers: INodeUser[] = connBox.map((user: INodeUser) => {
      if (user.peerId === userMsg.peerId) {
        return { ...user, userMsg }
      }
      return user
    })
    const gms: INodeUser[] = getGms(updatedUsers)
    const userListForGms: UserData[] = updatedUsers.map((user) =>
      pullUserData(user)
    )
    const userListMsg: Protocol.MsgUsers = {
      type: ProtocolTypes.userList,
      users: userListForGms,
    }
    const players: INodeUser[] = getPlayers(updatedUsers)
    const userListForPlayers: UserData[] = pullFilteredUserData(updatedUsers)
    const filteredUserListMsg: Protocol.MsgUsers = {
      type: ProtocolTypes.userList,
      users: userListForPlayers,
    }
    return [
      { actionType: "updateUsers", data: updatedUsers },
      { actionType: "sendMsg", data: { recipients: gms, msg: userListMsg } },
      {
        actionType: "sendMsg",
        data: { recipients: players, msg: filteredUserListMsg },
      },
    ]
  }
  handleNotifyDisconnect(
    connBox: INodeUser[],
    msg: Protocol.NotifyDisconnect
  ): HandleActionSendMsg[] {
    // Or send userlist sans disconnected user? Or send server message about disconnect?
    console.log("TODO: handle disconnects")
    return [{ actionType: "sendMsg", data: { recipients: connBox, msg } }]
  }
}

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

  _receiveData(data: HostReceive): Result {
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
    console.log(this, "got connection", conn)
    const metadata = conn.metadata as UserData
    if (metadata.origin !== "FLC") {
      console.error("Invalid connection attempt from", conn)
      return false
    }
    // Override metadata provided role based on config:
    const role =
      this.adminId === metadata.peerId
        ? "admin"
        : this.gmIds.includes(metadata.peerId)
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

type PlayerReceive = HostSend | Protocol.Ping

export class FLPlayer extends AbstractNode implements PlayerNode {
  private handler = new PlayerMessageHandler()
  constructor(public nodeType: string = "FLPlayer") {
    super(nodeType)
  }

  public users: UserData[] = []

  public messages: ChatMessage[] = []

  public get hostId(): string | undefined {
    return (this.hostConn || {}).peerId
  }
  private get hostConn() {
    return this.connBox[0]
  }
  private set hostConn(hostConn: INodeUser) {
    this.connBox = [hostConn]
  }

  /** Connect to and setup host */
  async connectTo(roomName: string, userdata: UserData) {
    const conn = await this.peer.connectTo(roomName, userdata)
    if (!conn) {
      return
    }
    conn.on("data", (data) => this._receiveData(data))
    const hostUser: INodeUser = {
      conn,
      role: "broker",
      peerId: conn.peer,
      username: "host broker",
      characters: [],
      origin: "FLC",
    }
    this.hostConn = hostUser
    const userDataMsg: Protocol.MsgUser = {
      type: ProtocolTypes.userData,
      ...userdata,
      peerId: this.peerId,
    }
    this.broadcast(userDataMsg)
  }

  async start() {
    const result = await this.peer.connectSelf()
    this.handler.playerId = this.peerId
    return result
  }

  _addChat(data: Protocol.Chat | Protocol.ServerChat) {
    const username = (
      this.users.find((user) => user.peerId === data.from) || {
        username: "???",
      }
    ).username
    const newMsg = { username, message: data }
    this.messages.push(newMsg)
  }
  _receiveData(data: PlayerReceive): Result {
    const ev = this.handler.dispatchMsg(this.connBox, data)
    switch (ev.action) {
      case "add chat":
        this._addChat(ev.data)
        break
      case "update userlist":
        this.users = ev.data
        break
      case "send pong":
        this.hostConn.conn.send(ev.data)
        break
      case "???":
      default:
        return Err(`invalid action: ${ev.action}, ${ev.data || "no data"}`)
    }
    return OK()
  }
}

interface ActionChat {
  action: "add chat"
  data: Protocol.Chat | Protocol.ServerChat
}
interface ActionUpdateUsers {
  action: "update userlist"
  data: UserData[]
}
interface ActionPing {
  action: "send pong"
  data: Protocol.Pong
}

interface ActionNull {
  action: "???"
  data: any
}
type PlayerHandle = ActionChat | ActionNull | ActionUpdateUsers | ActionPing

/** Handle incoming messages to FLPlayer */
class PlayerMessageHandler {
  public playerId: PeerId = ""
  dispatchMsg(users: UserData[], message: PlayerReceive): PlayerHandle {
    switch (message.type) {
      case ProtocolTypes.chat:
      case ProtocolTypes.serverChat:
        return this.handleChat(message)
      case ProtocolTypes.disconnect:
        return this.handleDisconnect(users, message)
      case ProtocolTypes.userList:
        return this.handleUserList(message)
      case ProtocolTypes.userData:
        return this.handleUser(users, message)
      case ProtocolTypes.charData:
        return this.handleChar(users, message)
      case ProtocolTypes.ping:
        return this.handlePing(message)
      default:
        console.error(`Got unhandled message ${message}`)
        return { action: "???", data: message }
    }
  }
  handleChar(
    users: UserData[],
    charUpdate: Protocol.MsgCharacter
  ): ActionUpdateUsers {
    const nusers = users.map((user) => {
      if ((user.peerId = charUpdate.peerId)) {
        user.characters.map((char) => {
          if (char && char.metadata.id === charUpdate.character.metadata.id) {
            return charUpdate.character
          }
          return char
        })
      }
      return user
    })
    return {
      action: "update userlist",
      data: nusers,
    }
  }
  handleUser(
    users: UserData[],
    userUpdate: Protocol.MsgUser
  ): ActionUpdateUsers {
    const nusers = users.map((user) => {
      if ((user.peerId = userUpdate.peerId)) {
        return userUpdate
      }
      return user
    })
    return {
      action: "update userlist",
      data: nusers,
    }
  }
  handleUserList(userListUpdate: Protocol.MsgUsers): ActionUpdateUsers {
    return {
      action: "update userlist",
      data: userListUpdate.users,
    }
  }
  handleChat(chat: Protocol.Chat | Protocol.ServerChat): ActionChat {
    return {
      action: "add chat",
      data: chat,
    }
  }
  handleDisconnect(
    users: UserData[],
    disconnected: Protocol.NotifyDisconnect
  ): ActionUpdateUsers {
    const data = users.filter((user) => user.peerId !== disconnected.peerId)
    return { action: "update userlist", data }
  }
  handlePing(data: Protocol.Ping): ActionPing {
    const response: Protocol.Pong = {
      type: ProtocolTypes.pong,
      from: this.playerId,
      pingId: data.pingId,
    }
    return { action: "send pong", data: response }
  }
}
