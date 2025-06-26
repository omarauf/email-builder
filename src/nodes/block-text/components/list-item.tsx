import type { Editor } from '@tiptap/core';
import { Block } from '@/components/styles/block';
import { XToggleButtonGroup } from '@/components/x-common';

export function ListItem({ editor }: { editor: Editor }) {
  const onClickHandler = (value: 'bullet' | 'order' | '') => {
    if (value === 'bullet') editor.chain().focus().toggleBulletList().run();
    else if (value === 'order') editor.chain().focus().toggleOrderedList().run();
  };

  return (
    <Block title="List Item">
      <XToggleButtonGroup
        type="single"
        value={
          editor.isActive('bulletList') ? 'bullet' : editor.isActive('orderedList') ? 'order' : ''
        }
        buttons={[
          { value: 'bullet', icon: 'fa-solid:list-ul' },
          { value: 'order', icon: 'fa-solid:list-ol' },
        ]}
        onChange={onClickHandler}
      />
    </Block>
  );
}
