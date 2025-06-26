import { memo, Fragment } from 'react';
import { cn } from '@/lib/utils';
import { useContainer } from '@/hooks/use-node';
import { classname } from '@/constant/classname';
import { Badge } from '@/components/floating-button/badge';
import { MasterButton } from '@/components/floating-button/master';
import type { ContainerTree } from './type';
import type { StructureIndex } from '../structure/type';
import { Block } from '../block/render';
import { useContainerStyle } from './style';
import { DropZone } from './drop-zone/drop-zone';
import { useBorderStyle } from '../common/use-border-style';

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
  const { classes, beforeClasses } = useBorderStyle(isHover, isSelect, isActive, isDrag, 'blue');

  return (
    <div
      aria-hidden="true"
      id={String(id)}
      ref={setNodeRef}
      className={cn(
        'relative flex h-full flex-col',
        classname.container,
        ...classes,
        ...beforeClasses
      )}
      style={containerWrapper}
      onClick={(e) => {
        e.stopPropagation();
        selectNode(node);
      }}>
      <div style={containerStyle}>
        {children.map((block, index) => (
          <Fragment key={block.id}>
            {!isDrag && <DropZone accept="block" {...idx} blockIndex={index} />}

            <Block containerIdx={idx} blockIndex={index} {...block} />
          </Fragment>
        ))}
      </div>

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
    </div>
  );
}

export const Container = memo(ContainerMemo);
