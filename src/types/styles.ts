import type { CSSProperties } from 'react';
import type { fontFamilyOptions } from '../constant/font';

export type FontFamily = (typeof fontFamilyOptions)[number]['id'];

// [top, right, bottom, left]
export type Inset<T = number> = [T, T, T, T];

export type BorderStyle = 'solid' | 'dashed' | 'dotted';

export interface Border {
  width: Inset;
  style: BorderStyle;
  color: string;
}

export interface ButtonHover {
  buttonColor: string;
  fontColor: string;
  borderColor: string;
}

export interface Responsive<T> {
  desktop: T;
  mobile: T;
}

export type Visibility = Responsive<boolean | undefined>;

export type Alignment = 'left' | 'center' | 'right';
export type TextAlignment = 'left' | 'center' | 'right' | 'justify';

export interface ImageMetaData {
  width: number;
  height: number;
  name: string;
  size: number;
}
export interface ImageBackground {
  src: string;
  positionH: {
    value: 'left' | 'center' | 'right' | 'custom';
    customValue: number;
    customUnit: 'px' | '%';
  };
  positionV: {
    value: 'top' | 'center' | 'bottom' | 'custom';
    customValue: number;
    customUnit: 'px' | '%';
  };
  width: {
    value: 'auto' | 'cover' | 'contain' | 'px' | '%';
    customValue: number;
  };
  height: {
    value: 'auto' | 'cover' | 'contain' | 'px' | '%';
    customValue: number;
  };
  repeat: 'no-repeat' | 'repeat';
  metaData?: ImageMetaData;
}

export interface Css {
  classname: string;
  type: 'desktop' | 'mobile';
  styles: CSSProperties;
  important?: boolean;
}
