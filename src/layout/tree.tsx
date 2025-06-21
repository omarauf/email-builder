import { useShallow } from 'zustand/react/shallow';
import { useEffect } from 'react';
import { Scrollbar } from '@/components/scrollbar';
import { Tree } from '../nodes/tree/render';
import { useBuilderStore } from '../hooks/use-builder-store';
import { useDragHandler } from '../hooks/use-drag-handler';

export function RenderTree() {
  useDragHandler();

  const [backgroundColor, addChange, clearSelectedNode, setRef, fetchImages] = useBuilderStore(
    useShallow((s) => [
      s.styles.general.backgroundColor,
      s.addChange,
      s.clearSelectedNode,
      s.setRef,
      s.fetchImages,
    ])
  );

  useEffect(() => {
    fetchImages();
    addChange('init');
  }, [addChange, fetchImages]);

  return (
    <Scrollbar
      sx={{ position: 'relative', bgcolor: backgroundColor }}
      onClick={clearSelectedNode}
      ref={setRef}>
      <Tree />
    </Scrollbar>
  );
}
