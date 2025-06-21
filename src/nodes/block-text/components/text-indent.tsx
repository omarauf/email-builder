import { Button, ButtonGroup } from '@mui/material';
import { Iconify } from '@/components/iconify';
import type { Editor } from '@tiptap/core';
import { Block } from '@/components/styles/block';

interface Props {
  editor: Editor;
}

export function TextIndent({ editor }: Props) {
  const nodesAtSelection = getNodesAtSelection(editor);

  let value = null;
  nodesAtSelection.forEach((node) => {
    if (node.attrs.indent) value = node.attrs.indent;
  });

  const indent = () => {
    editor.chain().focus().indent().run();
  };

  const outdent = () => {
    editor.chain().focus().outdent().run();
  };

  return (
    <Block title="Text Indent">
      <ButtonGroup variant="outlined" color="inherit">
        <Button onClick={indent} disabled={value === 4}>
          <Iconify icon="fa6-solid:indent" width={20} />
        </Button>
        <Button onClick={outdent} disabled={value === null}>
          <Iconify icon="fa6-solid:outdent" width={20} />
        </Button>
      </ButtonGroup>
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
