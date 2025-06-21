import { createPortal } from 'react-dom';
import { DragOverlay, useDndContext } from '@dnd-kit/core';
import type { DropAnimation } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import type { JSX } from 'react';
import { ElementItem } from '../layout/menu/element-item';
import { menuItems, structureItems } from '../layout/menu/menu';
import { getNodeDragData } from '../utils/node-utils';

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
    const activeNode = active.node; // TODO: check if this is correct
    activeNode.style.opacity = '0';

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
      activeNode.style.opacity = '';
    };
  },
};

interface Props {
  dropAnimation?: DropAnimation | null;
}

export function DraggableOverlay({ dropAnimation = dropAnimationConfig }: Props) {
  const { active } = useDndContext();
  // const { selectedNode } = useBuilderContextx();

  let elementToRender: null | JSX.Element = null;
  let animation: DropAnimation | null = dropAnimation;

  // active node could be either element from the tree or
  // new element from the menu
  if (active) {
    const activeData = getNodeDragData(active);

    // if (selectedNode) {
    //   elementToRender = <RenderElement element={selectedNode} />;
    // }

    const menuItem = [...menuItems, ...structureItems].find(
      (item) => item.type === activeData?.type
    );

    if (menuItem) {
      animation = null;
      elementToRender = <ElementItem icon={menuItem.icon} sx={{ width: 44 }} />;
    }
  }

  animation = null;

  return createPortal(
    <DragOverlay dropAnimation={animation}>{elementToRender}</DragOverlay>,
    document.body
  );
}
