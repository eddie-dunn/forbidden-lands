import { AbstractNode, ChatMessage, PlayerNode } from "./fl-node"
import { Err, OK, Result } from "@/util"
import {
  INodeUser,
  Protocol,
  ProtocolTypes,
  UserData,
} from "@/components/multiplay/protocol"
import { PlayerMessageHandler, PlayerReceive } from "./playerMessageHandler"

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
