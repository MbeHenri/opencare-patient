import { Buffer } from 'buffer';

export function base64(str: string): string {
  return Buffer.from(str, "binary").toString("base64");
}
