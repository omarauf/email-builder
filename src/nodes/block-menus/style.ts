import { useShallow } from 'zustand/react/shallow';
import type { CSSProperties } from 'react';
import type { Theme, SxProps } from '@mui/material';
import { useBuilderStore } from '@/hooks/use-builder-store';
import { fontFamilyOptions } from '@/constant/font';
import { converter } from '@/utils/converter';
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
  };

  const menuSx: SxProps<Theme> = {
    textAlign: 'center',
    width: style.fullWidth ? `${(1 / data.menus.length) * 100}%` : 'auto',
    padding: converter.inset(style.margin?.[screen], 'px'),
    ':not(:first-child)': {
      borderLeft: `${style.divider}px ${style.dividerStyle} ${style.dividerColor}`,
    },
  };

  return { menuWrapperStyle, menuSx, menuStyle };
}
