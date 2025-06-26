import type { BlockMenu } from './type';
import type { BlockIndex } from '../block/type';
import type { StripeType } from '../stripe/type';
import { useMenuStyle } from './style';

type Prop = BlockMenu & {
  stripeType: StripeType;
  idx: BlockIndex;
};

export function MenuBlock({ stripeType, ...block }: Prop) {
  const { data, style } = block;
  const { menus } = data;

  const { menuStyle, menuWrapperStyle } = useMenuStyle(block, stripeType);

  return {
    element: (
      <div style={menuWrapperStyle}>
        {menus.map((menu, index) => (
          <a
            href={menu.link}
            key={index}
            style={{
              ...menuStyle,
              borderLeft:
                index !== 0
                  ? `${style.divider}px ${style.dividerStyle} ${style.dividerColor}`
                  : undefined,
            }}
            onClick={(e) => e.preventDefault()}>
            {menu.text}
          </a>
        ))}
      </div>
    ),
    style: {},
  };
}
