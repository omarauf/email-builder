import type { Over, Active, UniqueIdentifier, DroppableContainer } from '@dnd-kit/core';
import { v4 as uuidv4 } from 'uuid';
import type { Index, NodeType } from '../types';
import type { StripeIndex } from '../nodes/stripe/type';
import type { BlockType, BlockIndex } from '../nodes/block/type';
import type { Layout, StructureIndex } from '../nodes/structure/type';
import type { ContainerTree, ContainerIndex } from '../nodes/container/type';

/* ------------------------------------------------- Index ------------------------------------------------ */

export function isStripeIndex(index: Index): index is StripeIndex {
  return (
    index.stripeIndex !== undefined &&
    index.structureIndex === undefined &&
    index.containerIndex === undefined &&
    index.blockIndex === undefined
  );
}

export function isStructureIndex(index: Index): index is StructureIndex {
  return (
    index.stripeIndex !== undefined &&
    index.structureIndex !== undefined &&
    index.containerIndex === undefined &&
    index.blockIndex === undefined
  );
}

export function isContainerIndex(index: Index): index is ContainerIndex {
  return (
    index.stripeIndex !== undefined &&
    index.structureIndex !== undefined &&
    index.containerIndex !== undefined &&
    index.blockIndex === undefined
  );
}

export function isBlockIndex(index: Index): index is BlockIndex {
  return (
    index.stripeIndex !== undefined &&
    index.structureIndex !== undefined &&
    index.containerIndex !== undefined &&
    index.blockIndex !== undefined
  );
}

/* ------------------------------------------- Drag Active Data ------------------------------------------- */

export type DragData = {
  id: UniqueIdentifier;
} & (
  | {
      type: 'stripe';
      idx: StripeIndex;
    }
  | {
      type: 'structure';
      idx: StructureIndex;
      layout?: Layout;
    }
  | {
      type: 'container';
      idx: ContainerIndex;
    }
  | {
      type: 'block';
      idx: BlockIndex;
      blockType: BlockType;
    }
);

export function getNodeDragData(node: Active | DroppableContainer): DragData {
  return {
    id: node.id,
    type: node.data.current?.type,
    idx: node.data.current?.idx,
    blockType: node.data.current?.blockType,
    layout: node.data.current?.layout,
  };
}

/* -------------------------------------------- Drag Over Data -------------------------------------------- */

export type OverData = {
  id: UniqueIdentifier;
} & (
  | {
      type: 'drop-zone-stripe';
      idx: StripeIndex;
    }
  | {
      type: 'drop-zone-structure';
      idx: StructureIndex;
    }
  | {
      type: 'drop-zone-container';
      idx: ContainerIndex;
    }
  | {
      type: `drop-zone-block`;
      idx: BlockIndex;
    }
);

export function getNodeOverData(node: Over | DroppableContainer): OverData {
  return {
    id: node.id,
    type: node.data.current?.type,
    idx: node.data.current?.idx,
  };
}

interface UpdateIdsProps {
  id: UniqueIdentifier;
  type: NodeType;
  children?: UpdateIdsProps[];
}

export function updateIds(node: UpdateIdsProps) {
  node.id = uuidv4();
  if (node.type === 'block') return;

  if (node.children) {
    node.children.forEach((child) => updateIds(child));
  }
}

export const doesContainerHaveBlock = (container: ContainerTree, id?: string | UniqueIdentifier) =>
  container.children.some((b) => b.id === id);
