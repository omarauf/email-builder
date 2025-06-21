import type { StripeStyle, GlobalStripeStyle } from './type';

export const DEFAULT_STRIP_BOTTOM_SPACE = 19;

export const defaultGlobalStripeStyle: () => GlobalStripeStyle = () => ({
  fontFamily: 'Arial',
  lineHeight: { desktop: 1.5, mobile: 1.5 },
  letterSpacing: { value: 0, unit: 'px' },
  header: defaultStripeStyle(),
  content: defaultStripeStyle(),
  footer: defaultStripeStyle(),
  infoArea: defaultStripeStyle(),
});

const defaultStripeStyle = (style?: Partial<StripeStyle>) => ({
  stripeBackgroundColor: style?.stripeBackgroundColor || undefined,
  contentBackgroundColor: style?.contentBackgroundColor || '#ffffff',
  fontSize: style?.fontSize || { desktop: 14, mobile: 14 },
  fontColor: style?.fontColor || '#333333',
  linkColor: style?.linkColor || '#1376c8',
  linkHoverColor: style?.linkHoverColor || '#1376c8',
  bottomSpace: style?.bottomSpace || undefined,
});
