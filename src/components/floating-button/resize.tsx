import { Stack, Typography } from '@mui/material';
import type { RefObject } from 'react';
import { useRef, useEffect } from 'react';
import { Iconify } from '@/components/iconify';
import type { UniqueIdentifier } from '@dnd-kit/core';
import { useBuilderStore } from '@/hooks/use-builder-store';
import type { Responsive } from '@/types';

interface Props {
  id: UniqueIdentifier;
  value: Responsive<number | undefined>;
  screen: 'mobile' | 'desktop';
  ref: RefObject<HTMLDivElement | null>;
  onChange: (value: number) => void;
}

export function ResizeHandler({ id, value, screen, ref, onChange }: Props) {
  const isDown = useRef<number>(undefined);
  const labelRef = useRef<HTMLDivElement>(null);

  const selected = useBuilderStore((s) => s.selectedNode?.id === id);

  useEffect(() => {
    if (!ref.current || !labelRef.current || !selected) return;

    // if (type === "line") elementRef.current.style.height = `auto`;
    // else elementRef.current.style.height = `${value}px`;
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
    <Stack
      direction="row"
      position="absolute"
      justifyContent="center"
      alignItems="center"
      spacing={1}
      className="floating-button"
      onMouseDown={handleMouseDown}
      sx={{
        bottom: 0,
        bgcolor: 'primary.main',
        transform: 'translateY(50%)',
        zIndex: 10,
        color: 'white',
        px: 1,
        py: 0.5,
        borderRadius: 1,
        userSelect: 'none',
        cursor: 's-resize',
        // display: type === "line" ? "none" : "flex",
      }}>
      <Typography variant="body2" ref={labelRef}>{`${value[screen]}px`}</Typography>
      <Iconify icon="vaadin:resize-h" width={16} />
    </Stack>
  );
}
