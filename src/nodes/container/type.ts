import type { UniqueIdentifier } from '@dnd-kit/core';
import type { Inset, Border, Visibility, Responsive, ImageBackground } from '@/types';
import type { BlockTree } from '../block/type';
import type { StructureIndex } from '../structure/type';

export interface ContainerTree {
  id: UniqueIdentifier;
  type: 'container';
  data: ContainerData;
  style: ContainerStyle;
  children: BlockTree[];
}

interface ContainerData {
  widthLocked: boolean;
  hide?: Visibility;
}

interface ContainerStyle {
  width: number;
  padding?: Responsive<Inset | undefined>;
  backgroundColor?: string;
  border?: Border;
  borderRadius?: Inset;
  backgroundImage?: ImageBackground;
}

export type ContainerIndex = StructureIndex & {
  containerIndex: number;
  // containerId: UniqueIdentifier;
};
