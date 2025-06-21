import { Extension } from '@tiptap/react';
import { updateNodeStyle } from '../utils/node';

interface LineHeightOptions {
  types: string[];
  heights: number[];
  defaultHeight: number;
}

declare module '@tiptap/react' {
  interface Commands<ReturnType> {
    lineHeight: {
      /**
       * Set the line height attribute
       */
      setLineHeight: (height: number) => ReturnType;
      /**
       * Unset the line height attribute
       */
      unsetLineHeight: () => ReturnType;
    };
  }
}

export const LineHeight = Extension.create<LineHeightOptions>({
  name: 'lineHeight',

  addOptions() {
    return {
      types: ['textStyle', 'paragraph', 'heading'],
      heights: [1, 1.2, 1.5, 2],
      defaultHeight: 1.5,
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          lineHeight: {
            default: null,
            parseHTML: (element) => {
              if (element.style.lineHeight) return parseInt(element.style.lineHeight, 10) / 100;
              return null;
            },
            renderHTML: (attributes) => {
              // if (attributes.lineHeight === this.options.defaultHeight) {
              //   return {};
              // }

              if (attributes.lineHeight === null) return {};

              const h = `${attributes.lineHeight * 100}%`;

              return { style: `line-height: ${h}` };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setLineHeight:
        (height: number) =>
        ({ tr, editor, dispatch, chain }) => {
          updateNodeStyle({
            tr,
            editor,
            nodeUpdateAttrs: {
              markAttrs: (attrs) => {
                delete attrs.lineHeight;
                return attrs;
                // const { lineHeight, ...other } = attrs;
                // return other;
              },

              nodeAttrs: (attrs) => ({ ...attrs, lineHeight: height }),
            },

            markUpdateAttrs: () => {
              chain().setMark('textStyle', { lineHeight: height }).run();
            },

            ignoreEmpty: false,
          });

          if (tr.docChanged) {
            dispatch?.(tr);
            return true;
          }

          return false;
        },
      unsetLineHeight:
        () =>
        ({ commands }) =>
          this.options.types.every((type) => commands.resetAttributes(type, 'lineHeight')),
    };
  },
});
