import type { UniqueIdentifier } from '@dnd-kit/core';
import type { BlockImage } from './type';
import { defaultVisibility, defaultResponsivePadding } from '../common/blueprint';

export const defaultBlockImage = (
  id: UniqueIdentifier,
  data?: Partial<BlockImage['data']>,
  style?: Partial<BlockImage['style']>
): BlockImage => ({
  id,
  type: 'block',
  blockType: 'image',
  data: {
    src: data?.src || '',
    alt: '',
    hide: defaultVisibility(data?.hide),
    // link: data?.link || { value: "", type: "web", newTab: false },
    sizeType: data?.sizeType || 'width',
  },
  style: {
    blockBackgroundColor: style?.blockBackgroundColor || undefined,
    padding: defaultResponsivePadding(style?.padding),
    align: {
      desktop: style?.align?.desktop || 'center',
      mobile: style?.align?.mobile || 'center',
    },
    borderRadius: style?.borderRadius || [0, 0, 0, 0],
    width: {
      desktop: style?.width?.desktop || undefined,
      mobile: style?.width?.mobile || undefined,
    },
    height: {
      desktop: style?.width?.desktop || undefined,
      mobile: style?.width?.mobile || undefined,
    },
    responsive: style?.responsive || true,
  },
});
