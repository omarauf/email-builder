import type { CSSProperties } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { converter } from '@/utils/converter';
import { fontFamilyOptions } from '@/constant/font';
import { useBuilderStore } from '@/hooks/use-builder-store';
import type { BlockMenu } from './type';
import type { StripeType } from '../stripe/type';

export function useMenuStyle(menuBlock: BlockMenu, stripeType: StripeType) {
  const [screen, globalStripeStyles] = useBuilderStore(
    useShallow((s) => [s.screen, s.styles.stripe])
  );

  const { style, data } = menuBlock;

  const menuWrapperStyle: CSSProperties = {
    display: 'flex',
    justifyContent: style.alignment?.[screen],
    fontSize: `${style.fontSize?.[screen] || globalStripeStyles[stripeType].fontSize[screen]}px`,
    fontWeight: style.textStyle?.includes('bold') ? 'bold' : 'inherit',
    fontStyle: style.textStyle?.includes('italic') ? 'italic' : 'normal',
    textDecoration: style.textStyle?.includes('underline') ? 'underline' : 'none',
    fontFamily: fontFamilyOptions.find(
      (f) => f.id === (style.fontFamily || globalStripeStyles.fontFamily)
    )?.type,
  };

  const menuStyle: CSSProperties = {
    color: style.linkColor || globalStripeStyles[stripeType].linkColor,
    textAlign: 'center',
    width: style.fullWidth ? `${(1 / data.menus.length) * 100}%` : 'auto',
    padding: converter.inset(style.margin?.[screen], 'px'),
  };

  return { menuWrapperStyle, menuStyle };
}
