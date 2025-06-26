import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { Scrollbar } from '@/components/scrollbar';
import { Tree } from '../nodes/tree/render';
import { useDragHandler } from '../hooks/use-drag-handler';
import { useBuilderStore } from '../hooks/use-builder-store';

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
      style={{ position: 'relative', backgroundColor, paddingLeft: 96, paddingRight: 432 }}
      onClick={clearSelectedNode}
      ref={setRef}>
      <Tree />
    </Scrollbar>
  );
}
