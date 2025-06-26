import type { HSL, HSV, RGB, RGBA, Color, ColorMap, ColorType } from './type';
import { isHex, hexToHsl, hexToHsv, hexToRgb, hexToRgba } from './hex';
import { isHsl, hslToHex, hslToHsv, hslToRgb, hslToRgba } from './hsl';
import { isHsv, hsvToHex, hsvToHsl, hsvToRgb, hsvToRgba } from './hsv';
import { isRgb, rgbToHex, rgbToHsl, rgbToHsv, rgbToRgba } from './rgb';
import { isRgba, rgbaToHex, rgbaToHsl, rgbaToHsv, rgbaToRgb } from './rgba';

// ----------------------------------------------

// function to check if light is light or dark and return 1 if is dark and 0 if is light
export function isLight(color?: string) {
  if (!color) {
    console.error('Please provide a color code to check.', color);
    return undefined;
  }

  const c = autoConvert(color, 'rgb');
  if (c === undefined) {
    console.error('Failed to convert color to RGB.', color);
    return undefined;
  }

  const { r, b, g } = c;

  // Calculate luminance using the formula: L = 0.299 * R + 0.587 * G + 0.114 * B
  const a = [r, g, b].map((v) => {
    const vNorm = v / 255;
    return vNorm <= 0.03928 ? vNorm / 12.92 : ((vNorm + 0.055) / 1.055) ** 2.4;
  });
  const luminance = a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;

  // Check if luminance is above a threshold to determine if the color is light
  const threshold = 0.5; // You can adjust this threshold based on your preference
  return luminance > threshold ? 1 : 0;
}

export function generateRandomColor() {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return `#${randomColor}`;
}

// ----------------------------------------------

function getColorType(color: Color): ColorType | undefined {
  if (typeof color === 'string') {
    if (isRgba(color)) return 'rgba';
    if (isRgb(color)) return 'rgb';
    if (isHsl(color)) return 'hsl';
    if (isHsv(color)) return 'hsv';
    if (isHex(color)) return 'hex';
  }

  if (typeof color === 'object') {
    if ('r' in color && 'g' in color && 'b' in color) return 'rgb';
    if ('h' in color && 's' in color && 'l' in color) return 'hsl';
    if ('h' in color && 's' in color && 'v' in color) return 'hsv';
  }

  return undefined;
}

function stringToColor(color: string): RGBA | RGB | HSL | HSV | undefined {
  const type = getColorType(color);

  if (type === 'rgba') {
    const [r, g, b, a] = color
      .replace(/rgba?\((\d+)\s+(\d+)\s+(\d+)\s*\/\s*([0-9.]+)\)/, '$1,$2,$3,$4')
      .replace(/[^\d,]/g, '')
      .split(',')
      .map((v) => Number(v));
    return { r, g, b, a };
  }

  if (type === 'rgb') {
    const [r, g, b] = color
      .replace(/[^\d,]/g, '')
      .split(',')
      .map((v) => Number(v));
    return { r, g, b };
  }

  if (type === 'hsl') {
    const [h, s, l] = color
      .replace(/[^\d,]/g, '')
      .split(',')
      .map((v) => Number(v));
    return { h, s, l };
  }

  if (type === 'hsv') {
    const [h, s, v] = color
      .replace(/[^\d,]/g, '')
      .split(',')
      .map((i) => Number(i));
    return { h, s, v };
  }

  return undefined;
}

// ----------------------------------------------

