import { Stack } from '@mui/material';
import { memo, Fragment } from 'react';
import { MasterButton } from '@/components/floating-button/master';
import { AddButton } from '@/components/floating-button/add';
import { useBuilderStore } from '@/hooks/use-builder-store';
import { Badge } from '@/components/floating-button/badge';
import { useNode } from '@/hooks/use-node';
import { HiddenBadge } from '@/components/floating-button/hidden';
import { classname } from '@/constant/classname';
import type { StructureTree } from './type';
import type { StripeType, StripeIndex } from '../stripe/type';
import { useStructureStyle } from './style';
import { borderStyle } from '../common/style';
import { ContainerDropZone } from '../container/drop-zone/container-drop-zone';
import { Container } from '../container/render';

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

  const { id, idx, children, data, style } = node;
  const { hide } = data;

  const { structureStyle } = useStructureStyle(structure);

  // Determine direction without nested ternary
  let direction: 'row' | 'column';
  if (screen === 'desktop') direction = 'row';
  else if (style.responsive) direction = 'column';
  else direction = 'row';

  return (
    <Stack
      id={String(id)}
      ref={setNodeRef}
      direction={direction}
      position="relative"
      className={classname.structure}
      sx={{
        ...structureStyle,
        ...borderStyle(isHover, isSelect, isActive, isDrag),
      }}
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
    </Stack>
  );
}

export const Structure = memo(StructureMemo);
