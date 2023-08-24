import type { RLNFullProof } from 'rlnjs';
import { MessageType, MessageInterfaces } from './messageTypes';
export * from './utils';
export * from './messageTypes';
export type IdentityCommitmentT = bigint | string;
export type RoomType = 'PUBLIC' | 'PRIVATE';
export type MembershipType = 'IDENTITY_LIST' | 'BANDADA_GROUP';

export interface MessageI {
  id?: string; // database ID
  messageId?: string; // internal nullifier as string
  roomId?: RLNFullProof['rlnIdentifier'] | string;
  messageType?: MessageType;
  message: MessageInterfaces | string; // TODO remove string once we have a migrationinterface
  proof?: RLNFullProof | string;
  epoch?: number | bigint;
  timeStamp?: string | Date | number; // unix epoch time in ms as string
}

export interface SystemMessageI {
  timeStamp: string; // unix epoch time in ms as string
  message: string; // plain text message
  room?: RLNFullProof['rlnIdentifier'] | string; // optionally send it to one room or all rooms
}

export interface RoomI {
  id: string; // database ID
  roomId: RLNFullProof['rlnIdentifier'] | string; // RLN Identifier
  name: string; // Readable name
  rateLimit?: number; // Milliseconds between epochs
  banRateLimit?: number; // starting number of epochs banned for
  userMessageLimit?: number; // default number of messages per epoch per user
  membershipType?: MembershipType | string; // TODO remove string once we have a migration
  identities?: IdentityCommitmentT[];
  semaphoreIdentities?: IdentityCommitmentT[];
  adminIdentities?: IdentityCommitmentT[];
  contractAddress?: string; // RLN_CONTRACT as "chainID:0xADDRESS"
  bandadaAddress?: string; // Bandada root url address
  bandadaGroupId?: string; // Bandada group id
  epochs?: any[]; // this is for use in the db, not for the client
  messages?: MessageI[]; // this is a list of messages DATABASE REFERENCES to messages
  claimCodes?: string[]; // this is a list of claim codes for the room
  type?: RoomType | string; // Room Type // TODO remove string once we have a migration
}

export interface ServerI {
  id?: bigint | string;
  name?: string;
  version?: string;
  url?: string;
  rooms?: string[];
}
