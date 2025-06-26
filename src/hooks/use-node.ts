import { useMemo } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { useShallow } from 'zustand/react/shallow';
import { useStoreWithEqualityFn } from 'zustand/traditional';
import type { Node, NodeIndexMap } from '../types';
import type { ContainerTree } from '../nodes/container/type';
import { useBuilderStore } from './use-builder-store';
import { doesContainerHaveBlock } from '../utils/node-utils';

export function useNode<T extends Omit<Node, 'idx'>>(
  node: T,
  stripeIndex: number,
  structureIndex?: number,
  containerIndex?: number,
  blockIndex?: number
) {
  const { id } = node;

  const [active, selectNode] = useBuilderStore(useShallow((s) => [s.active, s.selectNode]));

  /**
   * We are using the useStoreWithEqualityFn to prevent the re-render of the other stripe
   * So we only re-render the the stripe that is hovered by comparing
   * 1. the old hover id with the current node id
   * 2. the new hover id with the current node id
   * if both are not equal (false) we re-render the stripe
   * otherwise (true) we don't re-render the stripe
   */
  const hoverEle = useStoreWithEqualityFn(
    useBuilderStore,
    (s) => s.hoverEle,
    (oldHover, newHover) =>
      // console.log(oldHover, oldHover?.id);
      oldHover?.id !== id && newHover?.id !== id
  );

  /**
   * We are using the useStoreWithEqualityFn to prevent the re-render of the other stripe
   * since the isMouseInsideTree is a global state and when it change it will re-render all the stripe
   * but we are only interested in the stripe that is selected to show the badge and the floating button
   * when the mouse is outside the tree and if it selected. so we are making sure that the re-render
   * only happens it the node that is selected when isMouseInsideTree change.
   */
  const [selectedNode, isMouseInsideTree] = useStoreWithEqualityFn(
    useBuilderStore,
    useShallow((s) => [s.selectedNode, s.isMouseInsideTree]),
    (oldState, newState) => oldState[0]?.id !== id && newState[0]?.id !== id
  );

  const isHover = hoverEle?.id === id;
  const isSelect = selectedNode?.id === id;
  const isActive = active?.type === node.type;
  const isDrag = active?.id === id;
  const idx = useMemo(
    () => ({ stripeIndex, structureIndex, containerIndex, blockIndex }),
    [blockIndex, containerIndex, stripeIndex, structureIndex]
  );

  const { setNodeRef, setActivatorNodeRef, listeners } = useDraggable({
    id,
    data: { type: node.type, idx },
  });

  return {
    node: { ...node, idx } as T & { idx: NodeIndexMap[T['type']] },
    isHover,
    isSelect,
    isActive,
    active,
    isDrag,
    isMouseInsideTree,
    setNodeRef,
    setActivatorNodeRef,
    selectNode,
    listeners,
  };
}

export function useContainer(
  container: ContainerTree,
  stripeIndex: number,
  structureIndex: number,
  containerIndex: number
) {
  const { id } = container;

  const [active, selectNode] = useBuilderStore(useShallow((s) => [s.active, s.selectNode]));

  const hoverEle = useStoreWithEqualityFn(
    useBuilderStore,
    (state) => state.hoverEle,
    (oldHover, newHover) => {
      const oldHoverId = oldHover?.id;
      const newHoverId = newHover?.id;

      const oldType = oldHover?.className.includes('block') ? 'block' : 'container';
      const newType = newHover?.className.includes('block') ? 'block' : 'container';

      const hasOldHoverBlock = doesContainerHaveBlock(container, oldHoverId);
      const hasNewHoverBlock = doesContainerHaveBlock(container, newHoverId);

      const condition1 =
        oldHoverId !== id && newHoverId !== id && !hasOldHoverBlock && !hasNewHoverBlock;
      const condition2 =
        (hasNewHoverBlock || newHoverId === id) && (hasOldHoverBlock || oldHoverId === id);

      const condition3 = oldType === newType;

      return (condition1 || condition2) && (condition1 || condition3);
    }
  );

  const [selectedNode, isMouseInsideTree] = useStoreWithEqualityFn(
    useBuilderStore,
    useShallow((s) => [s.selectedNode, s.isMouseInsideTree]),
    (oldState, newState) =>
      oldState[0]?.id !== id && newState[0]?.id !== id && oldState[0]?.type === newState[0]?.type
  );

  const isBlockHover = doesContainerHaveBlock(container, hoverEle?.id);
  const isBlockSelected = selectedNode?.type === 'block';

  const isHover = hoverEle?.id === id || isBlockHover;
  const isSelect = selectedNode?.id === id;
  const isActive = active?.type === container.type;
  const isDrag = active?.id === id;
  const idx = useMemo(
    () => ({ stripeIndex, structureIndex, containerIndex }),
    [containerIndex, stripeIndex, structureIndex]
  );

  const { setNodeRef, setActivatorNodeRef, listeners } = useDraggable({
    id,
    data: { type: container.type, idx },
  });

  return {
    node: { ...container, idx } as ContainerTree & {
      idx: NodeIndexMap['container'];
    },
    isHover,
    isSelect,
    isActive,
    active,
    isBlockHover,
    isDrag,
    isMouseInsideTree,
    isBlockSelected,
    setNodeRef,
    setActivatorNodeRef,
    selectNode,
    listeners,
  };
}
