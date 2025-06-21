import { useRef, useEffect, useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import type { Theme, SxProps } from '@mui/material';
import { Box } from '@mui/material';
import { useDebounce } from '@/hooks/use-debounce-fc';
import { useShallow } from 'zustand/react/shallow';
import { useBuilderStore } from '@/hooks/use-builder-store';
import { extensions } from './extensions';

// import { Toolbar } from "./Toolbar";
// import { Popover } from "./Popover";

// import './style/Tiptap.css';
// import { Popover } from "./Popover";
// import { Toolbar } from "./toolbar";

interface TiptapProps {
  content: string;
  sx?: SxProps<Theme>;
  onChange: (content: string) => void;
}

// const withToolbar = true;
// const withPopover = true;

export function Tiptap({ content, sx, onChange }: TiptapProps) {
  const [screen, setEditor] = useBuilderStore(useShallow((s) => [s.screen, s.setEditor]));

  /**
   * We care crate a flag to distinguish between the two sources of updates:
   * - `onValueChange` is triggered by the `onKeyDown` event of the `EditorContent` component.
   * - `onUpdate` is triggered by the `onUpdate` for all events for the editor.
   * we only want to debounce the event of the `onKeyDown` event.
   * other events should be handled immediately.
   */
  const updateSource = useRef('');

  const editor = useEditor(
    {
      content,
      extensions,

      onUpdate: (u) => {
        /**
         * If the update source is `onValueChange` then we should not update the editor.
         */
        if (updateSource.current === 'onValueChange') {
          updateSource.current = '';
          return;
        }

        /**
         * If the update source is not `onValueChange` then we should update the editor.
         * like change font size, font family, etc.
         */
        u.editor.commands.removeEmptyTextStyle();
        onChange(u.editor.getHTML());
      },
    },
    [extensions]
  );

  const { debounceValue } = useDebounce(
    editor?.getHTML() || '',
    (v) => {
      onChange(v);
      return v;
    },
    1000
  );

  // just for development to update extensions
  useEffect(() => {
    if (editor) setEditor(editor);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [extensions]);

  useEffect(() => {
    editor?.chain().focus().setTextAlignScreen(screen).setFontSizeScreen(screen).run();
  }, [editor, screen]);

  // useEffect(() => {
  //   editor?.commands.changeDefaultAlignment(rtl ? "right" : "left");
  // }, [editor, rtl]);

  const onValueChange = useCallback(() => {
    if (!editor) return;
    editor.commands.removeEmptyTextStyle();
    debounceValue(editor.getHTML());
    /**
     * Set the update source to `onValueChange` to distinguish between the two sources of updates.
     */
    updateSource.current = 'onValueChange';
  }, [editor, debounceValue]);

  if (!editor) {
    return null;
  }

  return (
    <Box onClick={() => setEditor(editor)} sx={sx}>
      {/* {withToolbar ? <Toolbar editor={editor} /> : null} */}
      {/* {withPopover ? <Popover editor={editor} /> : null} */}
      {/* {active && (
        <Portal container={() => toolbarRef.current!}>
          <Toolbar editor={editor} />
        </Portal>
      )} */}
      <EditorContent
        editor={editor}
        onInputCapture={onValueChange}
        // onKeyDown={onValueChange}
        // onKeyDown={() => console.log("Down", editor?.getHTML())}
        // onKeyUp={onValueChange}
        // onKeyUp={() => console.log("Up", editor?.getHTML())}
      />
    </Box>
  );
}
