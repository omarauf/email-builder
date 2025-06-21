import type { UniqueIdentifier } from '@dnd-kit/core';
import type { BlockSpacer } from './type';
import { defaultVisibility } from '../common/blueprint';

export const defaultBlockSpacer = (
  id: UniqueIdentifier,
  data?: Partial<BlockSpacer['data']>,
  style?: Partial<BlockSpacer['style']>
): BlockSpacer => ({
  id,
  type: 'block',
  blockType: 'spacer',
  data: { hide: defaultVisibility(data?.hide) },
  style: {
    blockBackgroundColor: style?.blockBackgroundColor || undefined,
    padding: {
      desktop: undefined,
      mobile: undefined,
    },
    height: {
      desktop: style?.height?.desktop || 40,
      mobile: style?.height?.mobile || undefined,
    },
  },
});
