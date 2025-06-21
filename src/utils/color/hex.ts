/* eslint-disable no-bitwise */
import type { HEX, RGB, HSL, HSV, RGBA } from './type';

export function isHex(color: string): color is 'hex' {
  // const ex = /^#([\da-f]{3}){1,2}$/i;
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
}

export function hexToRgb(hex: HEX): RGB {
  if (!isHex(hex)) return { r: 0, g: 0, b: 0 };

  const hexValue = hex.replace('#', '');
  const bigint = parseInt(hexValue, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
}

export function hexToHsl(hex: HEX): HSL {
  if (!isHex(hex)) return { h: 0, s: 0, l: 0 };

  let r: any = 0;
  let g: any = 0;
  let b: any = 0;
  if (hex.length === 4) {
    r = `0x${hex[1]}${hex[1]}`;
    g = `0x${hex[2]}${hex[2]}`;
    b = `0x${hex[3]}${hex[3]}`;
  } else if (hex.length === 7) {
    r = `0x${hex[1]}${hex[2]}`;
    g = `0x${hex[3]}${hex[4]}`;
    b = `0x${hex[5]}${hex[6]}`;
  }

  r /= 255;
  g /= 255;
  b /= 255;
  const cMin = Math.min(r, g, b);
  const cMax = Math.max(r, g, b);
  const delta = cMax - cMin;
  let h = 0;
  let s = 0;
  let l = 0;

  if (delta === 0) h = 0;
  else if (cMax === r) h = ((g - b) / delta) % 6;
  else if (cMax === g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h *= 60;

  if (h < 0) h += 360;

  l = (cMax + cMin) / 2;
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return { h, s, l };
}

export function hexToHsv(hex: HEX): HSV {
  const hexValue = hex.replace('#', '');

  let r = parseInt(hexValue.substring(0, 2), 16);
  let g = parseInt(hexValue.substring(2, 4), 16);
  let b = parseInt(hexValue.substring(4, 6), 16);

  r /= 255;
  g /= 255;
  b /= 255;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);
  const delta = max - min;

  let h = 0;
  const s = max === 0 ? 0 : delta / max;
  const v = max;

  if (delta !== 0) {
    if (max === r) h = (g - b) / delta;
    else if (max === g) h = 2 + (b - r) / delta;
    else h = 4 + (r - g) / delta;

    h *= 60;
    if (h < 0) h += 360;
  }

  return { h, s: s * 100, v: v * 100 };
}

export function hexToRgba(hex: HEX): RGBA {
  // Remove the leading '#' if present
  let hexValue = hex.replace(/^#/, '');

  // Expand shorthand #RGB or #RGBA → #RRGGBB or #RRGGBBAA
  if (hexValue.length === 3 || hexValue.length === 4) {
    hexValue = hexValue
      .split('')
      .map((char) => char + char)
      .join('');
  }

  if (hexValue.length !== 6 && hexValue.length !== 8) {
    throw new Error(`Invalid HEX color: ${hexValue}`);
  }

  const r = parseInt(hexValue.slice(0, 2), 16);
  const g = parseInt(hexValue.slice(2, 4), 16);
  const b = parseInt(hexValue.slice(4, 6), 16);
  const a = hexValue.length === 8 ? parseInt(hexValue.slice(6, 8), 16) / 255 : 1;

  return { r, g, b, a };
}
