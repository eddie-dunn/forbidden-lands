import Peer, { DataConnection } from "peerjs"

import { CharacterData } from "@/characterData.ts"

// Event types & values
type user_connect = "user connects"
type user_disconnect = "user disconnects"
type user_chat = "user sends chat"
type user_update = "user updates character"
type server_msg = "server sends message"

/** Type alias to designate another peer */
export type PeerId = string // ID assigned by peerjs

export type RolePlayer = "player"
export type RoleGm = "gm"
export type RoleAdmin = "admin"
export type RoleBroker = "broker"
/** Designates type of user in FL Multiplayer
 *
 * player: Normal player, can only see filtered data
 * gm: GM player, can see unfiltered player data
 * admin: Host GM, controls the host/broker
 * broker: Non-player, controlled by admin, brokers messages between everyone else
 */
export type UserRole = RoleAdmin | RoleGm | RolePlayer | RoleBroker

/** User data sent between peers */
export interface UserData {
  characters: (CharacterData | null)[]
  peerId: PeerId // unique id
  role: UserRole
  username: string
  origin: "FLC" // Use to verify that connecting peer is FLC player
}

/** User data & connection */
export interface INodeUser extends UserData {
  conn: DataConnection // peerjs connection
}

/** Protocol types. */
export enum ProtocolTypes {
  chat = "!? chat",
  serverChat = "!? server chat",
  userList = "!? user list",
  userData = "!? user data",
  charData = "!? character data",
  ping = "ping",
  pong = "pong",
  disconnect = "! disconnect",
}
/** Spec for messages sent between peers. */
export declare namespace Protocol {
  interface Base {
    // type: string
    type: ProtocolTypes
  }

  /** Send/receive chat message */
  interface Chat extends Base {
    // type: "!? chat"
    type: ProtocolTypes.chat
    msg: string
    from: PeerId
    to: PeerId | null // null => public message
  }

  /** Send/receive server message */
  interface ServerChat extends Base {
    type: ProtocolTypes.serverChat
    msg: string
    from: PeerId
    to: null
  }

  /** Send/receive user list
   *
   * From: Server.
   * To: Newly connected user.
   */
  interface MsgUsers extends Base {
    type: ProtocolTypes.userList
    users: UserData[]
  }

  /** Send/receive user data
   *
   * From: Newly connected user; server.
   * To: Server; existing users.
   */
  interface MsgUser extends Base, UserData {
    type: ProtocolTypes.userData
    // user: UserData
  }

  /** Send/receive character data.
   *
   * NOTE: Is this needed? Could be fulfilled with MsgUser?
   *
   * From: User updating a character; server.
   * To: Server; other users.
   */
  interface MsgCharacter extends Base {
    type: ProtocolTypes.charData
    peerId: PeerId
    character: CharacterData
  }

  interface Ping extends Base {
    type: ProtocolTypes.ping
    pingId: string
  }

  interface Pong extends Base {
    type: ProtocolTypes.pong
    pingId: string
    from: PeerId
  }

  // Responses -- one way

  /** Notify that disconnect is imminent */
  interface NotifyDisconnect extends Base {
    type: ProtocolTypes.disconnect
    peerId: PeerId
  }
}

/**
 *  PeerJS doesn't currently support error types, so let's declare them here
 */
export type PeerJSError =
  /**
   * ERROR FATAL
   * The client's browser does not support some or all WebRTC features that you
   * are trying to use. */
  | "browser-incompatible"
  /**
   *You've already disconnected this peer from the server and can no
   * longer make any new connections on it. */
  | "disconnected" // ERROR
  /**
   * The ID passed into the Peer constructor contains illegal characters. */
  | "invalid-id" // ERROR FATAL
  /**
   * The API key passed into the Peer constructor contains illegal characters or
   * is not in the system (cloud server only). */
  | "invalid-key" // ERROR FATAL
  /**
   *  Lost or cannot establish a connection to the signalling server. */
  | "network" // ERROR
  /**
   * The peer you're trying to connect to does not exist. */
  | "peer-unavailable" // ERROR
  /**
   * PeerJS is being used securely, but the cloud server does not support SSL.
   * Use a custom PeerServer. */
  | "ssl-unavailable" // ERROR FATAL
  /**
   * Unable to reach the server. */
  | "server-error" // ERROR FATAL
  /**
   * An error from the underlying socket. */
  | "socket-error" // ERROR FATAL
  /**
   * The underlying socket closed unexpectedly. */
  | "socket-closed" // ERROR FATAL
  /**
   * The ID passed into the Peer constructor is already taken. This error is not
   * fatal if your peer has open peer-to-peer connections. This can happen if
   * you attempt to reconnect a peer that has been disconnected from the server,
   * but its old ID has now been taken. */
  | "unavailable-id" // ERROR SOMETIMES FATAL
  /**
   * Native WebRTC errors. */
  | "webrtc" // ERROR

/*
# Protocol

- multiple events can happen
- each event has a corresponding send/receive action
- each action contains pertinent data

## Events
1. user connects
2. user disconnects
3. user sends chat
4. user updates character
5. server sends chat
6. server sends ping

## Actions
Event #1: 'user connect'
User: send 'user data' to server
Server: filter received user data, send 'user data' to players & GMs

Event #2: 'user disconnect'
User: notify server of 'imminent disconnect'
Server: remove user from user list, broadcast 'updated userlist'

Event #3: 'user sends chat'
User: send 'chat message' to server
Server: relay 'chat message' to recipients

Event: 'user updates character'
User: Send 'character update' to server
Server: Send unfiltered 'character update' to GMs, Send filtered 'character update' to Players

Event: 'server sends chat'
Server: Send 'server chat'
Users: Receive & display 'server chat'

Event: 'server sends ping'
Server: Send 'ping' to user
User: Send 'pong' to server
 */
