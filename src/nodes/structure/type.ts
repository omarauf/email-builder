import type { UniqueIdentifier } from '@dnd-kit/core';
import type { Inset, Responsive, Visibility, ImageBackground } from '@/types';
import type { ContainerTree } from '../container/type';
import type { StripeIndex } from '../stripe/type';

export interface StructureTree {
  id: UniqueIdentifier;
  type: 'structure';
  data: StructureData;
  children: ContainerTree[];
  style: StructureStyle;
}

export type Layout =
  | 'auto'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '1:2'
  | '2:1'
  | '3:1'
  | '1:3';

interface StructureData {
  hide?: Visibility;
}

interface StructureStyle {
  backgroundColor?: string;
  borderRadius?: Inset;
  gap?: Responsive<number | undefined>;
  padding?: Responsive<Inset | undefined>;
  backgroundImage?: ImageBackground;
  responsive: boolean;
}

export type StructureIndex = StripeIndex & {
  structureIndex: number;
  // structureId: UniqueIdentifier;
};
