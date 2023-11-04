export type MessageType = 'TEXT' | 'PIXEL' | 'POLL' | 'DMREQUEST' | string | null;
export type MessageInterfaces = string | PixelMessage | PollMessage;

export type HexColor = `#${string}`;

// Even in an encrypted room the x/y will be unencrypted so we can overwrite the pixel with the encrypted value in the db
export interface PixelMessage {
  x: number;
  y: number;
  color: HexColor | string;
}

export interface PollMessage {
  title: string;
  options: string[];
}
