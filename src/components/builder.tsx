import { Box, Stack } from '@mui/material';
import { useSensor, DndContext, useSensors, MouseSensor, TouchSensor } from '@dnd-kit/core';
import { useShallow } from 'zustand/react/shallow';
import { useEffect } from 'react';
import { initWasm } from '@css-inline/css-inline-wasm';
import { LoadingScreen } from '@/components/loading-screen';
import { DraggableOverlay } from './overlay';
import { snapStartToCursor } from '../utils/snap-start-to-cursor';
import { useBuilderStore } from '../hooks/use-builder-store';
import type { UseLoadTemplateProps } from '../hooks/use-load-template';
import { useLoadTemplate } from '../hooks/use-load-template';
import type { EmailTemplateHeaderProps } from '../layout/header';
import { EmailTemplateHeader } from '../layout/header';
import { ElementItemsMenu } from '../layout/menu/items';
import { RenderTree } from '../layout/tree';
import { EmailSetting } from '../layout/setting';
import { DraftTemplateDialog } from '../layout/draft';
import { Scrollbar } from './scrollbar';

type Props = UseLoadTemplateProps & EmailTemplateHeaderProps;

export function EmailBuilder({ onSubmit, ...other }: Props) {
  const mode = useLoadTemplate(other);

  const [
    wasmLoading,
    collisionDetectionStrategy,
    onDragCancel,
    onDragEnd,
    onDragStart,
    setWasmLoading,
  ] = useBuilderStore(
    useShallow((s) => [
      s.wasmLoading,
      s.collisionDetectionStrategy,
      s.onDragCancel,
      s.onDragEnd,
      s.onDragStart,
      s.setWasmLoading,
    ])
  );

  const sensors = useSensors(
    useSensor(MouseSensor, {
      // activationConstraint: { delay: 250, tolerance: 5, distance: 10 },
    }),
    useSensor(TouchSensor)
  );

  useEffect(() => {
    if (wasmLoading === false) return;
    initWasm(fetch('https://unpkg.com/@css-inline/css-inline-wasm/index_bg.wasm'))
      .then(() => setWasmLoading(false))
      .catch(() => setWasmLoading(false));
  }, [setWasmLoading, wasmLoading]);

  if (wasmLoading) return <LoadingScreen />;

  // return (
  //   <Stack
  //     sx={{
  //       flexGrow: 1,
  //       overflowY: 'auto',
  //       borderTop: (theme) => `1px solid ${theme.palette.divider}`,
  //     }}>
  //     <EmailTemplateHeader onSubmit={onSubmit} />

  //     <Stack
  //       position="relative"
  //       direction="row"
  //       sx={{ flexGrow: 1, height: 'calc(100vh - 72px - 1px)' }}>
  //       <DndContext
  //         sensors={sensors}
  //         collisionDetection={collisionDetectionStrategy}
  //         onDragStart={onDragStart}
  //         onDragEnd={onDragEnd}
  //         onDragCancel={onDragCancel}
  //         modifiers={[snapStartToCursor]}>
  //         <ElementItemsMenu />

  //         <RenderTree />

  //         <DraggableOverlay />
  //       </DndContext>

  //       <Scrollbar sx={{ width: 450, height: '500px' }}>
  //         <EmailSetting />
  //       </Scrollbar>
  //     </Stack>
  //   </Stack>
  // );

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100%',
        flexDirection: 'row',
        flexGrow: 1,
      }}>
      <Box sx={{ flexGrow: 1, borderColor: 'divider' }}>
        <EmailTemplateHeader onSubmit={onSubmit} />

        <Stack
          position="relative"
          overflow="hidden"
          sx={{
            flexGrow: 1,
            height: 'calc(100vh - 72px - 1px)',
          }}>
          <DndContext
            sensors={sensors}
            collisionDetection={collisionDetectionStrategy}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDragCancel={onDragCancel}
            modifiers={[snapStartToCursor]}>
            <ElementItemsMenu />

            <RenderTree />

            <Box
              sx={{
                position: 'absolute',
                top: 15,
                right: 15,
                bottom: 15,
                width: 400,
              }}>
              <EmailSetting />
            </Box>

            <DraggableOverlay />
          </DndContext>
        </Stack>

        <DraftTemplateDialog isCreate={mode === 'create'} />
      </Box>
    </Box>
  );
}
