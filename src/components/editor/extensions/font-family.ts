import '@tiptap/extension-text-style';

import { Extension } from '@tiptap/react';
import { updateNodeStyle } from '../utils/node';

interface FontFamilyOptions {
  /**
   * A list of node names where the font family can be applied.
   * @default ['textStyle']
   * @example ['heading', 'paragraph']
   */
  types: string[];
}

declare module '@tiptap/react' {
  interface Commands<ReturnType> {
    fontFamily: {
      /**
       * Set the font family
       * @param fontFamily The font family
       * @example editor.commands.setFontFamily('Arial')
       */
      setFontFamily: (fontFamily: string) => ReturnType;
      /**
       * Unset the font family
       * @example editor.commands.unsetFontFamily()
       */
      unsetFontFamily: () => ReturnType;
    };
  }
}

/**
 * This extension allows you to set a font family for text.
 * @see https://www.tiptap.dev/api/extensions/font-family
 */
export const FontFamily = Extension.create<FontFamilyOptions>({
  name: 'fontFamily',

  addOptions() {
    return {
      types: ['textStyle', 'paragraph', 'heading'],
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontFamily: {
            default: null,
            parseHTML: (element) => element.style.fontFamily?.replace(/['"]+/g, ''),
            renderHTML: (attributes) => {
              if (!attributes.fontFamily) return {};

              return {
                style: `font-family: ${attributes.fontFamily}`,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setFontFamily:
        (fontFamily) =>
        ({ chain, tr, editor, dispatch }) => {
          tr = updateNodeStyle({
            tr,
            editor,
            nodeUpdateAttrs: {
              markAttrs: (attrs) => {
                delete attrs.fontFamily;
                return attrs;

                // const { fontFamily: oldFontFamily, ...other } = attrs;
                // return other;
              },

              nodeAttrs: (attrs) => ({ ...attrs, fontFamily }),
            },

            markUpdateAttrs: () => {
              chain().setMark('textStyle', { fontFamily }).run();
            },

            ignoreEmpty: false,
          });

          if (tr.docChanged) {
            dispatch?.(tr);
            return true;
          }

          return false;
        },
      unsetFontFamily:
        () =>
        ({ chain }) =>
          chain().setMark('textStyle', { fontFamily: null }).removeEmptyTextStyle().run(),
    };
  },
});
