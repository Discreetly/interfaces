import type { RLNFullProof } from 'rlnjs';
export * from './utils';
export type IdentityCommitmentT = bigint | string;

export interface MessageI {
  id?: string; // database ID
  messageId?: string; // internal nullifier as string
  roomId?: RLNFullProof['rlnIdentifier'] | string;
  message: string;
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
  membershipType?: string;
  identities?: IdentityCommitmentT[];
  semaphoreIdentities?: IdentityCommitmentT[];
  contractAddress?: string; // RLN_CONTRACT as "chainID:0xADDRESS"
  bandadaAddress?: string; // Bandada root url address
  bandadaGroupId?: string; // Bandada group id
  epochs?: any[]; // this is for use in the db, not for the client
  messages?: MessageI[]; // this is a list of messages DATABASE REFERENCES to messages
  claimCodes?: string[]; // this is a list of claim codes for the room
  type?: string; // Public or private, if undefinied, assume public
}

export interface ServerI {
  id?: bigint | string;
  name?: string;
  version?: string;
  url?: string;
  rooms?: string[];
}
