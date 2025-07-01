import { memo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { cn } from '@/lib/utils';
import { useNode } from '@/hooks/use-node';
import { classname } from '@/constant/classname';
import { Badge } from '@/components/floating-button/badge';
import { useBuilderStore } from '@/hooks/use-builder-store';
import { MasterButton } from '@/components/floating-button/master';
import type { StripeType } from '../stripe/type';
import type { BlockTree, BlockIndex } from './type';
import type { ContainerIndex } from '../container/type';
import { TextBlock } from '../block-text/render';
import { CodeBlock } from '../block-code/render';
import { MenuBlock } from '../block-menus/render';
import { ImageBlock } from '../block-image/render';
import { ButtonBlock } from '../block-button/render';
import { SpacerBlock } from '../block-spacer/render';
import { DividerBlock } from '../block-divider/render';
import { useBorderStyle } from '../common/use-border-style';

type RenderBlockProps = BlockTree & {
  stripeType: StripeType;
  idx: BlockIndex;
};

export function RenderBlock({ ...block }: RenderBlockProps) {
  if (block.blockType === 'button') return ButtonBlock({ ...block });

  if (block.blockType === 'image') return ImageBlock({ ...block });

  if (block.blockType === 'spacer') return SpacerBlock({ ...block });

  if (block.blockType === 'text') return TextBlock({ ...block });

  if (block.blockType === 'menu') return MenuBlock({ ...block });

  if (block.blockType === 'code') return CodeBlock({ ...block });

  if (block.blockType === 'divider') return DividerBlock({ ...block });

  return {
    element: <div>Block not found</div>,
    style: {},
  };
}

//------------------------------------------------

type Props = BlockTree & {
  containerIdx: ContainerIndex;
  blockIndex: number;
};

function BlockMemo({ containerIdx, blockIndex, ...block }: Props) {
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
  } = useNode(
    block,
    containerIdx.stripeIndex,
    containerIdx.structureIndex,
    containerIdx.containerIndex,
    blockIndex
  );

  const [rtl, getParentStripeType] = useBuilderStore(
    useShallow((s) => [s.styles.general.rtl, s.getParentStripeType])
  );

  const stripeType = getParentStripeType(node);
  const { element, style } = RenderBlock({ ...node, stripeType });

  const { classes, beforeClasses } = useBorderStyle(isHover, isSelect, isActive, isDrag);

  return (
    <div
      aria-hidden="true"
      ref={setNodeRef}
      className={cn(classname.block, ...classes, ...beforeClasses)}
      id={`${block.id}`}
      style={{ position: 'relative', ...style }}
      onClick={(e) => {
        e.stopPropagation();
        selectNode(node);
      }}
      dir={rtl ? 'rtl' : 'ltr'}>
      <div className={classname.blockContent} style={{ width: '100%' }}>
        {element}
      </div>

      {(isHover || (isSelect && !isMouseInsideTree)) && (
        <MasterButton
          dragRef={setActivatorNodeRef}
          listeners={listeners}
          node={node}
          position="outside-right"
        />
      )}

      <Badge node={node} visibilityCondition={isHover || (isSelect && !isMouseInsideTree)} />
    </div>
  );
}

export const Block = memo(BlockMemo);
