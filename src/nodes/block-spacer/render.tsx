import { useRef } from 'react';
import { useBuilderStore } from '@/hooks/use-builder-store';
import { ResizeHandler } from '@/components/floating-button/resize';
import type { BlockSpacer } from './type';
import type { BlockIndex } from '../block/type';
import type { StripeType } from '../stripe/type';
import { useSpacerStyle } from './style';

type Prop = BlockSpacer & {
  stripeType: StripeType;
  idx: BlockIndex;
};

export function SpacerBlock({ stripeType, idx, ...block }: Prop) {
  const elementRef = useRef<HTMLDivElement>(null);

  const { id, style } = block;
  const { height } = style;

  const screen = useBuilderStore((s) => s.screen);

  const setBlockByKey = useBuilderStore((s) => s.setBlockByKey);

  const { spacerStyle, spacerWrapperStyle } = useSpacerStyle(block);

  return {
    element: (
      <div id={`${id}`} style={spacerWrapperStyle}>
        <div ref={elementRef} style={spacerStyle} />

        <ResizeHandler
          id={id}
          ref={elementRef}
          onChange={(v) => setBlockByKey(idx, `style.height.${screen}`, v)}
          value={height}
          screen={screen}
        />
      </div>
    ),
    style: {},
  };
}
