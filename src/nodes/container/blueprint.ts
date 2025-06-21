import type { UniqueIdentifier } from '@dnd-kit/core';
import { defaultVisibility, defaultResponsivePadding } from '../common/blueprint';
import type { ContainerTree } from './type';
import type { BlockTree } from '../block/type';

interface ContainerProps {
  id: UniqueIdentifier;
  data?: Partial<ContainerTree['data']>;
  style?: Partial<ContainerTree['style']>;
  children?: BlockTree[];
}

export const defaultContainer = ({ id, data, style, children }: ContainerProps): ContainerTree => ({
  id,
  type: 'container',
  style: {
    width: style?.width || 30,
    padding: defaultResponsivePadding(style?.padding),
    backgroundColor: style?.backgroundColor || undefined,
    border: style?.border || {
      color: style?.border?.color || '#000000',
      style: style?.border?.style || 'solid',
      width: style?.border?.width || [0, 0, 0, 0],
    },
    borderRadius: style?.borderRadius || [0, 0, 0, 0],
  },
  data: {
    widthLocked: data?.widthLocked || false,
    hide: defaultVisibility(data?.hide),
  },
  children: children || [],
});
