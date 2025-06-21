import type { UniqueIdentifier } from '@dnd-kit/core';
import type { BlockMenu } from './type';
import { defaultResponsivePadding } from '../common/blueprint';

export const defaultBlockMenu = (
  id: UniqueIdentifier,
  data?: BlockMenu['data'],
  style?: Partial<BlockMenu['style']>
): BlockMenu => ({
  id,
  type: 'block',
  blockType: 'menu',
  data: {
    type: data?.type || 'links',
    menus: data?.menus || [
      {
        text: 'Menu 1',
        link: 'https://',
        hide: { desktop: false, mobile: false },
      },
      {
        text: 'Menu 2',
        link: 'https://',
        hide: { desktop: false, mobile: false },
      },
      {
        text: 'Menu 3',
        link: 'https://',
        hide: { desktop: false, mobile: false },
      },
    ],
    hide: data?.hide || { desktop: false, mobile: false },
  },
  style: {
    blockBackgroundColor: style?.blockBackgroundColor || undefined,
    divider: style?.divider || 0,
    alignment: {
      desktop: style?.alignment?.desktop || 'center',
      mobile: style?.alignment?.mobile || 'center',
    },
    dividerColor: style?.dividerColor || '#000000',
    dividerStyle: style?.dividerStyle || 'solid',
    fontFamily: style?.fontFamily || undefined,
    fontSize: {
      desktop: style?.fontSize?.desktop || undefined,
      mobile: style?.fontSize?.mobile || undefined,
    },
    fullWidth: style?.fullWidth || true,
    linkColor: style?.linkColor || undefined,
    padding: defaultResponsivePadding(style?.margin),
    margin: {
      desktop: style?.padding?.desktop || [10, 0, 10, 0],
      mobile: style?.padding?.mobile || [10, 0, 10, 0],
    },
    textStyle: style?.textStyle || [],
  },
});
