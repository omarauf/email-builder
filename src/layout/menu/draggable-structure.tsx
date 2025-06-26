import type { Dispatch, SetStateAction } from 'react';
import { useState, useEffect } from 'react';
import { useDraggable } from '@dnd-kit/core';
import type { NodeType } from '@/types';
import type { Layout } from '@/nodes/structure/type';
import { useBoolean } from '@/hooks/use-boolean';
import { LayoutContainer } from '@/nodes/container/layout';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { structureItems } from './menu';
import { ElementItem } from './element-item';

const structure = structureItems.find((x) => x.type === 'structure');

export function DraggableStructure() {
  if (!structure) throw new Error('Structure not found');
  const [isDragging, setIsDragging] = useState(false);
  const open = useBoolean();
  const { type, icon } = structure;

  // const { setNodeRef, listeners, isDragging } = useDraggable({
  //   id: `new-item-${type}`,
  //   data: { type },
  // });

  // useEffect(() => {
  //   if (isDragging) clickPopover.onClose();
  // }, [clickPopover, isDragging]);

  // return (
  //   <Popover>
  //     <PopoverTrigger asChild>
  //       <Button variant="outline">Open popover</Button>
  //     </PopoverTrigger>
  //     <PopoverContent className="w-80">Place content for the popover here</PopoverContent>
  //   </Popover>
  // );

  return (
    <Popover open={open.value} onOpenChange={open.setValue}>
      <PopoverTrigger asChild>
        <ElementItem icon={icon} />
      </PopoverTrigger>
      <PopoverContent
        className="flex w-[500px] flex-col gap-2 p-2"
        style={{
          display: isDragging ? 'none' : 'block',
        }}>
        {(['1', '2', '3', '4', '6', '7', '8', '9', '10', '1:2', '1:3', '2:1', '3:1'] as const).map(
          (layout) => (
            <DraggableLayoutContainer
              key={layout}
              layout={layout}
              onClose={open.onFalse}
              type={type}
              setIsDragging={setIsDragging}
            />
          )
        )}
      </PopoverContent>
    </Popover>
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
