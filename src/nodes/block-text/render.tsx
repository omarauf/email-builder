import { useCallback } from 'react';
import { Tiptap } from '@/components/editor';
import { useBuilderStore } from '@/hooks/use-builder-store';
import { useTextStyle } from './style';
import type { BlockText } from './type';
import type { StripeType } from '../stripe/type';
import type { BlockIndex } from '../block/type';

type Prop = BlockText & {
  stripeType: StripeType;
  idx: BlockIndex;
};

export function TextBlock({ stripeType, ...block }: Prop) {
  const setBlockByKey = useBuilderStore((s) => s.setBlockByKey);

  const { idx, data } = block;

  const { paragraphStyles, headingStyles, blockStyle } = useTextStyle(block, stripeType);

  const onChange = useCallback(
    (html: string) => {
      setBlockByKey(idx, 'data.text', html);
      // setBlockByKey(idx, "data.json", json);
    },
    [idx, setBlockByKey]
  );

  return {
    element: (
      <Tiptap
        // style={paragraphStyles}
        sx={{ ' p': paragraphStyles, ...headingStyles }}
        content={data.text}
        onChange={onChange}
      />
    ),
    style: blockStyle,
  };
}
