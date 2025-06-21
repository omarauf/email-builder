import { Box } from '@mui/material';
import { useShallow } from 'zustand/react/shallow';
import { memo } from 'react';
import { MasterButton } from '@/components/floating-button/master';
import { useBuilderStore } from '@/hooks/use-builder-store';
import { Badge } from '@/components/floating-button/badge';
import { useNode } from '@/hooks/use-node';
import { ImageBlock } from '../block-image/render';
import { ButtonBlock } from '../block-button/render';
import { SpacerBlock } from '../block-spacer/render';
import { TextBlock } from '../block-text/render';
import { MenuBlock } from '../block-menus/render';
import { borderStyle } from '../common/style';
import type { BlockTree, BlockIndex } from './type';
import type { StripeType } from '../stripe/type';
import type { ContainerIndex } from '../container/type';
import { CodeBlock } from '../block-code/render';
import { DividerBlock } from '../block-divider/render';

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

  return (
    <Box
      ref={setNodeRef}
      className="block"
      id={`${block.id}`}
      sx={{
        position: 'relative',
        ...style,
        ...borderStyle(isHover, isSelect, isActive, isDrag),
      }}
      onClick={(e) => {
        e.stopPropagation();
        selectNode(node);
      }}
      dir={rtl ? 'rtl' : 'ltr'}>
      {element}

      {(isHover || (isSelect && !isMouseInsideTree)) && (
        <MasterButton
          dragRef={setActivatorNodeRef}
          listeners={listeners}
          node={node}
          position="outside-right"
        />
      )}

      <Badge node={node} visibilityCondition={isHover || (isSelect && !isMouseInsideTree)} />
    </Box>
  );
}

export const Block = memo(BlockMemo);
