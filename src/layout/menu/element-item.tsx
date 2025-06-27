import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { cn } from '@/lib/utils';
import { Iconify } from '@/components/iconify';

interface Props {
  icon: string;
  itemRef?: (element: HTMLElement | null) => void;
  listeners?: SyntheticListenerMap;
  tooltip?: string;
  onClick?: VoidFunction;
  className?: string;
}

export function ElementItem({ icon, itemRef, listeners, onClick, className }: Props) {
  return (
    <div
      aria-hidden="true"
      ref={itemRef || null}
      onClick={onClick}
      className={cn(
        'bg-muted flex aspect-square w-11 items-center justify-center rounded-lg border transition-all duration-200 hover:scale-105',
        className
      )}
      style={{
        cursor: onClick ? 'pointer' : 'grab',
      }}
      {...listeners}>
      <Iconify icon={icon} width={20} />
    </div>
  );
}
