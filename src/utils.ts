import { poseidon2 } from 'poseidon-lite/poseidon2';

export function str2BigInt(str: string) {
  let num = '';
  for (let i = 0; i < str.length; i++) {
    num += str.charCodeAt(i).toString();
  }
  return BigInt(num);
}

/**
 * @description Generates a room ID from a server ID and room name
 * @param serverID : bigint | string | number
 * @param roomName : bigint | string | number
 * @returns roomId : bigint
 */
export function genId(serverID: string | bigint | number, roomName: string | bigint | number) {
  if (typeof roomName === 'string') {
    return poseidon2([BigInt(serverID), str2BigInt(roomName)]);
  }
  return poseidon2([serverID, BigInt(roomName)]);
}

export function randomBigInt(bits: number = 253) {
  let hexBits = bits / 4;
  let hexString = '';
  for (let i = 0; i < hexBits; i++) {
    hexString += Math.floor(Math.random() * 16).toString(16);
  }
  return BigInt('0x' + hexString);
}

/**
 * @description Hashes the identity commitment and user message limit into the rate commitment
 * @param identityCommitment Semaphore Identity Commitment
 * @param userMessageLimit Number of messages a user can send per RLN epoch
 * @returns rlnRateCommitment
 */
export function getRateCommitmentHash(
  identityCommitment: bigint,
  userMessageLimit: number | bigint
): bigint {
  return poseidon2([identityCommitment, userMessageLimit]);
}
