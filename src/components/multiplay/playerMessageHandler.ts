import {
  PeerId,
  Protocol,
  ProtocolTypes,
  UserData,
} from "@/components/multiplay/protocol"

import { NodeSend } from "./fl-node"
import { errlog } from "@/util/util"

export type PlayerReceive = NodeSend | Protocol.Ping

/** Handle incoming messages to FLPlayer */
export class PlayerMessageHandler {
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
        errlog(`Got unhandled message ${message}`)
        return { action: "???", data: message }
    }
  }
  handleChar(
    users: UserData[],
    charUpdate: Protocol.MsgCharacter
  ): ReactionUpdateChar {
    const nusers = users.map((user) => {
      if (user.peerId !== charUpdate.peerId) {
        return user
      }
      const nchars = user.characters.map((char) => {
        if (char && char.metadata.id === charUpdate.character.metadata.id) {
          return charUpdate.character
        }
        return char
      })
      return { ...user, characters: nchars }
    })
    return {
      action: "update character",
      data: nusers,
    }
  }
  handleUser(
    users: UserData[],
    userUpdate: Protocol.MsgUser
  ): ReactionUpdateUsers {
    const nusers = users.map((user) => {
      if (user.peerId === userUpdate.peerId) {
        return userUpdate
      }
      return user
    })
    return {
      action: "update userlist",
      data: nusers,
    }
  }
  handleUserList(userListUpdate: Protocol.MsgUsers): ReactionUpdateUsers {
    return {
      action: "update userlist",
      data: userListUpdate.users,
    }
  }
  handleChat(chat: Protocol.Chat | Protocol.ServerChat): ReactionChat {
    return {
      action: "add chat",
      data: chat,
    }
  }
  handleDisconnect(
    users: UserData[],
    disconnected: Protocol.NotifyDisconnect
  ): ReactionUpdateUsers {
    const data = users.filter((user) => user.peerId !== disconnected.peerId)
    return { action: "update userlist", data }
  }
  handlePing(data: Protocol.Ping): ReactionPing {
    const response: Protocol.Pong = {
      type: ProtocolTypes.pong,
      from: this.playerId,
      pingId: data.pingId,
    }
    return { action: "send pong", data: response }
  }
}

type PlayerHandle =
  | ReactionChat
  | ReactionNull
  | ReactionUpdateUsers
  | ReactionUpdateChar
  | ReactionPing

interface ReactionChat {
  action: "add chat"
  data: Protocol.Chat | Protocol.ServerChat
}

interface ReactionUpdateChar {
  action: "update character"
  data: UserData[]
}

interface ReactionUpdateUsers {
  action: "update userlist"
  data: UserData[]
}

interface ReactionPing {
  action: "send pong"
  data: Protocol.Pong
}

interface ReactionNull {
  action: "???"
  data: any
}
