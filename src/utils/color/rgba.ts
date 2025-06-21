import type { RGB, HSL, HSV, HEX, RGBA } from './type';

export function isRgba(color: string): color is 'rgba' {
  return (
    /rgba?\((\d+)\s+(\d+)\s+(\d+)\s*\/\s*([0-9.]+)\)/.test(color) ||
    /rgba?\((\d+),\s*(\d+),\s*(\d+),\s*([0-9.]+)\)/.test(color)
  );
}

export function rgbaToHex({ r, g, b, a }: RGBA): HEX {
  const toHex = (value: number) => value.toString(16).padStart(2, '0');
  const alpha = Math.round(a * 255); // convert alpha [0–1] to [0–255]
  return `#${toHex(r)}${toHex(g)}${toHex(b)}${toHex(alpha)}`;
}

export function rgbaToHsl({ r, g, b }: RGBA): HSL {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  const delta = max - min;

  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (delta !== 0) {
    s = delta / (1 - Math.abs(2 * l - 1));

    switch (max) {
      case rNorm:
        h = ((gNorm - bNorm) / delta) % 6;
        break;
      case gNorm:
        h = (bNorm - rNorm) / delta + 2;
        break;
      case bNorm:
        h = (rNorm - gNorm) / delta + 4;
        break;
      default:
        // No action needed, but default case is required
        break;
    }

    h *= 60;
    if (h < 0) h += 360;
  }

  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export function rgbaToHsv({ r, g, b }: RGBA): HSV {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  const delta = max - min;

  let h = 0;
  let s = 0;
  const v = max;

  if (delta !== 0) {
    s = delta / max;

    switch (max) {
      case rNorm:
        h = ((gNorm - bNorm) / delta) % 6;
        break;
      case gNorm:
        h = (bNorm - rNorm) / delta + 2;
        break;
      case bNorm:
        h = (rNorm - gNorm) / delta + 4;
        break;
      default:
        // No action needed, but default case is required
        break;
    }

    h *= 60;
    if (h < 0) h += 360;
  }

  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    v: Math.round(v * 100),
  };
}

export function rgbaToRgb({ r, g, b, a }: RGBA): RGB {
  const alpha = a;
  const background = { r: 255, g: 255, b: 255 };

  return {
    r: Math.round((1 - alpha) * background.r + alpha * r),
    g: Math.round((1 - alpha) * background.g + alpha * g),
    b: Math.round((1 - alpha) * background.b + alpha * b),
  };
}
