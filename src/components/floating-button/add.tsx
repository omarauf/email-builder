import { useShallow } from 'zustand/react/shallow';
import type { Node } from '@/types';
import { Iconify } from '@/components/iconify';
import { LayoutContainer } from '@/nodes/container/layout';
import { useBuilderStore } from '@/hooks/use-builder-store';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

interface Props {
  node: Node;
}

export function AddButton({ node }: Props) {
  const [addStripe, addStructure] = useBuilderStore(
    useShallow((s) => [s.addStripe, s.addStructure])
  );

  const { idx, type } = node;

  return (
    <>
      <div
        className="floating-button"
        style={{
          position: 'absolute',
          clipPath: 'polygon(0 0, 10px 100%, 100% 0)',
          transform: 'translateY(100%)',
          width: 'calc(50% - 19px)',
          bottom: 0,
          left: 0,
          height: '46px',
          zIndex: 100,
        }}
      />
      <div
        className="floating-button"
        style={{
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          zIndex: 100,
          paddingTop: 8,
          bottom: 0,
          left: 0,
          transform: 'translateY(100%)',
        }}>
        <Popover>
          <PopoverTrigger asChild>
            <Button size="icon">
              <Iconify color="white" icon="ic:baseline-plus" width={22} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="grid w-[500px] grid-cols-3 gap-3 p-3">
            {(['1', '2', '3', '4', '1:2', '2:1'] as const).map((layout) => (
              <LayoutContainer
                key={layout}
                layout={layout}
                onClick={() => {
                  if (type === 'stripe') addStripe({ stripeIndex: idx.stripeIndex + 1 }, layout);
                  else addStructure({ ...idx, structureIndex: idx.structureIndex + 1 }, layout);
                  // clickPopover.onClose();
                }}
              />
            ))}
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}
