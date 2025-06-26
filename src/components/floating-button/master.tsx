import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { useShallow } from 'zustand/react/shallow';
import type { Node } from '@/types';
import { cn } from '@/lib/utils';
import { Iconify } from '@/components/iconify';
import { useBuilderStore } from '@/hooks/use-builder-store';

interface Props {
  listeners?: SyntheticListenerMap;
  className?: string;
  dragRef: (element: HTMLElement | null) => void;
  node: Node;
  position: 'outside-right' | 'outside-left' | 'inside';
  colorful?: boolean;
  disableDelete?: boolean;
}

export function MasterButton({
  listeners,
  className,
  node,
  colorful,
  disableDelete,
  position,
  dragRef,
}: Props) {
  const [deleteNode, cloneNode, selectNode] = useBuilderStore(
    useShallow((s) => [s.deleteNode, s.cloneNode, s.selectNode])
  );

  return (
    <>
      <div
        dir="ltr"
        className={cn('floating-button', className)}
        style={{
          position: 'absolute',
          top: 0,
          height: '100%',
          width: '46px',
          zIndex: 100,

          ...(position === 'inside' && {
            right: 0,
            paddingRight: '8px',
          }),

          ...(position === 'outside-right' && {
            clipPath: 'polygon(0 0,100% calc(50% - 10px),100% calc(50% + 10px),0 100%)',
            right: 0,
            transform: 'translateX(100%)',
          }),

          ...(position === 'outside-left' && {
            left: 1,
            clipPath: 'polygon(100% 0,0 calc(50% - 10px),0 calc(50% + 10px),100% 100%)',
            transform: 'translateX(-100%)',
          }),
        }}
      />

      <div
        dir="ltr"
        className={cn('floating-button', className)}
        style={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          alignItems: 'center',
          zIndex: 100,
          ...(position === 'inside' && {
            right: 0,
            paddingRight: '8px',
          }),

          ...(position === 'outside-right' && {
            right: 0,
            transform: 'translateY(-50%) translateX(100%)',
            paddingLeft: '8px',
          }),

          ...(position === 'outside-left' && {
            left: 0,
            transform: 'translateY(-50%) translateX(-100%)',
            paddingRight: '8px',
          }),
        }}>
        <div
          className={cn(
            'group flex h-9.5 w-9.5 rounded-2xl hover:w-auto',
            colorful ? 'bg-primary' : 'bg-muted'
          )}>
          <div className="hidden group-hover:flex">
            <button type="button" className="size-9 cursor-grab" ref={dragRef} {...listeners}>
              <Iconify icon="ant-design:drag-outlined" color="white" width={22} />
            </button>

            <button
              type="button"
              className="size-9"
              disabled={disableDelete}
              onClick={() => {
                selectNode(undefined);
                deleteNode(node);
              }}>
              <Iconify icon="solar:trash-bin-trash-bold" color="white" width={22} />
            </button>

            <button type="button" className="size-9" onClick={() => cloneNode(node)}>
              <Iconify icon="ion:duplicate" color="white" width={22} />
            </button>
          </div>

          <button type="button" className="size-9">
            <Iconify icon="tabler:dots" color="white" width={22} />
          </button>
        </div>
      </div>
    </>
  );
}
