import { useDroppable } from '@dnd-kit/core';
import { memo } from 'react';
import { Box, type BoxProps } from '@mui/material';
import { Label } from '@/components/label';
import type { NodeType } from '@/types';
import { getNodeDragData } from '@/utils/node-utils';

type Props = Omit<BoxProps, 'onDrop'> & {
  accept: NodeType;
  stripeIndex: number;
  structureIndex?: number;
  containerIndex?: number;
  blockIndex?: number;
};

const debug = false;

function DropZoneMemo({
  accept,
  stripeIndex,
  structureIndex,
  containerIndex,
  blockIndex,
  sx,
  ...props
}: Props) {
  const type = accept;

  const idx = { stripeIndex, structureIndex, containerIndex, blockIndex };

  const { active, isOver, setNodeRef } = useDroppable({
    id: `drop-zone-${JSON.stringify(idx)}`,
    data: { type: `drop-zone-${type}`, idx },
  });

  // if (!debug && active === null) return null;
  // const activeData = active && getNodeDragData(active);
  // const show = activeData && (accept === activeData.type || accept.includes(activeData.type));
  // if (!debug && !show) return null;

  if (active === null) return null;
  const activeData = getNodeDragData(active);
  const show = accept === activeData.type || accept.includes(activeData.type);
  if (!show) return null;

  let color: 'default' | 'info' | 'success';
  if (type === 'stripe') color = 'default';
  else if (type === 'structure') color = 'info';
  else color = 'success';

  return (
    <Box
      // component={m.div}
      ref={setNodeRef}
      // initial={{ height: "0px" }}
      // animate={{ height: "30px" }}
      // exit={{ height: "0px" }}
      // transition={{ duration: 0.15, ease: [1, 0.5, 0.8, 1] }}
      sx={{
        position: 'relative',
        // borderBottomColor: isOver ? "success.main" : "grey.700",
        // display: isOver ? "flex" : "none",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: isOver ? 'success.lighter' : 'grey.A200',
        color: isOver ? 'success.main' : 'grey.700',
        // opacity: isOver ? 1 : 0,
        height: debug ? '30px' : '0px',
        overflow: 'visible',
        zIndex: 3,
        boxShadow: () => (isOver ? `0 0 0 1px black` : ''),
        ...sx,
      }}
      {...props}>
      {isOver && (
        <Label color="default" variant="filled" sx={{ position: 'absolute' }}>
          Drop here
        </Label>
      )}

      {debug && (
        <Label color={color} variant="filled" sx={{ position: 'absolute' }}>
          {JSON.stringify(idx)}
        </Label>
      )}
    </Box>
  );
}

export const DropZone = memo(DropZoneMemo);
