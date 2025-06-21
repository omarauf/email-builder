import { Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import type { Editor } from '@tiptap/react';
import { Iconify } from '@/components/iconify';
import { XField } from '@/components/input';
import { Block } from '@/components/styles/block';

export function ExternalLink({ editor }: { editor: Editor }) {
  const link: string | undefined = editor.getAttributes('link').href;
  const show = link !== undefined;
  const disabled = Math.abs(editor.state.selection.from - editor.state.selection.to) === 0;

  const handleClick = () => {
    if (link) {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
    } else {
      editor.chain().focus().extendMarkRange('link').setLink({ href: 'https://' }).run();
    }
  };

  const handleChange = (v: string) => {
    editor.commands.setLink({ href: v });
  };

  return (
    <Block
      title="External Link"
      control={
        <ToggleButtonGroup
          disabled={disabled && !link}
          exclusive
          size="small"
          onClick={handleClick}
          value={link ? 'link' : ''}>
          <ToggleButton key="link" value="link">
            <Iconify icon="ph:link" />
          </ToggleButton>
        </ToggleButtonGroup>
      }>
      {show && (
        <Stack spacing={2}>
          <XField.Text
            value={link || ''}
            size="small"
            label="Link"
            placeholder="Enter external link"
            onChange={handleChange}
            sx={{ p: 0 }}
          />
        </Stack>
      )}
    </Block>
  );
}
