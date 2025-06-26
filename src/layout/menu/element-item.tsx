import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { cn } from '@/lib/utils';
import { Iconify } from '@/components/iconify';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';

interface Props {
  icon: string;
  itemRef?: (element: HTMLElement | null) => void;
  listeners?: SyntheticListenerMap;
  tooltip?: string;
  onClick?: VoidFunction;
  className?: string;
}

export function ElementItem({
  icon,
  tooltip,
  itemRef,
  listeners,
  onClick,
  className,
  ...other
}: Props) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          ref={itemRef || null}
          onClick={onClick}
          className={cn(
            'aspect-square w-11 rounded-lg border border-gray-300 transition-all duration-200 hover:scale-105',
            className
          )}
          style={{
            cursor: onClick ? 'pointer' : 'grab',
          }}
          {...other}
          {...listeners}>
          <Iconify icon={icon} width={20} />
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
