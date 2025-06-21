import type { Editor } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react';
import { Box, IconButton } from '@mui/material';
import { Iconify } from '@/components/iconify';

interface PopoverProps {
  editor: Editor;
}

export function Popover({ editor }: PopoverProps) {
  return (
    <Box component={BubbleMenu} editor={editor} sx={{ bgcolor: 'background.default' }}>
      <IconButton className="icon" onClick={() => editor.chain().focus().toggleBold().run()}>
        <Iconify icon="ic:round-format-bold" />
      </IconButton>
      <IconButton className="icon" onClick={() => editor.chain().focus().toggleItalic().run()}>
        <Iconify icon="ic:round-format-italic" />
      </IconButton>
      <IconButton className="icon" onClick={() => editor.chain().focus().toggleStrike().run()}>
        <Iconify icon="ic:outline-strikethrough-s" />
      </IconButton>
    </Box>
  );
}
