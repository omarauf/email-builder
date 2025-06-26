import type { Editor } from '@tiptap/react';
import { Input } from '@/components/ui/input';
import { Iconify } from '@/components/iconify';
import { Block } from '@/components/styles/block';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

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
        <ToggleGroup
          type="single"
          className="gap-0"
          disabled={disabled && !link}
          onValueChange={handleClick}
          value={link ? 'link' : ''}>
          <ToggleGroupItem key="link" value="link">
            <Iconify icon="ph:link" />
          </ToggleGroupItem>
        </ToggleGroup>
      }>
      {show && (
        <div className="flex flex-col gap-4">
          <Input
            value={link || ''}
            placeholder="Enter external link"
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>
      )}
    </Block>
  );
}
