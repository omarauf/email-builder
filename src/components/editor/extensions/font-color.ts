import '@tiptap/extension-text-style';

import { Extension } from '@tiptap/react';
import { updateNodeStyle } from '../utils/node';

export interface ColorOptions {
  /**
   * The types where the color can be applied
   * @default ['textStyle']
   * @example ['heading', 'paragraph']
   */
  types: string[];
}

declare module '@tiptap/react' {
  interface Commands<ReturnType> {
    color: {
      /**
       * Set the text color
       * @param color The color to set
       * @example editor.commands.setColor('red')
       */
      setColor: (color: string) => ReturnType;

      /**
       * Unset the text color
       * @example editor.commands.unsetColor()
       */
      unsetColor: () => ReturnType;
    };
  }
}

/**
 * This extension allows you to color your text.
 * @see https://tiptap.dev/api/extensions/color
 */
export const FontColor = Extension.create<ColorOptions>({
  name: 'color',

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
          color: {
            default: null,
            parseHTML: (element) => element.style.color?.replace(/['"]+/g, ''),
            renderHTML: (attributes) => {
              if (!attributes.color) return {};

              return {
                style: `color: ${attributes.color}`,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setColor:
        (color) =>
        ({ chain, editor, tr, dispatch }) => {
          tr = updateNodeStyle({
            tr,
            editor,
            nodeUpdateAttrs: {
              markAttrs: (attrs) => {
                delete attrs.color;
                return attrs;

                // const { color: oldColor, ...other } = attrs;
                // return other;
              },

              nodeAttrs: (attrs) => ({ ...attrs, color }),
            },

            markUpdateAttrs: () => {
              chain().setMark('textStyle', { color }).run();
            },

            ignoreEmpty: false,
          });

          if (tr.docChanged) {
            dispatch?.(tr);
            return true;
          }

          return false;
        },

      unsetColor:
        () =>
        ({ chain }) =>
          chain().setMark('textStyle', { color: null }).removeEmptyTextStyle().run(),
    };
  },
});
