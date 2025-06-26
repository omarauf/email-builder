import type { Extensions } from '@tiptap/react';
import Link from '@tiptap/extension-link';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
// import TextAlign from "@tiptap/extension-text-align";
import Subscript from '@tiptap/extension-subscript';
import TextStyle from '@tiptap/extension-text-style';
import Typography from '@tiptap/extension-typography';
import Placeholder from '@tiptap/extension-placeholder';
import Superscript from '@tiptap/extension-superscript';
import { Indent } from './indent';
import { FontSize } from './font-size';
import { Highlight } from './highlight';
import { FontColor } from './font-color';
import { TextAlign } from './text-align';
// import { MentionSuggestion } from "./mention-suggestion";
import { LineHeight } from './line-height';
// import { TextDirection } from "./text-direction";
import { FontFamily } from './font-family';
import { LetterSpacing } from './letter-spacing';
import { TextSelectionWrapper } from './select-text';
// import { setMark2 } from "./set-mark";

export const extensions: Extensions = [
  TextSelectionWrapper,

  StarterKit.configure(),

  // setMark2,
  Typography,
  TextStyle,
  FontFamily,
  Underline,
  FontSize,
  FontColor,
  Subscript,
  Superscript,
  LetterSpacing,
  Indent,
  // TextDirection,
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),

  Link.configure({ linkOnPaste: false, openOnClick: false }),

  Placeholder.configure({ placeholder: 'Start typing…' }),

  // MentionSuggestion,

  LineHeight.configure({
    types: ['textStyle', 'heading', 'paragraph'],
  }),

  Highlight,
];
