import type { UniqueIdentifier } from '@dnd-kit/core';
import type { BlockButton } from './type';
import { defaultPadding, defaultVisibility, defaultResponsivePadding } from '../common/blueprint';

export const defaultBlockButton = (
  id: UniqueIdentifier,
  data?: Partial<BlockButton['data']>,
  style?: Partial<BlockButton['style']>
): BlockButton => ({
  id,
  type: 'block',
  blockType: 'button',
  data: {
    hide: defaultVisibility(data?.hide),
    link: '',
    text: data?.text || 'Button',
  },
  style: {
    padding: defaultResponsivePadding(style?.padding),
    fullWidth: {
      desktop: style?.fullWidth?.desktop || undefined,
      mobile: style?.fullWidth?.mobile || undefined,
    },
    align: {
      desktop: style?.align?.desktop || 'center',
      mobile: style?.align?.mobile || 'center',
    },
    innerPadding: {
      desktop: style?.innerPadding?.desktop
        ? defaultPadding(style.innerPadding.desktop)
        : undefined,
      mobile: style?.innerPadding?.mobile ? defaultPadding(style.innerPadding.mobile) : undefined,
    },
    buttonColor: style?.buttonColor || undefined,
    blockBackgroundColor: style?.blockBackgroundColor || undefined,
    border: style?.border || undefined,
    borderRadius: style?.borderRadius || undefined,
    fontColor: style?.fontColor || undefined,
    fontSize: {
      desktop: style?.fontSize?.desktop || undefined,
      mobile: style?.fontSize?.mobile || undefined,
    },
    fontFamily: style?.fontFamily || undefined,
    textStyle: style?.textStyle || undefined,
    hover: {
      buttonColor: style?.hover?.buttonColor || undefined,
      fontColor: style?.hover?.fontColor || undefined,
      borderColor: style?.hover?.borderColor || undefined,
    },
    height: style?.height || undefined,
    verticalAlign: style?.verticalAlign || undefined,
  },
});
