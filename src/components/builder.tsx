import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { initWasm } from '@css-inline/css-inline-wasm';
import { useSensor, DndContext, useSensors, MouseSensor, TouchSensor } from '@dnd-kit/core';
import { DEFAULT_TEMPLATES } from '@/templates';
import type { EmailTemplateHeaderProps } from '../layout/header';
import { Spinner } from './ui/spinner';
import { RenderTree } from '../layout/tree';
import { DraggableOverlay } from './overlay';
import { EmailSetting } from '../layout/setting';
import { EmailTemplateHeader } from '../layout/header';
import { ElementItemsMenu } from '../layout/menu/items';
import { useBuilderStore } from '../hooks/use-builder-store';
import { snapStartToCursor } from '../utils/snap-start-to-cursor';

type Props = EmailTemplateHeaderProps & {
  name: string;
};

export function EmailBuilder({ onSubmit, name }: Props) {
  const [
    wasmLoading,
    init,
    collisionDetectionStrategy,
    onDragCancel,
    onDragEnd,
    onDragStart,
    setWasmLoading,
  ] = useBuilderStore(
    useShallow((s) => [
      s.wasmLoading,
      s.init,
      s.collisionDetectionStrategy,
      s.onDragCancel,
      s.onDragEnd,
      s.onDragStart,
      s.setWasmLoading,
    ])
  );

  useEffect(() => {
    const selectedTemplate = DEFAULT_TEMPLATES.find(name);

    init(selectedTemplate.data);
  }, [init, name]);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      // activationConstraint: { delay: 250, tolerance: 5, distance: 10 },
    }),
    useSensor(TouchSensor)
  );

  useEffect(() => {
    if (wasmLoading === false) return;
    initWasm(fetch('https://unpkg.com/@css-inline/css-inline-wasm@0.21.0/index_bg.wasm'))
      .then(() => setWasmLoading(false))
      .catch(() => setWasmLoading(false));
  }, [setWasmLoading, wasmLoading]);

  if (wasmLoading)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col gap-2">
          <Spinner size="large" />
          <p className="text-muted-foreground mb-2 text-center text-sm">Loading, please wait...</p>
        </div>
      </div>
    );

  return (
    <div className="flex h-full grow">
      <div className="grow">
        <EmailTemplateHeader onSubmit={onSubmit} />

        <div
          className="relative flex grow flex-col overflow-hidden"
          style={{ height: 'calc(100vh - 72px - 1px)' }}>
          <DndContext
            sensors={sensors}
            collisionDetection={collisionDetectionStrategy}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDragCancel={onDragCancel}
            modifiers={[snapStartToCursor]}>
            <ElementItemsMenu />

            <RenderTree />

            <div className="absolute top-4 right-4 bottom-4 w-[400px]">
              <EmailSetting />
            </div>

            <DraggableOverlay />
          </DndContext>
        </div>
      </div>
    </div>
  );
}
