import { useShallow } from 'zustand/react/shallow';
import { converter } from '@/utils/converter';
import { useBuilderStore } from '@/hooks/use-builder-store';
import type { StripeTree } from './type';

export function useStripeStyle(stripe: StripeTree) {
  const [generalStyle, screen] = useBuilderStore(useShallow((s) => [s.styles.general, s.screen]));

  const { style } = stripe;
  const { backgroundColor, backgroundImage, border, contentBackColor } = style;

  const stripeWrapper: React.CSSProperties = {
    alignItems: screen === 'desktop' ? converter.textAlignment(generalStyle.alignment) : 'center',
    backgroundColor,
    ...converter.image(backgroundImage),
  };

  const stripeStyle: React.CSSProperties = {
    ...converter.border(border),
    backgroundColor: contentBackColor,
  };

  return { stripeStyle, stripeWrapper };
}
