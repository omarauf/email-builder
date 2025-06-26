import type { Editor } from '@tiptap/react';
import { Block } from '@/components/styles/block';
import { XToggleButtonGroup } from '@/components/x-common';

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
      { value: 'bold', icon: 'solar:text-bold-bold' },
      { value: 'italic', icon: 'solar:text-italic-bold' },
      { value: 'underline', icon: 'ic:round-format-underlined' },
      { value: 'strikethrough', icon: 'tabler:strikethrough' },
    ],
    [
      { value: 'subscript', icon: 'material-symbols:subscript' },
      { value: 'superscript', icon: 'material-symbols:superscript' },
    ],
    [{ value: 'clear', icon: 'pajamas:clear-all' }],
  ];

  const onChangeHandler = (value: string[]) => {
    if (value.includes('bold')) editor.commands.toggleBold();
    else editor.commands.unsetBold();

    if (value.includes('italic')) editor.commands.toggleItalic();
    else editor.commands.unsetItalic();

    if (value.includes('underline')) editor.commands.toggleUnderline();
    else editor.commands.unsetUnderline();

    if (value.includes('strikethrough')) editor.commands.toggleStrike();
    else editor.commands.unsetStrike();

    if (value.includes('subscript')) editor.commands.toggleSubscript();
    else editor.commands.unsetSubscript();

    if (value.includes('superscript')) editor.commands.toggleSuperscript();
    else editor.commands.unsetSuperscript();

    if (value.includes('clear')) {
      editor.commands.unsetBold();
      editor.commands.unsetItalic();
      editor.commands.unsetUnderline();
      editor.commands.unsetStrike();
      editor.commands.unsetSubscript();
      editor.commands.unsetSuperscript();
    }
  };

  return (
    <Block title="Text Style" control>
      <div className="flex w-full justify-between">
        {buttons.map((bG, index) => (
          <XToggleButtonGroup
            type="multiple"
            key={index}
            value={v}
            disabled={disabled}
            buttons={bG}
            onChange={onChangeHandler}
          />
        ))}
      </div>
    </Block>
  );
}
