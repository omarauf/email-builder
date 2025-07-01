import type { RefObject } from 'react';
import type { UniqueIdentifier } from '@dnd-kit/core';
import { useRef, useEffect } from 'react';
import type { Screen, Responsive } from '@/types';
import { cn } from '@/lib/utils';
import { Iconify } from '@/components/iconify';
import { useBuilderStore } from '@/hooks/use-builder-store';

interface Props {
  id: UniqueIdentifier;
  value: Responsive<number | undefined>;
  screen: Screen;
  ref: RefObject<HTMLDivElement | null>;
  onChange: (value: number) => void;
}

export function ResizeHandler({ id, value, screen, ref, onChange }: Props) {
  const isDown = useRef<number>(undefined);
  const labelRef = useRef<HTMLDivElement>(null);

  const selected = useBuilderStore((s) => s.selectedNode?.id === id);

  useEffect(() => {
    if (!ref.current || !labelRef.current || !selected) return;

    ref.current.style.height = `${value[screen]}px`;
  }, [ref, selected, screen, value]);

  if (!selected) return null;

  const handleMouseMove = (e: MouseEvent): void => {
    e.preventDefault();

    if (isDown.current === undefined || !ref.current || !labelRef.current) return;

    const v = e.pageY + (value[screen] || 0) - isDown.current;

    if (v < 1) return;

    ref.current.style.height = `${v}px`;
    labelRef.current.textContent = `${v}px`;
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement> | MouseEvent): void => {
    isDown.current = e.pageY;

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseUp = (e: MouseEvent): void => {
    if (isDown.current !== undefined) onChange(e.pageY + (value[screen] || 0) - isDown.current);

    isDown.current = undefined;

    window.removeEventListener('mouseup', handleMouseUp);
    window.removeEventListener('mousemove', handleMouseMove);
  };

  return (
    <div
      aria-hidden="true"
      className={cn(
        'floating-button',
        'bg-primary absolute bottom-0 left-1/2 z-10 flex -translate-x-1/2 translate-y-1/2 cursor-s-resize items-center justify-center gap-2 rounded-md px-2 py-1 text-white select-none'
      )}
      onMouseDown={handleMouseDown}>
      <p ref={labelRef}>{`${value[screen]}px`}</p>
      <Iconify icon="vaadin:resize-h" width={16} />
    </div>
  );
}
