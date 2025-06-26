import { memo } from 'react';
import { useDroppable } from '@dnd-kit/core';
import type { NodeType } from '@/types';
import { getNodeDragData } from '@/utils/node-utils';

interface Props {
  accept: NodeType;
  stripeIndex: number;
  structureIndex?: number;
  containerIndex?: number;
  blockIndex?: number;
  style?: React.CSSProperties;
  width?: string | number;
  top?: string | number;
}

const debug = false;

function DropZoneMemo({
  accept,
  stripeIndex,
  structureIndex,
  containerIndex,
  blockIndex,
  style,
  width,
  top,
}: Props) {
  const type = accept;

  const idx = { stripeIndex, structureIndex, containerIndex, blockIndex };

  const { active, isOver, setNodeRef } = useDroppable({
    id: `drop-zone-${JSON.stringify(idx)}`,
    data: { type: `drop-zone-${type}`, idx },
  });

  if (active === null) return null;
  const activeData = getNodeDragData(active);
  const show = accept === activeData.type || accept.includes(activeData.type);
  if (!show) return null;

  let color: 'default' | 'info' | 'success';
  if (type === 'stripe') color = 'default';
  else if (type === 'structure') color = 'info';
  else color = 'success';

  return (
    <div
      ref={setNodeRef}
      // initial={{ height: "0px" }}
      // animate={{ height: "30px" }}
      // exit={{ height: "0px" }}
      // transition={{ duration: 0.15, ease: [1, 0.5, 0.8, 1] }}
      style={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: debug ? '30px' : '0px',
        overflow: 'visible',
        zIndex: 3,
        boxShadow: isOver ? `0 0 0 1px black` : '',
        width,
        top,
        ...style,
      }}>
      {isOver && (
        <span className="bg-muted-foreground text-foreground absolute rounded-md px-2 py-1 text-xs font-bold">
          Drop Here
        </span>
      )}

      {debug && (
        <p color={color} className="absolute">
          {JSON.stringify(idx)}
        </p>
      )}
    </div>
  );
}

export const DropZone = memo(DropZoneMemo);
