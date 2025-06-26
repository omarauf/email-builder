/* eslint-disable jsx-a11y/control-has-associated-label */
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { cn } from '@/lib/utils';
import { parseLayouts, getLayoutTotal } from '@/utils/layout';
import type { Layout } from '../structure/type';

interface Props {
  layout: Layout;
  size?: 'small' | 'large';
  onClick?: VoidFunction;
  itemRef?: (element: HTMLElement | null) => void;
  listeners?: SyntheticListenerMap;
}

export function LayoutContainer({ layout, size = 'small', onClick, itemRef, listeners }: Props) {
  const layouts = parseLayouts(layout);
  const total = getLayoutTotal(layout);

  const isSmall = size === 'small';

  return (
    <div
      ref={itemRef}
      className={cn(
        'bg-foreground flex rounded hover:shadow-amber-600',
        isSmall ? 'h-8 gap-1 p-[3px]' : 'h-10 gap-1.5 p-1'
      )}
      style={{
        // TODO: use theme palette
        boxShadow: `0 0 0 2px var(--palette-divider)`,
        cursor: onClick ? 'pointer' : 'grab',
      }}
      {...listeners}>
      {layouts.map((l, i) => (
        <button
          type="button"
          key={i}
          onClick={onClick}
          className="bg-primary/60 border-primary rounded border border-dashed py-0.5"
          style={{
            width: `${(l / total) * 100}%`,
          }}
        />
      ))}
    </div>
  );
}
