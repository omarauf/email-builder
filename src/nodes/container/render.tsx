import { Stack } from '@mui/material';
import { memo, Fragment } from 'react';
import { MasterButton } from '@/components/floating-button/master';
import { Badge } from '@/components/floating-button/badge';
import { useContainer } from '@/hooks/use-node';
import { Block } from '../block/render';
import { DropZone } from './drop-zone/drop-zone';
import { borderStyle } from '../common/style';
import type { ContainerTree } from './type';
import { useContainerStyle } from './style';
import type { StructureIndex } from '../structure/type';

type Props = ContainerTree & {
  structureIdx: StructureIndex;
  containerIndex: number;
};

function ContainerMemo({ structureIdx, containerIndex, ...container }: Props) {
  const {
    node,
    isActive,
    isHover,
    isDrag,
    isSelect,
    isBlockHover,
    isBlockSelected,
    listeners,
    isMouseInsideTree,
    setNodeRef,
    selectNode,
    setActivatorNodeRef,
  } = useContainer(
    container,
    structureIdx.stripeIndex,
    structureIdx.structureIndex,
    containerIndex
  );

  const { id, idx, children } = node;

  const { containerWrapper, containerStyle } = useContainerStyle(container, idx);

  return (
    <Stack
      id={String(id)}
      ref={setNodeRef}
      direction="column"
      className="container"
      sx={{
        position: 'relative',
        height: '100%',
        ...containerWrapper,
        ...borderStyle(isHover, isSelect, isActive, isDrag, {
          borderColor: 'blue',
        }),
      }}
      onClick={(e) => {
        e.stopPropagation();
        selectNode(node);
      }}>
      <Stack sx={containerStyle}>
        {children.map((block, index) => (
          <Fragment key={block.id}>
            {!isDrag && <DropZone accept="block" {...idx} blockIndex={index} />}

            <Block containerIdx={idx} blockIndex={index} {...block} />
          </Fragment>
        ))}
      </Stack>

      {!isDrag && <DropZone accept="block" {...idx} blockIndex={children.length} />}

      {(isHover || (isSelect && !isMouseInsideTree)) && (
        <MasterButton
          dragRef={setActivatorNodeRef}
          listeners={listeners}
          node={node}
          position="outside-left"
          className="container-master-button"
          colorful
        />
      )}

      <Badge
        node={node}
        visibilityCondition={
          (isHover && !isBlockHover && isBlockSelected) ||
          (isSelect && !isMouseInsideTree) ||
          (isSelect && !isBlockHover && !isBlockSelected)
        }
      />
    </Stack>
  );
}

export const Container = memo(ContainerMemo);
