import { useDroppable } from '@dnd-kit/core';
import { useShallow } from 'zustand/react/shallow';
import { cn } from '@/lib/utils';
import { Iconify } from '@/components/iconify';
import { classname } from '@/constant/classname';
import { useBuilderStore } from '@/hooks/use-builder-store';
import type { ContainerTree, ContainerIndex } from '../type';
import { useDropZoneStyle } from '../style';

type Props = ContainerTree & {
  idx: ContainerIndex;
  width: string;
};

export function ContainerDropZone({ idx, width, ...container }: Props) {
  const { id } = container;

  const { isOver, setNodeRef } = useDroppable({
    id: `drop-zone-${JSON.stringify(idx)}`,
    data: { type: 'drop-zone-container', idx },
  });

  const [hoverEle, active, selectedNode, selectNode] = useBuilderStore(
    useShallow((s) => [s.hoverEle, s.active, s.selectedNode, s.selectNode])
  );

  const isHover = hoverEle?.id === id;
  const isSelect = selectedNode?.id === id;
  const isActive = active?.type === 'block' || active?.type === 'container';
  const isDrag = active?.id === id;

  const node = { ...container, idx };

  const { classes } = useDropZoneStyle(isHover, isOver, isSelect, isActive, isDrag);

  return (
    <div
      aria-hidden="true"
      id={String(id)}
      ref={setNodeRef}
      className={cn('relative flex flex-col', classname.container, ...classes)}
      style={{ width }}
      onClick={(e) => {
        e.stopPropagation();
        selectNode(node);
      }}>
      <Iconify icon="solar:download-outline" className="text-primary" />
      <p className="text-primary mt-2 mb-1 text-center text-xs font-semibold">Drop content here</p>
      {isOver && (
        <span className="bg-muted-foreground text-foreground absolute rounded-md px-2 py-1 text-xs font-bold">
          Drop Here
        </span>
      )}
    </div>
  );
}
