/* eslint-disable no-bitwise */
import type { RGB, HSL, HSV, HEX, RGBA } from './type';

export function isHsv(color: string): color is 'hsv' {
  return /^hsv\((\d{1,3}),\s*(\d{1,3})%,\s*(\d{1,3})%\)$/.test(color);
}

export function hsvToRgb({ h, s, v }: HSV): RGB {
  let r = 0;
  let g = 0;
  let b = 0;
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    case 5:
      r = v;
      g = p;
      b = q;
      break;
    default:
      break;
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

export function hsvToHsl({ h, s, v }: HSV): HSL {
  const hValue = h;
  let sValue = s * v;
  let lValue = (2 - s) * v;
  sValue /= lValue <= 1 ? lValue : 2 - lValue;
  lValue /= 2;

  return { h: hValue, s: sValue, l: lValue };
}

export function hsvToHex({ h, s, v }: HSV): HEX {
  const sValue = Math.max(0, Math.min(1, s));
  const vValue = Math.max(0, Math.min(1, v));

  const c = vValue * sValue;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = vValue - c;

  let r;
  let g;
  let b;

  if (h >= 0 && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h >= 60 && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h >= 180 && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h >= 240 && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else {
    r = c;
    g = 0;
    b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  // Convert to hex
  const hex = `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1).toUpperCase()}`;

  return hex;
}

export function hsvToRgba({ h, s, v }: HSV): RGBA {
  const hValue = h % 360;
  const sValue = s / 100;
  const vValue = v / 100;

  const c = vValue * sValue;
  const x = c * (1 - Math.abs(((hValue / 60) % 2) - 1));
  const m = vValue - c;

  let r = 0;
  let g = 0;
  let b = 0;

  if (hValue < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (hValue < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (hValue < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (hValue < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (hValue < 300) {
    r = x;
    g = 0;
    b = c;
  } else {
    r = c;
    g = 0;
    b = x;
  }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
    a: 1,
  };
}
