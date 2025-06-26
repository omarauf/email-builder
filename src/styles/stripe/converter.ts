import type { Css } from '@/types';
import { StripeTypeOptions } from '@/constant/stripe';
import type { GlobalStripeStyle } from './type';

export function globalStripeStyleConverter(stripe: GlobalStripeStyle) {
  const { fontFamily, letterSpacing, lineHeight, ...rest } = stripe;

  const css: Css[] = [
    {
      type: 'desktop',
      classname: '.stripe p',
      styles: {
        fontFamily,
        letterSpacing: letterSpacing.value + letterSpacing.unit,
        lineHeight: `${lineHeight.desktop * 100}%`,
      },
    },
    {
      type: 'mobile',
      classname: '.stripe p',
      styles: { lineHeight: `${lineHeight.mobile * 100}%` },
      important: true,
    },
  ];

  StripeTypeOptions.forEach((type) => {
    const s = rest[type];
    const {
      bottomSpace,
      fontColor,
      fontSize,
      contentBackgroundColor,
      linkColor,
      linkHoverColor,
      stripeBackgroundColor,
    } = s;

    css.push(
      {
        type: 'desktop',
        classname: `.stripe-${type} p`,
        styles: {
          fontSize: `${fontSize.desktop}px`,
          color: fontColor,
          marginBottom: bottomSpace?.desktop ? `${bottomSpace.desktop}px` : undefined,
        },
      },
      {
        type: 'desktop',
        classname: `.stripe-${type}`,
        styles: { backgroundColor: stripeBackgroundColor },
      },
      {
        type: 'mobile',
        classname: `.stripe-${type} p`,
        styles: {
          fontSize: `${fontSize.mobile}px`,
          marginBottom: bottomSpace?.mobile ? `${bottomSpace.mobile}px` : undefined,
        },
        important: true,
      },
      {
        type: 'desktop',
        classname: `.stripe-${type} .stripe-${type}-body`,
        styles: { backgroundColor: contentBackgroundColor },
      },
      {
        type: 'desktop',
        classname: `.stripe-${type} .stripe-${type}-body .block-text a`,
        styles: { color: linkColor, textDecoration: 'none' },
      },
      {
        type: 'desktop',
        classname: `.stripe-${type} .stripe-${type}-body .block-text a:hover`,
        styles: { color: linkHoverColor },
        important: true,
      }
    );
  });

  return css;
}
