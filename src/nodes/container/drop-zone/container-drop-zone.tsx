import { useDroppable } from '@dnd-kit/core';
import { Stack, Typography } from '@mui/material';
import { Iconify } from '@/components/iconify';
import { useShallow } from 'zustand/react/shallow';
import { Label } from '@/components/label';
import { useBuilderStore } from '@/hooks/use-builder-store';
import type { ContainerTree, ContainerIndex } from '../type';
import { containerDropZoneStyle } from '../style';

type Props = ContainerTree & {
  idx: ContainerIndex;
  width: string;
};

export function ContainerDropZone({ idx, width, ...container }: Props) {
  const { id } = container;

  const { isOver, setNodeRef } = useDroppable({
    id: `drop-zone-${JSON.stringify(idx)}`,
    data: { type: 'drop-zone-container', idx },
  });

  const [hoverEle, active, selectedNode, selectNode] = useBuilderStore(
    useShallow((s) => [s.hoverEle, s.active, s.selectedNode, s.selectNode])
  );

  const isHover = hoverEle?.id === id;
  const isSelect = selectedNode?.id === id;
  const isActive = active?.type === 'block' || active?.type === 'container';
  const isDrag = active?.id === id;

  const node = { ...container, idx };

  return (
    <Stack
      id={String(id)}
      ref={setNodeRef}
      className="container"
      sx={{
        width,
        ...containerDropZoneStyle(isHover, isOver, isSelect, isActive, isDrag),
      }}
      onClick={(e) => {
        e.stopPropagation();
        selectNode(node);
      }}>
      <Iconify icon="solar:download-outline" color="primary.main" />
      <Typography
        color="primary.main"
        variant="body2"
        textAlign="center"
        style={{ lineHeight: 1.5, letterSpacing: 'normal' }}>
        Drop content here
      </Typography>
      {isOver && (
        <Label color="default" variant="filled" sx={{ position: 'absolute' }}>
          Drop here
        </Label>
      )}
    </Stack>
  );
}
