import type { BlockButton } from './type';
import type { BlockIndex } from '../block/type';
import type { StripeType } from '../stripe/type';
import { useButtonStyle } from './style';

type Prop = BlockButton & {
  stripeType: StripeType;
  idx: BlockIndex;
};

export function ButtonBlock({ stripeType, ...block }: Prop) {
  const { id, data } = block;
  const { link, text } = data;

  const { buttonStyle, buttonWrapperStyle, blockStyle } = useButtonStyle(block);

  return {
    element: (
      <span style={buttonWrapperStyle} className="button">
        <a
          id={`${id}`}
          target="_blank"
          href={link}
          style={buttonStyle}
          onClick={(e) => e.preventDefault()}
          rel="noreferrer">
          {text}
        </a>
      </span>
    ),
    style: blockStyle,
  };
}
