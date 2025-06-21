import { Box } from '@mui/material';
import type { BlockButton } from './type';
import type { StripeType } from '../stripe/type';
import type { BlockIndex } from '../block/type';
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
      <span style={buttonWrapperStyle}>
        <Box
          component="a"
          id={`${id}`}
          target="_blank"
          href={link}
          sx={buttonStyle}
          onClick={(e) => e.preventDefault()}
          rel="noreferrer">
          {text}
        </Box>
      </span>
    ),
    style: blockStyle,
  };
}
