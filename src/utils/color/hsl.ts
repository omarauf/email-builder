import type { RGB, HSL, HSV, HEX, RGBA } from './type';

export function isHsl(color: string): color is 'hsl' {
  return /^hsl\((\d{1,3}),\s*(\d{1,3})%,\s*(\d{1,3})%\)$/.test(color);
}

export function hslToHex({ h, s, l }: HSL): HEX {
  const lValue = l / 100;
  const a = (s * Math.min(lValue, 1 - lValue)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = lValue - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0');
  };

  return `#${f(0)}${f(8)}${f(4)}`;
}

export function hslToRgb({ h, s, l }: HSL): RGB {
  const hValue = h / 360;
  const sValue = s / 100;
  const lValue = l / 100;
  let t2;
  let t3;
  let val;

  if (sValue === 0) {
    val = lValue * 255;
    return { r: val, g: val, b: val };
  }

  if (lValue < 0.5) t2 = lValue * (1 + sValue);
  else t2 = lValue + sValue - lValue * sValue;

  const t1 = 2 * lValue - t2;

  const rgb = [0, 0, 0];

  for (let i = 0; i < 3; i += 1) {
    t3 = hValue + (1 / 3) * -(i - 1);
    if (t3 < 0) t3 += 1;

    if (t3 > 1) t3 -= 1;

    if (6 * t3 < 1) val = t1 + (t2 - t1) * 6 * t3;
    else if (2 * t3 < 1) val = t2;
    else if (3 * t3 < 2) val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
    else val = t1;

    rgb[i] = val * 255;
  }

  return {
    r: Math.round(rgb[0]),
    g: Math.round(rgb[1]),
    b: Math.round(rgb[2]),
  };
}

export function hslToHsv({ h, s, l }: HSL): HSV {
  const hsv = { h, s: 0, v: 0 };

  // Value is calculated based on lightness and saturation
  hsv.v = l + s * Math.min(l, 1 - l);

  // Saturation is adjusted based on lightness
  if (hsv.v !== 0) {
    hsv.s = 2 * (1 - l / hsv.v);
  }

  return hsv;
}

export function hslToRgba({ h, s, l }: HSL): RGBA {
  // Convert h, s, l from percentages to ranges used in formula
  const hValue = h / 360;
  const sValue = s / 100;
  const lValue = l / 100;

  const hueToRgb = (p: number, q: number, t: number): number => {
    let tValue = t;
    if (tValue < 0) tValue += 1;
    if (tValue > 1) tValue -= 1;
    if (tValue < 1 / 6) return p + (q - p) * 6 * tValue;
    if (tValue < 1 / 2) return q;
    if (tValue < 2 / 3) return p + (q - p) * (2 / 3 - tValue) * 6;
    return p;
  };

  let r: number;
  let g: number;
  let b: number;

  if (sValue === 0) {
    // Achromatic (gray)
    r = lValue;
    g = lValue;
    b = lValue;
  } else {
    const q = lValue < 0.5 ? lValue * (1 + sValue) : lValue + sValue - lValue * sValue;
    const p = 2 * lValue - q;
    r = hueToRgb(p, q, hValue + 1 / 3);
    g = hueToRgb(p, q, hValue);
    b = hueToRgb(p, q, hValue - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
    a: 1,
  };
}
