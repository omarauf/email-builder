import type { FontFamily, Responsive, TextAlignment } from '@/types';

export interface GlobalHeadingStyle {
  fontFamily: FontFamily;
  letterSpacing: { value: number; unit: 'px' | 'em' };
  bottomSpaceEnabled: boolean;
  h1: HeadingStyle;
  h2: HeadingStyle;
  h3: HeadingStyle;
  h4: HeadingStyle;
  h5: HeadingStyle;
  h6: HeadingStyle;
}

export type HeadingType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface HeadingStyle {
  fontSize: Responsive<number>;
  fontColor: string;
  lineHeight: Responsive<number>;
  textStyles: ('bold' | 'italic' | 'underline')[];
  textAlignment: Responsive<TextAlignment>;
  bottomSpace: Responsive<number | undefined>;
}
