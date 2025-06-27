import type { JSX } from 'react';
import type { DropAnimation } from '@dnd-kit/core';
import { createPortal } from 'react-dom';
import { CSS } from '@dnd-kit/utilities';
import { DragOverlay, useDndContext } from '@dnd-kit/core';
import { getNodeDragData } from '../utils/node-utils';
import { ElementItem } from '../layout/menu/element-item';
import { menuItems, structureItems } from '../layout/menu/menu';

const dropAnimationConfig: DropAnimation = {
  keyframes({ transform }) {
    return [
      { transform: CSS.Transform.toString(transform.initial) },
      {
        transform: CSS.Transform.toString({
          ...transform.final,
          scaleX: 0.94,
          scaleY: 0.94,
        }),
      },
    ];
  },
  sideEffects({ active, dragOverlay }) {
    active.node.style.opacity = '0';

    const button = dragOverlay.node.querySelector('button');

    if (button) {
      button.animate(
        [
          {
            boxShadow:
              '-1px 0 15px 0 rgba(34, 33, 81, 0.01), 0px 15px 15px 0 rgba(34, 33, 81, 0.25)',
          },
          {
            boxShadow: '-1px 0 15px 0 rgba(34, 33, 81, 0), 0px 15px 15px 0 rgba(34, 33, 81, 0)',
          },
        ],
        {
          duration: 250,
          easing: 'ease',
          fill: 'forwards',
        }
      );
    }

    return () => {
      active.node.style.opacity = '';
    };
  },
};

interface Props {
  dropAnimation?: DropAnimation | null;
}

export function DraggableOverlay({ dropAnimation = dropAnimationConfig }: Props) {
  const { active } = useDndContext();

  let elementToRender: null | JSX.Element = null;
  let animation: DropAnimation | null = dropAnimation;

  // active node could be either element from the tree or
  // new element from the menu
  if (active) {
    const activeData = getNodeDragData(active);

    let icon = '';

    if (activeData.type === 'block')
      icon = menuItems.find((item) => item.blockType === activeData.blockType)?.icon || '';
    else icon = structureItems.find((item) => item.type === activeData.type)?.icon || '';

    if (icon) {
      animation = null;
      elementToRender = <ElementItem icon={icon} className="w-11" />;
    }
  }

  animation = null;

  return createPortal(
    <DragOverlay dropAnimation={animation}>{elementToRender}</DragOverlay>,
    document.body
  );
}
