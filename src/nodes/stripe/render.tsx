import { memo, Fragment } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { cn } from '@/lib/utils';
import { useNode } from '@/hooks/use-node';
import { classname } from '@/constant/classname';
import { Badge } from '@/components/floating-button/badge';
import { useBuilderStore } from '@/hooks/use-builder-store';
import { AddButton } from '@/components/floating-button/add';
import { HiddenBadge } from '@/components/floating-button/hidden';
import { DEFAULT_MOBILE_WIDTH } from '@/styles/general/blueprint';
import { MasterButton } from '@/components/floating-button/master';
import type { StripeTree } from './type';
import { useStripeStyle } from './style';
import { Structure } from '../structure/render';
import { useBorderStyle } from '../common/use-border-style';
import { DropZone } from '../container/drop-zone/drop-zone';

type Props = StripeTree & {
  stripeIndex: number;
};

export function StripeMemo({ stripeIndex, ...stripe }: Props) {
  const {
    node,
    isActive,
    isHover,
    isDrag,
    active,
    isSelect,
    listeners,
    isMouseInsideTree,
    setNodeRef,
    selectNode,
    setActivatorNodeRef,
  } = useNode(stripe, stripeIndex);

  const [generalWidth, screen] = useBuilderStore(
    useShallow((s) => [s.styles.general.width, s.screen])
  );

  const { idx, id, children } = node;

  const { stripeType, hide } = stripe.data;

  const { stripeWrapper, stripeStyle } = useStripeStyle(stripe);

  // we are hiding the drop zone on top and bottom of the stripe of the selected structure
  // because both stripe and structure have the some ordination (columns)
  // we need to delete so no overlap occurs
  // so when dragging a structure over drop zone it will show the other stripe dorp zone
  const shouldHideDropZone =
    active?.type === 'structure' && active?.idx?.stripeIndex === idx?.stripeIndex;

  const adjustedGeneralWidth = screen === 'desktop' ? generalWidth : DEFAULT_MOBILE_WIDTH;

  const { classes, beforeClasses } = useBorderStyle(isHover, isSelect, isActive, isDrag);

  return (
    <div
      id={String(id)}
      ref={setNodeRef}
      aria-hidden="true"
      className={cn(
        'relative flex flex-col',
        classname.stripeWrapper,
        ...classes,
        ...beforeClasses
      )}
      style={stripeWrapper}
      onClick={(e) => {
        e.stopPropagation();
        selectNode(node);
      }}>
      <div
        style={{
          width: adjustedGeneralWidth,
          ...stripeStyle,
        }}>
        {children.map((structure, index) => (
          <Fragment key={structure.id}>
            {(!shouldHideDropZone ||
              (active?.idx.stripeIndex === idx.stripeIndex && index !== 0)) && (
              <DropZone
                accept="structure"
                stripeIndex={idx.stripeIndex}
                structureIndex={index}
                width={adjustedGeneralWidth}
              />
            )}

            <Structure
              stripeIdx={idx}
              structureIndex={index}
              stripeType={stripeType}
              disableDelete={children.length === 1}
              {...structure}
            />
          </Fragment>
        ))}
      </div>

      {(isHover || (isSelect && !isMouseInsideTree)) && (
        <>
          <MasterButton
            dragRef={setActivatorNodeRef}
            listeners={listeners}
            node={node}
            position="inside"
          />

          <AddButton node={node} />
        </>
      )}

      <Badge node={node} visibilityCondition={isHover || (isSelect && !isMouseInsideTree)} />

      {!shouldHideDropZone && (
        <DropZone
          accept="structure"
          // idx={{ stripeIndex: idx.stripeIndex, structureIndex: children.length }}
          stripeIndex={idx.stripeIndex}
          structureIndex={children.length}
          width={generalWidth}
          // we add this line to prevent the drop zone overlap
          // last zone of the stripe 1 will overlap the first zone of the stripe 2
          // we move the last zone of the stripe 1 1px to top also the will have different y position
          // For, example,
          // last zone of the stripe 1: top: 200px it (201px - 1px = 200px)
          // first zone of the stripe 2: top: 201px
          top={-1}
        />
      )}

      <HiddenBadge hidden={hide?.[screen]} />
    </div>
  );
}

export const Stripe = memo(StripeMemo);
