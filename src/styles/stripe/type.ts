import type { FontFamily, Responsive } from '@/types';

export interface StripeStyle {
  stripeBackgroundColor: string | undefined;
  contentBackgroundColor: string;
  fontSize: Responsive<number>;
  fontColor: string;
  linkColor: string;
  linkHoverColor: string;
  bottomSpace: Responsive<number> | undefined;
}

export interface GlobalStripeStyle {
  fontFamily: FontFamily;
  lineHeight: Responsive<number>;
  letterSpacing: { value: number; unit: 'px' | 'em' };
  header: StripeStyle;
  content: StripeStyle;
  footer: StripeStyle;
  infoArea: StripeStyle;
}
