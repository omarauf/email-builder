import { Box } from '@mui/material';
import type { BlockMenu } from './type';
import type { StripeType } from '../stripe/type';
import type { BlockIndex } from '../block/type';
import { useMenuStyle } from './style';

type Prop = BlockMenu & {
  stripeType: StripeType;
  idx: BlockIndex;
};

export function MenuBlock({ stripeType, ...block }: Prop) {
  const { data } = block;
  const { menus } = data;

  const { menuSx, menuStyle, menuWrapperStyle } = useMenuStyle(block, stripeType);

  return {
    element: (
      <div style={menuWrapperStyle}>
        {menus.map((menu, index) => (
          // if (index === 0) delete menuStyle.borderLeft;

          <Box
            component="a"
            href={menu.link}
            key={index}
            style={menuStyle}
            sx={menuSx}
            onClick={(e) => e.preventDefault()}>
            {menu.text}
          </Box>
        ))}
      </div>
    ),
    style: {},
  };
}
