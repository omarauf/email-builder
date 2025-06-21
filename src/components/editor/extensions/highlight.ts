import '@tiptap/extension-text-style';

import { Extension } from '@tiptap/react';

export interface HighlightOptions {
  /**
   * The types where the highlight can be applied
   * @default ['textStyle']
   * @example ['heading', 'paragraph']
   */
  types: string[];
}

declare module '@tiptap/react' {
  interface Commands<ReturnType> {
    highlight: {
      /**
       * Set the highlight color
       * @param color The color to set
       * @example editor.commands.setColor('red')
       */
      setHighlight: (color: string) => ReturnType;

      /**
       * Unset the highlight color
       * @example editor.commands.unsetColor()
       */
      unsetHighlight: () => ReturnType;
    };
  }
}

/**
 * This extension allows you to color your text.
 * @see https://tiptap.dev/api/extensions/color
 */
export const Highlight = Extension.create<HighlightOptions>({
  name: 'highlight',

  addOptions() {
    return {
      types: ['textStyle'],
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          backgroundColor: {
            default: null,
            parseHTML: (element) => element.style.backgroundColor?.replace(/['"]+/g, ''),
            renderHTML: (attributes) => {
              if (!attributes.backgroundColor) {
                return {};
              }

              return {
                style: `background-color: ${attributes.backgroundColor}`,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setHighlight:
        (color) =>
        ({ chain, state }) => {
          const { from, to } = state.selection;
          const selectedLength = from - to;

          if (selectedLength === 0)
            return chain()
              .selectAll()
              .setMark('textStyle', { backgroundColor: color })
              .setTextSelection(from)
              .run();

          return chain().setMark('textStyle', { backgroundColor: color }).run();
        },
      unsetHighlight:
        () =>
        ({ chain }) =>
          chain().setMark('textStyle', { backgroundColor: null }).removeEmptyTextStyle().run(),
    };
  },
});

// import {
//     Mark,
//     markInputRule,
//     markPasteRule,
//     mergeAttributes,
//   } from '@tiptap/react'

//   export interface HighlightOptions {
//     /**
//      * Allow multiple highlight colors
//      * @default false
//      * @example true
//      */
//     multicolor: boolean,

//     /**
//      * HTML attributes to add to the highlight element.
//      * @default {}
//      * @example { class: 'foo' }
//      */
//     HTMLAttributes: Record<string, any>,
//   }

//   declare module '@tiptap/react' {
//     interface Commands<ReturnType> {
//       highlight: {
//         /**
//          * Set a highlight mark
//          * @param attributes The highlight attributes
//          * @example editor.commands.setHighlight({ color: 'red' })
//          */
//         setHighlight: (attributes?: { color: string }) => ReturnType,
//         /**
//          * Toggle a highlight mark
//          * @param attributes The highlight attributes
//          * @example editor.commands.toggleHighlight({ color: 'red' })
//          */
//         toggleHighlight: (attributes?: { color: string }) => ReturnType,
//         /**
//          * Unset a highlight mark
//          * @example editor.commands.unsetHighlight()
//          */
//         unsetHighlight: () => ReturnType,
//       }
//     }
//   }

//   /**
//    * Matches a highlight to a ==highlight== on input.
//    */
//   export const inputRegex = /(?:^|\s)(==(?!\s+==)((?:[^=]+))==(?!\s+==))$/

//   /**
//    * Matches a highlight to a ==highlight== on paste.
//    */
//   export const pasteRegex = /(?:^|\s)(==(?!\s+==)((?:[^=]+))==(?!\s+==))/g

//   /**
//    * This extension allows you to highlight text.
//    * @see https://www.tiptap.dev/api/marks/highlight
//    */
//   export const Highlight = Mark.create<HighlightOptions>({
//     name: 'highlight',

//     addOptions() {
//       return {
//         multicolor: false,
//         HTMLAttributes: {},
//       }
//     },

//     addAttributes() {
//       if (!this.options.multicolor) {
//         return {}
//       }

//       return {
//         color: {
//           default: null,
//           parseHTML: element => element.getAttribute('data-color') || element.style.backgroundColor,
//           renderHTML: attributes => {
//             if (!attributes.color) {
//               return {}
//             }

//             return {
//               'data-color': attributes.color,
//               style: `background-color: ${attributes.color}; color: inherit`,
//             }
//           },
//         },
//       }
//     },

//     parseHTML() {
//       return [
//         {
//           tag: 'mark',
//         },
//       ]
//     },

//     renderHTML({ HTMLAttributes }) {
//       return ['mark', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
//     },

//     addCommands() {
//       return {
//         setHighlight: attributes => ({ commands }) => commands.setMark(this.name, attributes),
//         toggleHighlight: attributes => ({ commands }) => commands.toggleMark(this.name, attributes),
//         unsetHighlight: () => ({ commands }) => commands.unsetMark(this.name),
//       }
//     },

//     addKeyboardShortcuts() {
//       return {
//         'Mod-Shift-h': () => this.editor.commands.toggleHighlight(),
//       }
//     },

//     addInputRules() {
//       return [
//         markInputRule({
//           find: inputRegex,
//           type: this.type,
//         }),
//       ]
//     },

//     addPasteRules() {
//       return [
//         markPasteRule({
//           find: pasteRegex,
//           type: this.type,
//         }),
//       ]
//     },
//   })
