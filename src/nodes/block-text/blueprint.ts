import type { UniqueIdentifier } from '@dnd-kit/core';
import type { BlockText } from './type';
import { defaultVisibility, defaultResponsivePadding } from '../common/blueprint';

export const defaultBlockText = (
  id: UniqueIdentifier,
  data?: Partial<BlockText['data']>,
  style?: Partial<BlockText['style']>
): BlockText => ({
  id,
  type: 'block',
  blockType: 'text',
  data: {
    text: data?.text || 'Text',
    hide: defaultVisibility(data?.hide),
  },
  style: {
    padding: defaultResponsivePadding(style?.padding),
    blockBackgroundColor: undefined,
    textAlignment: style?.textAlignment || {
      desktop: style?.textAlignment?.desktop || undefined,
      mobile: style?.textAlignment?.mobile || undefined,
    },
  },
});
