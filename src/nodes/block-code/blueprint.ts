import type { UniqueIdentifier } from '@dnd-kit/core';
import type { BlockCode } from './type';
import { defaultVisibility, defaultResponsivePadding } from '../common/blueprint';

export const defaultBlockCode = (
  id: UniqueIdentifier,
  data?: Partial<BlockCode['data']>,
  style?: Partial<BlockCode['style']>
): BlockCode => ({
  id,
  type: 'block',
  blockType: 'code',
  data: { code: '<p>Html code</p>', hide: defaultVisibility(data?.hide) },
  style: {
    blockBackgroundColor: style?.blockBackgroundColor || undefined,
    padding: defaultResponsivePadding(style?.padding),
  },
});
