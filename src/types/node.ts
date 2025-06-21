import type { BlockTree, BlockIndex } from '../nodes/block/type';
import type { ContainerTree, ContainerIndex } from '../nodes/container/type';
import type { StripeTree, StripeIndex } from '../nodes/stripe/type';
import type { StructureTree, StructureIndex } from '../nodes/structure/type';

export type NodeType =
  | StripeTree['type']
  | StructureTree['type']
  | ContainerTree['type']
  | BlockTree['type'];

export type Node =
  | (StripeTree & { idx: StripeIndex })
  | (StructureTree & { idx: StructureIndex })
  | (ContainerTree & { idx: ContainerIndex })
  | (BlockTree & { idx: BlockIndex });

// export type NodeData = StripeData | StructureData | ContainerData | BlockData;
// export type NodeKey = Exclude<keyof Node, "id" | "type">;
