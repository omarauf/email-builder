import type { Theme, SxProps } from '@mui/material';
import { useShallow } from 'zustand/react/shallow';
import { useBuilderStore } from '@/hooks/use-builder-store';
import { fontFamilyOptions } from '@/constant/font';
import { converter } from '@/utils/converter';
import type { StripeTree } from './type';

export function useStripeStyle(stripe: StripeTree) {
  const [generalStyle, globalStripe, screen] = useBuilderStore(
    useShallow((s) => [s.styles.general, s.styles.stripe, s.screen])
  );

  const { data, style } = stripe;
  const { stripeType } = data;
  const { backgroundColor, backgroundImage, border, contentBackColor } = style;

  const stripeWrapper: SxProps<Theme> = {
    alignItems: screen === 'desktop' ? converter.textAlignment(generalStyle.alignment) : 'center',
    backgroundColor: backgroundColor || globalStripe[stripeType].stripeBackgroundColor,
    ...converter.image(backgroundImage),
  };

  const stripeStyle: SxProps<Theme> = {
    ...converter.border(border),
    backgroundColor: contentBackColor || globalStripe[stripeType].contentBackgroundColor,

    fontFamily: fontFamilyOptions.find((f) => f.id === globalStripe.fontFamily)?.type,
    fontSize: `${globalStripe[stripeType].fontSize[screen]}px`,
    color: globalStripe[stripeType].fontColor,

    // this is the global link style for stripe
    a: { color: globalStripe[stripeType].linkColor, textDecoration: 'none' },
    'a:hover': { color: globalStripe[stripeType].linkHoverColor },

    // we have to apply line height to p tag so it get affected by font size of stripe
    // if we apply line height to wrapper it will not get affected by font size of stripe
    ' p': {
      letterSpacing: `${globalStripe.letterSpacing.value}${globalStripe.letterSpacing.unit}`,
      lineHeight: `${globalStripe.lineHeight[screen] * 100}%`,
    },
  };

  return { stripeStyle, stripeWrapper };
}
