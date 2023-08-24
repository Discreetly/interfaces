export type MessageType = 'TEXT' | 'PIXEL' | 'BBS' | 'POLL';
export type MessageInterfaces = string | PixelMessage | BBSMessage | PollMessage;

export type HexColor = `#${string}`;

export interface PixelMessage {
  x: number;
  y: number;
  color: HexColor;
}

export interface BBSMessage {
  title: string;
  body: string;
}

export interface PollMessage {
  title: string;
  options: string[];
}
