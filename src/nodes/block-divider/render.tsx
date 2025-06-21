import { useRef } from 'react';
import type { BlockIndex } from '../block/type';
import type { StripeType } from '../stripe/type';
import { useDividerStyle } from './style';
import type { BlockDivider } from './type';

type Prop = BlockDivider & {
  stripeType: StripeType;
  idx: BlockIndex;
};

export function DividerBlock({ stripeType, idx, ...block }: Prop) {
  const elementRef = useRef<HTMLDivElement>(null);

  const { id } = block;

  const { dividerStyle, dividerWrapperStyle } = useDividerStyle(block);

  return {
    element: (
      <div id={`${id}`} style={dividerWrapperStyle}>
        <div ref={elementRef} style={dividerStyle} />
      </div>
    ),
    style: {},
  };
}
