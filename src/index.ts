import type { RLNFullProof } from 'rlnjs';
export { str2BigInt, genId, randomBigInt } from './utils';
export type IdentityCommitmentT = bigint | string;

export enum RoomType {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
  PIXEL = 'PIXEL'
}

export interface BandadaGroupI {
  groupID: string;
  url: string;
}
export interface RLNContractI {
  address: string;
  chainId: number;
}

export interface MessageI {
  id?: string; // database ID
  messageId?: string; // internal nullifier as string
  roomId?: RLNFullProof['rlnIdentifier'];
  message: string;
  proof?: RLNFullProof;
  epoch?: number | bigint;
  timestamp?: string; // unix epoch time in ms as string
}

export interface SystemMessageI {
  timestamp: string; // unix epoch time in ms as string
  message: string; // plain text message
  room?: RLNFullProof['rlnIdentifier']; // optionally send it to one room or all rooms
}

enum RoomMembershipType {
  IDENTITY_LIST = 'IDENTITY_LIST',
  RLN_CONTRACT = 'RLN_CONTRACT',
  BANDADA = 'BANDADA'
}

export interface RoomI {
  id: string; // database ID
  roomId: RLNFullProof['rlnIdentifier'] | string; // RLN Identifier
  name: string; // Readable name
  rateLimit?: number; // Milliseconds between epochs
  banRateLimit?: number; // starting number of epochs banned for
  userMessageLimit?: number; // default number of messages per epoch per user
  membershipType?: RoomMembershipType;
  identities?: IdentityCommitmentT[];
  contractAddress?: RLNContractI;
  bandadaAddress?: BandadaGroupI;
  epochs?: any[]; // this is for use in the db, not for the client
  messages?: MessageI[]; // this is a list of messages DATABASE REFERENCES to messages
  claimCodes?: string[]; // this is a list of claim codes for the room
  type?: RoomType; // Public or private, if undefinied, assume public
}

export interface ServerI {
  id: bigint;
  name: string;
  version?: string;
  serverInfoEndpoint?: string;
  messageHandlerSocket?: string; // Default port for websocket connections
  rooms?: RoomI[];
  selectedRoom?: RoomI['roomId'];
}
