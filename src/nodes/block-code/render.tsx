import type { BlockCode } from './type';
import type { BlockIndex } from '../block/type';
import type { StripeType } from '../stripe/type';

type Prop = BlockCode & {
  stripeType: StripeType;
  idx: BlockIndex;
};

export function CodeBlock({ stripeType, ...block }: Prop) {
  const { data } = block;
  const { code } = data;

  return {
    // eslint-disable-next-line react/no-danger
    element: <div dangerouslySetInnerHTML={{ __html: code }} />,
    style: {},
  };
}
