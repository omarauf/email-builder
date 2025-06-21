import type { CSSProperties } from 'react';
import { useBuilderStore } from '@/hooks/use-builder-store';
import { converter } from '@/utils/converter';
import type { BlockDivider } from './type';

export function useDividerStyle(buttonBlock: BlockDivider) {
  const screen = useBuilderStore((s) => s.screen);

  const { style } = buttonBlock;
  const {
    alignment,
    blockBackgroundColor,
    borderStyle,
    padding,
    width,
    widthUnit,
    border,
    borderColor,
  } = style;

  const dividerWrapperStyle: CSSProperties = {
    display: 'flex',
    justifyContent: alignment?.[screen],
    background: blockBackgroundColor,
    padding: converter.inset(padding?.[screen] || padding?.desktop, 'px'),
  };

  const dividerStyle: CSSProperties = {
    borderBottom: `${border}px ${borderStyle} ${borderColor}`,
    width: `${width?.[screen] || 100}${widthUnit?.[screen] || '%'}`,
  };

  return { dividerWrapperStyle, dividerStyle };
}
