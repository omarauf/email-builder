import { useShallow } from 'zustand/react/shallow';
import type { Screen } from '@/types';
import type { GlobalStripeStyle } from '@/styles/stripe/type';
import type { GlobalButtonStyle } from '@/styles/button/type';
import type { GlobalHeadingStyle } from '@/styles/heading/type';
import { converter } from '@/utils/converter';
import { HeadingOptions } from '@/constant/heading';
import { fontFamilyOptions } from '@/constant/font';
import { StripeTypeOptions } from '@/constant/stripe';
import { useBuilderStore } from '@/hooks/use-builder-store';

export function useTreeStyle() {
  const [headingStyle, globalStripe, globalButton, screen] = useBuilderStore(
    useShallow((s) => [s.styles.heading, s.styles.stripe, s.styles.button, s.screen])
  );

  const style: React.CSSProperties = {
    ...globalStripeStyle(globalStripe, screen),
    ...globalHeadingStyle(headingStyle, screen),
    ...globalButtonStyle(globalButton, screen),
  };

  return style;
}

function globalHeadingStyle(globalStyle: GlobalHeadingStyle, screen: Screen) {
  const style: React.CSSProperties = {};
  const { bottomSpaceEnabled, fontFamily, letterSpacing, ...other } = globalStyle;

  style[`--heading-font-family`] = fontFamily;
  style[`--heading-letter-spacing`] = `${letterSpacing.value}${letterSpacing.unit}`;

  HeadingOptions.forEach((option) => {
    const { bottomSpace, fontColor, fontSize, lineHeight, textAlignment, textStyles } =
      other[option];

    style[`--heading-${option}-font-color`] = fontColor;
    style[`--heading-${option}-font-size`] = `${fontSize[screen]}px`;
    style[`--heading-${option}-line-height`] = `${lineHeight[screen] * 100}%`;
    style[`--heading-${option}-text-alignment`] = textAlignment[screen];
    style[`--heading-${option}-font-weight`] = textStyles.includes('bold') ? 'bold' : 'normal';
    style[`--heading-${option}-font-style`] = textStyles.includes('italic') ? 'italic' : 'normal';
    style[`--heading-${option}-text-decoration`] = textStyles.includes('underline')
      ? 'underline'
      : 'none';

    style[`--heading-${option}-bottom-space`] = bottomSpaceEnabled
      ? `${bottomSpace[screen]}px`
      : '0px';
  });

  return style;
}

function globalStripeStyle(globalStyle: GlobalStripeStyle, screen: Screen) {
  const style: React.CSSProperties = {};
  const { fontFamily, letterSpacing, lineHeight, ...other } = globalStyle;

  style[`--stripe-font-family`] = fontFamilyOptions.find((f) => f.id === fontFamily)?.type;
  style[`--stripe-letter-spacing`] = `${letterSpacing.value}${letterSpacing.unit}`;
  style[`--stripe-line-height`] = `${lineHeight[screen] * 100}%`;

  StripeTypeOptions.forEach((option) => {
    const {
      bottomSpace,
      contentBackgroundColor,
      fontColor,
      fontSize,
      linkColor,
      linkHoverColor,
      stripeBackgroundColor,
    } = other[option];

    style[`--stripe-${option}-font-color`] = fontColor;
    style[`--stripe-${option}-font-size`] = `${fontSize[screen]}px`;
    style[`--stripe-${option}-link-color`] = linkColor;
    style[`--stripe-${option}-link-hover-color`] = linkHoverColor;
    style[`--stripe-${option}-background-color`] = stripeBackgroundColor;
    style[`--stripe-${option}-content-background-color`] = contentBackgroundColor;
    style[`--stripe-${option}-bottom-space`] = bottomSpace?.[screen]
      ? `${bottomSpace?.[screen]}px`
      : '0px';
  });

  return style;
}

function globalButtonStyle(globalStyle: GlobalButtonStyle, screen: Screen) {
  const style: React.CSSProperties = {};
  const {
    fontFamily,
    letterSpacing,
    border,
    borderRadius,
    buttonColor,
    fontColor,
    fontSize,
    fullWidth,
    hover,
    padding,
    textStyles,
  } = globalStyle;

  const convertedBorder = converter.border(border);
  if (convertedBorder.border) style[`--button-border`] = convertedBorder.border;
  if (convertedBorder.borderTop) style[`--button-border-top`] = convertedBorder.borderTop;
  if (convertedBorder.borderRight) style[`--button-border-right`] = convertedBorder.borderRight;
  if (convertedBorder.borderBottom) style[`--button-border-bottom`] = convertedBorder.borderBottom;
  if (convertedBorder.borderLeft) style[`--button-border-left`] = convertedBorder.borderLeft;

  if (hover.borderColor) style[`--button-hover-border-color`] = hover.borderColor;
  if (hover.buttonColor) style[`--button-hover-background-color`] = hover.buttonColor;
  if (hover.fontColor) style[`--button-hover-font-color`] = hover.fontColor;

  style[`--button-font-family`] = fontFamilyOptions.find((f) => f.id === fontFamily)?.type;
  style[`--button-letter-spacing`] = `${letterSpacing.value}${letterSpacing.unit}`;
  style[`--button-border-radius`] = converter.inset(borderRadius, 'px');
  style[`--button-background-color`] = buttonColor;
  style[`--button-font-color`] = fontColor;
  style[`--button-font-size`] = `${fontSize[screen]}px`;
  style[`--button-full-width`] = fullWidth[screen] ? '100%' : 'auto';
  style[`--button-padding`] = converter.inset(padding[screen], 'px');
  style[`--button-font-weight`] = textStyles.includes('bold') ? 'bold' : 'normal';
  style[`--button-font-style`] = textStyles.includes('italic') ? 'italic' : 'normal';
  style[`--button-text-decoration`] = textStyles.includes('underline') ? 'underline' : 'none';

  return style;
}
