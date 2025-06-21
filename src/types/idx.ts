import type { BlockIndex } from '../nodes/block/type';
import type { ContainerIndex } from '../nodes/container/type';
import type { StripeIndex } from '../nodes/stripe/type';
import type { StructureIndex } from '../nodes/structure/type';

export interface Index {
  stripeIndex: number;
  // stripeId?: UniqueIdentifier;

  structureIndex?: number;
  // structureId?: UniqueIdentifier;

  containerIndex?: number;
  // containerId?: UniqueIdentifier;

  blockIndex?: number;
  // blockId?: UniqueIdentifier;
}

export interface NodeIndexMap {
  stripe: StripeIndex;
  structure: StructureIndex;
  container: ContainerIndex;
  block: BlockIndex;
}

// export type Index = StripeIndex | StructureIndex | ContainerIndex | BlockIndex;
