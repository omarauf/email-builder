import type { UniqueIdentifier } from '@dnd-kit/core';
import type { BlockDivider } from './type';
import { defaultVisibility } from '../common/blueprint';

export const defaultBlockDivider = (
  id: UniqueIdentifier,
  data?: Partial<BlockDivider['data']>,
  style?: Partial<BlockDivider['style']>
): BlockDivider => ({
  id,
  type: 'block',
  blockType: 'divider',
  data: { hide: defaultVisibility(data?.hide) },
  style: {
    blockBackgroundColor: style?.blockBackgroundColor || undefined,
    padding: {
      desktop: style?.padding?.desktop || [20, 20, 20, 20],
      mobile: style?.padding?.mobile || [20, 20, 20, 20],
    },
    alignment: {
      desktop: style?.alignment?.desktop || 'center',
      mobile: style?.alignment?.mobile || 'center',
    },
    border: style?.border || 1,
    borderColor: style?.borderColor || '#000000',
    borderStyle: style?.borderStyle || 'solid',
    width: {
      desktop: style?.width?.desktop || 100,
      mobile: style?.width?.mobile || 100,
    },
    widthUnit: {
      desktop: style?.widthUnit?.desktop || '%',
      mobile: style?.widthUnit?.mobile || '%',
    },
  },
});
