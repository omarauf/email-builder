import type { Editor } from '@tiptap/core';
import { Iconify } from '@/components/iconify';
import { Block } from '@/components/styles/block';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface Props {
  editor: Editor;
}

export function TextIndent({ editor }: Props) {
  const nodesAtSelection = getNodesAtSelection(editor);

  let value = null;
  nodesAtSelection.forEach((node) => {
    if (node.attrs.indent) value = node.attrs.indent;
  });

  const onChange = (v: string) => {
    if (v === 'indent') editor.chain().focus().indent().run();
    else if (v === 'outdent') editor.chain().focus().outdent().run();
  };

  return (
    <Block title="Text Indent">
      <ToggleGroup type="single" variant="outline" onValueChange={onChange}>
        <ToggleGroupItem value="indent" disabled={value === 4}>
          <Iconify icon="fa6-solid:indent" width={20} />
        </ToggleGroupItem>

        <ToggleGroupItem value="outdent" disabled={value === null}>
          <Iconify icon="fa6-solid:outdent" width={20} />
        </ToggleGroupItem>
      </ToggleGroup>
    </Block>
  );
}

// Function to get nodes at the selection position
function getNodesAtSelection(editor: Editor) {
  const { state } = editor;
  const { selection } = state;
  const { $from, $to } = selection;

  // Getting nodes at the start and end of the selection
  const nodes: any[] = [];
  const { doc } = state;

  // Iterate through the document nodes
  doc.nodesBetween($from.pos, $to.pos, (node) => {
    nodes.push(node);
  });

  return nodes;
}
