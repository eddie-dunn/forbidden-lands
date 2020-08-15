import {
  INodeUser,
  Protocol,
  ProtocolTypes,
  UserData,
} from "@/components/multiplay/protocol"
import { NodeReceive, NodeSend } from "./fl-node"
import { errlog, log } from "@/util/util"
import {
  filterCharData,
  getGms,
  getPlayers,
  pullFilteredUserData,
  pullUserData,
} from "./multiplay-util"

/** Handles incoming messages to Host broker */
export class HostMessageHandler {
  dispatchMsg(users: INodeUser[], incoming: NodeReceive): HandleAction[] {
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
        errlog("Host got unhandled message", incoming)
        return [{ actionType: "noop" }] // noop
    }
  }
  handleMsgChat(users: INodeUser[], chat: Protocol.Chat): ActionSendMsg[] {
    if (chat.to) {
      const recipient = users.filter((user) => user.peerId === chat.to)
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
  ): (ActionSendMsg | ActionUpdateUsers)[] {
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
  ): (ActionSendMsg | ActionUpdateUsers)[] {
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
  ): ActionSendMsg[] {
    // Or send userlist sans disconnected user? Or send server message about disconnect?
    log("TODO: handle disconnects")
    return [{ actionType: "sendMsg", data: { recipients: connBox, msg } }]
  }
}

type HandleAction = ActionSendMsg | ActionUpdateUsers | ActionPong | ActionNoop

export interface ActionSendMsg {
  actionType: "sendMsg"
  data: {
    recipients: INodeUser[]
    msg: NodeSend | null
  }
}

export interface ActionUpdateUsers {
  actionType: "updateUsers"
  data: INodeUser[]
}

export interface ActionPong {
  actionType: "handle pong"
  data: Protocol.Pong
}

export interface ActionNoop {
  actionType: "noop"
}
