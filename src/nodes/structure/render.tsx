import { memo, Fragment } from 'react';
import { cn } from '@/lib/utils';
import { useNode } from '@/hooks/use-node';
import { classname } from '@/constant/classname';
import { Badge } from '@/components/floating-button/badge';
import { useBuilderStore } from '@/hooks/use-builder-store';
import { AddButton } from '@/components/floating-button/add';
import { HiddenBadge } from '@/components/floating-button/hidden';
import { MasterButton } from '@/components/floating-button/master';
import type { StructureTree } from './type';
import type { StripeType, StripeIndex } from '../stripe/type';
import { useStructureStyle } from './style';
import { Container } from '../container/render';
import { useBorderStyle } from '../common/use-border-style';
import { ContainerDropZone } from '../container/drop-zone/container-drop-zone';

type Props = StructureTree & {
  stripeIdx: StripeIndex;
  structureIndex: number;
  stripeType: StripeType;
  disableDelete: boolean;
};

function StructureMemo({
  stripeType,
  stripeIdx,
  structureIndex,
  disableDelete,
  ...structure
}: Props) {
  const {
    node,
    isActive,
    isHover,
    isDrag,
    isSelect,
    listeners,
    isMouseInsideTree,
    setNodeRef,
    selectNode,
    setActivatorNodeRef,
  } = useNode(structure, stripeIdx.stripeIndex, structureIndex);

  const screen = useBuilderStore((s) => s.screen);

  const { id, idx, children, data } = node;
  const { hide } = data;

  const { structureStyle } = useStructureStyle(structure);

  const { classes, beforeClasses } = useBorderStyle(isHover, isSelect, isActive, isDrag);

  return (
    <div
      id={String(id)}
      ref={setNodeRef}
      aria-hidden="true"
      className={cn('relative', classname.structure, ...classes, ...beforeClasses)}
      style={structureStyle}
      onClick={(e) => {
        e.stopPropagation();
        selectNode(node);
      }}>
      {children.map((container, index) => {
        const isContainerEmpty = container.children.length === 0;
        if (isContainerEmpty)
          return (
            <ContainerDropZone
              key={container.id}
              idx={{ ...idx, containerIndex: index }}
              width={screen === 'desktop' ? `${container.style.width}px` : '100%'}
              {...container}
            />
          );

        return (
          <Fragment key={container.id}>
            <Container structureIdx={idx} containerIndex={index} {...container} />
          </Fragment>
        );
      })}

      {(isHover || (isSelect && !isMouseInsideTree)) && (
        <>
          <MasterButton
            dragRef={setActivatorNodeRef}
            listeners={listeners}
            node={node}
            disableDelete={disableDelete}
            position="outside-right"
          />

          <AddButton node={node} />
        </>
      )}

      <Badge node={node} visibilityCondition={isHover || (isSelect && !isMouseInsideTree)} />

      <HiddenBadge hidden={hide?.[screen]} />
    </div>
  );
}

export const Structure = memo(StructureMemo);
