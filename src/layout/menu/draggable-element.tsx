import { useDraggable } from '@dnd-kit/core';
import type { NodeType } from '@/types';
import type { BlockType } from '@/nodes/block/type';
import { ElementItem } from './element-item';

interface Props {
  icon: string;
  title: string;
  type: NodeType;
  blockType: BlockType;
}

export function DraggableElementItem({ icon, title, type, blockType }: Props) {
  const { setNodeRef, listeners } = useDraggable({
    id: `new-item-${type}-${blockType}`,
    data: { type, blockType },
  });

  return <ElementItem icon={icon} tooltip={title} itemRef={setNodeRef} listeners={listeners} />;
}
