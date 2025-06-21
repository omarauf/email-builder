export interface RGB {
  r: number;
  g: number;
  b: number;
}
export interface RGBA {
  r: number;
  g: number;
  b: number;
  a: number;
}
export interface HSL {
  h: number;
  s: number;
  l: number;
}
export interface HSV {
  h: number;
  s: number;
  v: number;
}
export type HEX = string;

export type Color = RGB | HSL | HSV | HEX;
export type ColorType = 'rgb' | 'hex' | 'hsl' | 'hsv' | 'rgba';
export interface ColorMap {
  rgb: RGB;
  hex: string;
  hsl: HSL;
  hsv: HSV;
  rgba: RGBA;
}
