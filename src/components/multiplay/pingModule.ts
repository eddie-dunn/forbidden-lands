import { INodeUser, PeerId, Protocol } from "@/components/multiplay/protocol"

import uuid1 from "uuid/v1"

/** Number of failed ping attempts before declaring user disconnected */
const PING_LIMIT = 3

export class PingModule {
  private pingTask: NodeJS.Timeout | null = null
  private pingMap: { [index: string]: Protocol.Ping[] } = {}
  public users: INodeUser[] = []
  constructor(
    public pingLimitCb: (peerId: PeerId) => void = () => {},
    public interval = 2000
  ) {}

  start() {
    this.stop()
    this.pingTask = setInterval(() => this.pingUsers(), this.interval)
    return this.pingTask
  }

  stop() {
    if (this.pingTask) clearInterval(this.pingTask)
    this.pingMap = {}
  }

  pingUsers() {
    this.users.map((user) => {
      if (!this.pingMap[user.peerId]) {
        this.pingMap[user.peerId] = []
      }
      if (this.pingMap[user.peerId].length > PING_LIMIT) {
        this.pingLimitCb(user.peerId)
      }
      const msg = this.ping(user)
      this.pingMap[user.peerId].push(msg)
    })
  }

  pong(from: PeerId) {
    this.pingMap[from] = []
  }

  ping(user: INodeUser): Protocol.Ping {
    const msg: Protocol.Ping = {
      type: "ping",
      pingId: uuid1(),
    }
    user.conn.send(msg)
    return msg
  }
}
