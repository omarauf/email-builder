import { Button, ButtonGroup } from '@mui/material';
import type { Editor } from '@tiptap/core';
import { Iconify } from '@/components/iconify';
import { Block } from '@/components/styles/block';

export function ListItem({ editor }: { editor: Editor }) {
  const bullet = () => {
    editor.chain().focus().toggleBulletList().run();
  };

  const order = () => {
    editor.chain().focus().toggleOrderedList().run();
  };

  return (
    <Block title="List Item">
      <ButtonGroup variant="outlined" color="inherit">
        <Button onClick={bullet}>
          <Iconify icon="fa-solid:list-ul" width={20} />
        </Button>
        <Button onClick={order}>
          <Iconify icon="fa-solid:list-ol" width={20} />
        </Button>
      </ButtonGroup>
    </Block>
  );
}
