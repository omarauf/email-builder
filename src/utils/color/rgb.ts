/* eslint-disable no-bitwise */
import type { RGB, HSL, HSV, HEX, RGBA } from './type';

/**
 * this function checks if the color is in rgb format. example:
 * rgb(255, 255, 255) or rgb(0, 0, 0) true
 * rgb(128,36,84) true
 * rgb( 255, 255, 255) false
 * @param color rgb color string
 * @returns true if the color is in rgb format
 */
export function isRgb(color: string): color is 'rgb' {
  return /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/.test(color);
}

export function rgbToHex({ r, g, b }: RGB): HEX {
  return `#${((r << 16) + (g << 8) + b).toString(16).padStart(6, '0')}`;
}

export function rgbToHsl({ r, g, b }: RGB): HSL {
  r /= 255;
  g /= 255;
  b /= 255;

  const cMax = Math.max(r, g, b);
  const cMin = Math.min(r, g, b);
  const delta = cMax - cMin;

  let h = 0;
  let s = 0;
  let l = (cMax + cMin) / 2;

  if (delta !== 0) {
    if (cMax === r) {
      h = ((g - b) / delta) % 6;
    } else if (cMax === g) {
      h = (b - r) / delta + 2;
    } else {
      h = (r - g) / delta + 4;
    }

    h = Math.round(h * 60);
    if (h < 0) h += 360;
  }

  if (delta !== 0) {
    s = delta / (1 - Math.abs(2 * l - 1));
  } else {
    s = 0;
  }

  s = Math.round(s * 100);

  l = Math.round(l * 100);

  return { h, s, l };
}

export function rgbToHsv({ r, g, b }: RGB): HSV {
  const v = Math.max(r, g, b);
  const c = v - Math.min(r, g, b);
  const h = c && (v === r ? (g - b) / c : v === g ? 2 + (b - r) / c : 4 + (r - g) / c);
  return {
    h: 60 * (h < 0 ? h + 6 : h),
    s: v && (c / v) * 100,
    v: (v / 255) * 100,
  };
}

export function rgbToRgba({ r, g, b }: RGB, a = 1): RGBA {
  return { r, g, b, a };
}
