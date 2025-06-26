import { useShallow } from 'zustand/react/shallow';
import { converter } from '@/utils/converter';
import { fontFamilyOptions } from '@/constant/font';
import { useBuilderStore } from '@/hooks/use-builder-store';
import type { StripeTree } from './type';

export function useStripeStyle(stripe: StripeTree) {
  const [generalStyle, globalStripe, screen] = useBuilderStore(
    useShallow((s) => [s.styles.general, s.styles.stripe, s.screen])
  );

  const { data, style } = stripe;
  const { stripeType } = data;
  const { backgroundColor, backgroundImage, border, contentBackColor } = style;

  const stripeWrapper: React.CSSProperties = {
    alignItems: screen === 'desktop' ? converter.textAlignment(generalStyle.alignment) : 'center',
    backgroundColor: backgroundColor || globalStripe[stripeType].stripeBackgroundColor,
    ...converter.image(backgroundImage),
  };

  const stripeStyle: React.CSSProperties = {
    ...converter.border(border),
    backgroundColor: contentBackColor || globalStripe[stripeType].contentBackgroundColor,

    fontFamily: fontFamilyOptions.find((f) => f.id === globalStripe.fontFamily)?.type,
    fontSize: `${globalStripe[stripeType].fontSize[screen]}px`,
    color: globalStripe[stripeType].fontColor,

    // this is the global link style for stripe
    '--link-color': globalStripe[stripeType].linkColor,
    '--link-hover-color': globalStripe[stripeType].linkHoverColor,

    // we have to apply line height to p tag so it get affected by font size of stripe
    // if we apply line height to wrapper it will not get affected by font size of stripe
    '--letter-spacing': `${globalStripe.letterSpacing.value}${globalStripe.letterSpacing.unit}`,
    '--line-height': `${globalStripe.lineHeight[screen] * 100}%`,
  };

  return { stripeStyle, stripeWrapper };
}
