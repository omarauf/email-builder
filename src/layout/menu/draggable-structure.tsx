import { useDraggable } from '@dnd-kit/core';
import { Stack } from '@mui/material';
import { usePopover, CustomPopover } from '@/components/custom-popover';
import type { Dispatch, SetStateAction } from 'react';
import { useState, useEffect } from 'react';
import type { Layout } from '@/nodes/structure/type';
import type { NodeType } from '@/types';
import { LayoutContainer } from '@/nodes/container/layout';
import { ElementItem } from './element-item';
import { structureItems } from './menu';

const structure = structureItems.find((x) => x.type === 'structure');

export function DraggableStructure() {
  if (!structure) throw new Error('Structure not found');
  const clickPopover = usePopover();
  const [isDragging, setIsDragging] = useState(false);

  const { type, icon } = structure;

  // const { setNodeRef, listeners, isDragging } = useDraggable({
  //   id: `new-item-${type}`,
  //   data: { type },
  // });

  // useEffect(() => {
  //   if (isDragging) clickPopover.onClose();
  // }, [clickPopover, isDragging]);

  return (
    <>
      <ElementItem icon={icon} onClick={clickPopover.onOpen} />

      <CustomPopover
        open={clickPopover.open}
        onClose={clickPopover.onClose}
        anchorEl={clickPopover.anchorEl}
        sx={{ display: isDragging ? 'none' : 'block' }}
        slotProps={{ arrow: { placement: 'top-left', hide: true } }}>
        <Stack sx={{ p: 1.5, width: 500 }} spacing={2}>
          {(
            ['1', '2', '3', '4', '6', '7', '8', '9', '10', '1:2', '1:3', '2:1', '3:1'] as const
          ).map((layout) => (
            <DraggableLayoutContainer
              key={layout}
              layout={layout}
              onClose={clickPopover.onClose}
              type={type}
              setIsDragging={setIsDragging}
            />
          ))}
        </Stack>
      </CustomPopover>
    </>
  );
}

interface Props {
  layout: Layout;
  type: NodeType;
  onClose: VoidFunction;
  setIsDragging: Dispatch<SetStateAction<boolean>>;
}

function DraggableLayoutContainer({ layout, type, onClose, setIsDragging }: Props) {
  const [started, setStarted] = useState(false);

  const { setNodeRef, listeners, isDragging, active } = useDraggable({
    id: `new-item-${type}-${layout}`,
    data: { type, layout },
  });

  useEffect(() => {
    if (active && !started) {
      setIsDragging(true);
      setStarted(true);
    }

    if (!active && started) {
      onClose();
      setTimeout(() => setIsDragging(false), 100); // TODO: fix this code later 2024/09/04 remove the timeout function
      setStarted(false);
    }
  }, [onClose, isDragging, active, started, setIsDragging]);

  return (
    <LayoutContainer
      size="large"
      key={layout}
      layout={layout}
      itemRef={setNodeRef}
      listeners={listeners}
      onClick={() => {
        // TODO: complete this part
      }}
    />
  );
}
