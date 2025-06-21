import type { UniqueIdentifier } from '@dnd-kit/core';
import type { StructureTree } from './type';
import type { ContainerTree } from '../container/type';
import { defaultVisibility } from '../common/blueprint';

interface StructureProps {
  id: UniqueIdentifier;
  data?: Partial<StructureTree['data']>;
  style?: Partial<StructureTree['style']>;
  children?: ContainerTree[];
}

export const defaultStructure = ({ id, data, style, children }: StructureProps): StructureTree => ({
  id,
  type: 'structure',
  style: {
    borderRadius: style?.borderRadius || [0, 0, 0, 0],
    backgroundColor: style?.backgroundColor || undefined,
    gap: {
      desktop: style?.gap?.desktop !== undefined ? style?.gap?.desktop : 16,
      mobile: style?.gap?.mobile || 0,
    },
    padding: {
      desktop: style?.padding?.desktop || undefined,
      mobile: style?.padding?.mobile || undefined,
    },
    backgroundImage: style?.backgroundImage || undefined,
    responsive: style?.responsive || true,
  },
  data: {
    hide: defaultVisibility(data?.hide),
  },
  children: children || [],
});