export function autoConvert<T extends keyof ColorMap>(
  color: Color,
  out: T
): ColorMap[T] | undefined {
  const colorType = getColorType(color);

  if (!colorType) return undefined;

  if (typeof color === 'string') {
    const c = stringToColor(color);

    if (colorType === 'rgb' && out === 'rgb') return c as ColorMap[T];
    if (colorType === 'rgb' && out === 'hex') return rgbToHex(c as RGB) as ColorMap[T];
    if (colorType === 'rgb' && out === 'hsl') return rgbToHsl(c as RGB) as ColorMap[T];
    if (colorType === 'rgb' && out === 'hsv') return rgbToHsv(c as RGB) as ColorMap[T];
    if (colorType === 'rgb' && out === 'rgba') return rgbToRgba(c as RGB) as ColorMap[T];

    if (colorType === 'hsl' && out === 'rgb') return hslToRgb(c as HSL) as ColorMap[T];
    if (colorType === 'hsl' && out === 'hex') return hslToHex(c as HSL) as ColorMap[T];
    if (colorType === 'hsl' && out === 'hsl') return c as ColorMap[T];
    if (colorType === 'hsl' && out === 'hsv') return hslToHsv(c as HSL) as ColorMap[T];
    if (colorType === 'hsl' && out === 'rgba') return hslToRgba(c as HSL) as ColorMap[T];

    if (colorType === 'hsv' && out === 'rgb') return hsvToRgb(c as HSV) as ColorMap[T];
    if (colorType === 'hsv' && out === 'hex') return hsvToHex(c as HSV) as ColorMap[T];
    if (colorType === 'hsv' && out === 'hsl') return hsvToHsl(c as HSV) as ColorMap[T];
    if (colorType === 'hsv' && out === 'hsv') return c as ColorMap[T];
    if (colorType === 'hsv' && out === 'rgba') return hsvToRgba(c as HSV) as ColorMap[T];

    if (colorType === 'hex' && out === 'rgb') return hexToRgb(color) as ColorMap[T];
    if (colorType === 'hex' && out === 'hex') return color as ColorMap[T];
    if (colorType === 'hex' && out === 'hsl') return hexToHsl(color) as ColorMap[T];
    if (colorType === 'hex' && out === 'hsv') return hexToHsv(color) as ColorMap[T];
    if (colorType === 'hex' && out === 'rgba') return hexToRgba(color) as ColorMap[T];

    if (colorType === 'rgba' && out === 'rgb') return rgbaToRgb(c as RGBA) as ColorMap[T];
    if (colorType === 'rgba' && out === 'hex') return rgbaToHex(c as RGBA) as ColorMap[T];
    if (colorType === 'rgba' && out === 'hsl') return rgbaToHsl(c as RGBA) as ColorMap[T];
    if (colorType === 'rgba' && out === 'hsv') return rgbaToHsv(c as RGBA) as ColorMap[T];
    if (colorType === 'rgba' && out === 'rgba') return c as ColorMap[T];
  }

  if (typeof color === 'object') {
    if ('r' in color && 'g' in color && 'b' in color) {
      if (out === 'hex') return rgbToHex(color) as ColorMap[T];
      if (out === 'hsl') return rgbToHsl(color) as ColorMap[T];
      if (out === 'rgb') return color as ColorMap[T];
      if (out === 'hsv') return rgbToHsv(color) as ColorMap[T];
      if (out === 'rgba') return rgbToRgba(color) as ColorMap[T];
    }

    if ('h' in color && 's' in color && 'l' in color) {
      if (out === 'hex') return hslToHex(color) as ColorMap[T];
      if (out === 'rgb') return hslToRgb(color) as ColorMap[T];
      if (out === 'hsl') return color as ColorMap[T];
      if (out === 'hsv') return hslToHsv(color) as ColorMap[T];
      if (out === 'rgba') return hslToRgba(color) as ColorMap[T];
    }
  }

  return undefined;
}

export const colorConverter = {
  rgb: {
    hex: rgbToHex,
    hsl: rgbToHsl,
    hsv: rgbToHsv,
    rgba: rgbToRgba,
  },
  hsl: {
    hex: hslToHex,
    rgb: hslToRgb,
    hsv: hslToHsv,
    rgba: hslToRgba,
  },
  hsv: {
    hex: hsvToHex,
    rgb: hsvToRgb,
    hsl: hsvToHsl,
    rgba: hsvToRgba,
  },
  hex: {
    rgb: hexToRgb,
    hsl: hexToHsl,
    hsv: hexToHsv,
    rgba: hexToRgba,
  },
  rgba: {
    hex: rgbaToHex,
    hsl: rgbaToHsl,
    hsv: rgbaToHsv,
    rgb: rgbaToRgb,
  },
};

export const validator = {
  rgb: isRgb,
  hsl: isHsl,
  hsv: isHsv,
  hex: isHex,
  rgba: isRgba,
};
