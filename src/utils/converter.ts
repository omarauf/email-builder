import type { CSSProperties } from 'react';
import type { Css, Inset, Border, TextAlignment, ImageBackground } from '../types';

function insetConverter<T extends Inset<U>, U>(value?: T, unit = '') {
  if (value === undefined) return undefined;

  const [one, second, third, forth] = value;

  if (insetEqual(value)) return `${one}${unit}`;

  return `${one}${unit} ${second}${unit} ${third}${unit} ${forth}${unit}`;
}

function insetEqual<T extends Inset<U>, U>(value: T) {
  return value[0] === value[1] && value[0] === value[2] && value[0] === value[3];
}

function borderConverter(border?: Border) {
  if (border === undefined) return {};
  const { color, style, width } = border;

  const [top, right, bottom, left] = width;

  const allWidthsEqual = insetEqual(border.width);

  if (allWidthsEqual) return { border: `${top}px ${style} ${color}` };

  const css: CSSProperties = {};
  if (top > 0) css.borderTop = `${top}px ${style} ${color}`;
  if (right > 0) css.borderRight = `${right}px ${style} ${color}`;
  if (bottom > 0) css.borderBottom = `${bottom}px ${style} ${color}`;
  if (left > 0) css.borderLeft = `${left}px ${style} ${color}`;

  return css;
}

function convertBackgroundImage(value?: ImageBackground) {
  if (value === undefined) return {};

  const { height, positionH, positionV, repeat, src, width } = value;
  const style: {
    backgroundImage?: string;
    backgroundRepeat?: string;
    backgroundPosition?: string;
    backgroundSize?: string;
  } = {};

  let position = '';
  let size = '';
  if (positionH.value === 'custom') position += `${positionH.customValue}${positionH.customUnit}`;
  else position += positionH.value;

  if (positionV.value === 'custom') position += ` ${positionV.customValue}${positionV.customUnit}`;
  else position += ` ${positionV.value}`;

  if (width.value === 'px' || width.value === '%') size = `${width.customValue}${width.value}`;
  else size = width.value;

  if (height.value === 'px' || height.value === '%')
    size += ` ${height.customValue}${height.value}`;
  else size += ` ${height.value}`;

  style.backgroundImage = `url("${src}")`;
  style.backgroundRepeat = repeat;
  style.backgroundPosition = position;
  style.backgroundSize = size;

  return style;
}

function verticalAlignConverter(value?: 'bottom' | 'top' | 'middle') {
  switch (value) {
    case 'top':
      return 'start';

    case 'middle':
      return 'center';

    case 'bottom':
      return 'end';

    default:
      return 'center';
  }
}

function textAlignmentToFlex(value: TextAlignment) {
  switch (value) {
    case 'left':
      return 'flex-start';

    case 'center':
      return 'center';

    case 'right':
      return 'flex-end';

    case 'justify':
      return 'space-between';

    default:
      return 'center';
  }
}

function textStyleConverter(value: ('bold' | 'italic' | 'underline')[]) {
  const style: {
    fontWeight?: string;
    fontStyle?: string;
    textDecoration?: string;
  } = {};

  if (value.includes('bold')) style.fontWeight = 'bold';
  if (value.includes('italic')) style.fontStyle = 'italic';
  if (value.includes('underline')) style.textDecoration = 'underline';

  return style;
}

export const converter = {
  image: convertBackgroundImage,
  inset: insetConverter,
  border: borderConverter,
  verticalAlign: verticalAlignConverter,
  textAlignment: textAlignmentToFlex,
  textStyle: textStyleConverter,
};
export function cssObjectToString(css: Css | Css[]): string {
  const cssArray = Array.isArray(css) ? css : [css];

  return cssArray
    .map(({ classname, styles, important }) => {
      const cssString = Object.entries(styles)
        .map(([key, value]) => {
          if (value === undefined || value === null) return '';
          const kebabKey = key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
          return important ? `  ${kebabKey}: ${value} !important;` : `  ${kebabKey}: ${value};`;
        })
        .filter((line) => line.trim() !== '')
        .join('\n');

      if (!classname) return cssString;

      return `${classname} {\n${cssString}\n}`;
    })
    .join('\n');
}

export function mediaQueryToString(width: number, cssString: string): string {
  return `@media screen and (max-width: ${width}px) {\n${cssString}\n}`;
}
