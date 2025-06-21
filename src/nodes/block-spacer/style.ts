import type { CSSProperties } from 'react';
import { useBuilderStore } from '@/hooks/use-builder-store';
import type { BlockSpacer } from './type';

export function useSpacerStyle(buttonBlock: BlockSpacer) {
  const screen = useBuilderStore((s) => s.screen);

  const { style } = buttonBlock;
  const { blockBackgroundColor, height } = style;

  const spacerWrapperStyle: CSSProperties = {
    display: 'flex',
    background: blockBackgroundColor,
  };

  const spacerStyle: CSSProperties = {
    height: `${height[screen] || height.desktop}px`,
  };

  return { spacerWrapperStyle, spacerStyle };
}
