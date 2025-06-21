import { Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Iconify } from '@/components/iconify';
import type { Editor } from '@tiptap/react';
import { Block } from '@/components/styles/block';

interface Props {
  editor: Editor;
}

export function TextStyle({ editor }: Props) {
  const v: string[] = [];
  const isBold = editor.isActive('bold');
  const isItalic = editor.isActive('italic');
  const isUnderline = editor.isActive('underline');
  const isStrike = editor.isActive('strike');
  const isSubscript = editor.isActive('subscript');
  const isSuperscript = editor.isActive('superscript');

  if (isBold) v.push('bold');
  if (isItalic) v.push('italic');
  if (isUnderline) v.push('underline');
  if (isStrike) v.push('strikethrough');
  if (isSubscript) v.push('subscript');
  if (isSuperscript) v.push('superscript');

  const disabled = Math.abs(editor.state.selection.from - editor.state.selection.to) === 0;

  const buttons = [
    [
      {
        value: 'bold',
        icon: 'solar:text-bold-bold',
        onclick: () => editor.commands.toggleBold(),
      },
      {
        value: 'italic',
        icon: 'solar:text-italic-bold',
        onclick: () => editor.commands.toggleItalic(),
      },
      {
        value: 'underline',
        icon: 'ic:round-format-underlined',
        onclick: () => editor.commands.toggleUnderline(),
      },
      {
        value: 'strikethrough',
        icon: 'tabler:strikethrough',
        onclick: () => editor.commands.toggleStrike(),
      },
    ],
    [
      {
        value: 'subscript',
        icon: 'material-symbols:subscript',
        onclick: () => editor.commands.toggleSubscript(),
      },
      {
        value: 'superscript',
        icon: 'material-symbols:superscript',
        onclick: () => editor.commands.toggleSuperscript(),
      },
    ],
    [
      {
        value: '',
        icon: 'pajamas:clear-all',
        onclick: () => {
          editor.commands.unsetBold();
          editor.commands.unsetItalic();
          editor.commands.unsetUnderline();
          editor.commands.unsetStrike();
          editor.commands.unsetSubscript();
          editor.commands.unsetSuperscript();
        },
      },
    ],
  ];

  return (
    <Block title="Text Style" control>
      <Stack direction="row" justifyContent="space-between" width={1}>
        {buttons.map((bG, index) => (
          <ToggleButtonGroup key={index} size="small" value={v} disabled={disabled}>
            {bG.map((b) => (
              <ToggleButton key={b.icon} value={b.value} onClick={() => b.onclick()}>
                <Iconify icon={b.icon} />
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        ))}
      </Stack>
    </Block>
  );
}
