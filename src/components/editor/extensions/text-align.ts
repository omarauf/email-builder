import { Extension } from '@tiptap/react';

export interface TextAlignOptions {
  /**
   * The types where the text align attribute can be applied.
   * @default []
   * @example ['heading', 'paragraph']
   */
  types: string[];

  /**
   * The alignments which are allowed.
   * @default ['left', 'center', 'right', 'justify']
   * @example ['left', 'right']
   */
  alignments: string[];

  /**
   * The default alignment.
   * @default 'left'
   * @example 'center'
   */
  defaultAlignment: string | null;
}

declare module '@tiptap/react' {
  interface Commands<ReturnType> {
    textAlign: {
      /**
       * Set the text align attribute
       * @param alignment The alignment
       * @example editor.commands.setTextAlign('left')
       */
      setTextAlign: (alignment: string, screen?: 'desktop' | 'mobile') => ReturnType;
      /**
       * Set the font size based on the screen
       */
      setTextAlignScreen: (screen: 'desktop' | 'mobile') => ReturnType;

      changeDefaultAlignment: (alignment: string) => ReturnType;
      /**
       * Unset the text align attribute
       * @example editor.commands.unsetTextAlign()
       */
      unsetTextAlign: () => ReturnType;
    };
  }
}

/**
 * This extension allows you to align text.
 * @see https://www.tiptap.dev/api/extensions/text-align
 */
export const TextAlign = Extension.create<TextAlignOptions>({
  name: 'textAlign',

  addOptions() {
    return {
      types: [],
      alignments: ['left', 'center', 'right', 'justify'],
      defaultAlignment: null,
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          textAlign: {
            default: null,
            parseHTML: (element) => {
              const alignment = element.style.textAlign;

              return this.options.alignments.includes(alignment)
                ? alignment
                : this.options.defaultAlignment;
            },

            renderHTML: (attributes) => {
              if (!attributes.textAlign) return {};

              return { style: `text-align: ${attributes.textAlign}` };
            },
          },

          textAlignDesktop: {
            default: null,
            parseHTML: (element) =>
              element.getAttribute('text-align-desktop')?.replace(/['"]+/g, ''),

            renderHTML: (attributes) => {
              if (!attributes.textAlignDesktop) return {};

              return {
                [`text-align-desktop`]: attributes.textAlignDesktop,
              };
            },
          },

          textAlignMobile: {
            default: null,
            parseHTML: (element) =>
              element.getAttribute('text-align-mobile')?.replace(/['"]+/g, ''),

            renderHTML: (attributes) => {
              if (!attributes.textAlignMobile) return {};

              return {
                [`text-align-mobile`]: attributes.textAlignMobile,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setTextAlign:
        (alignment, screen) =>
        ({ editor, commands }) => {
          if (!this.options.alignments.includes(alignment)) {
            return false;
          }

          return this.options.types
            .map((type) => {
              const { textAlignDesktop, textAlignMobile } = editor.getAttributes(type);

              if (screen === 'desktop') {
                return commands.updateAttributes(type, {
                  textAlign: alignment,
                  textAlignDesktop: alignment,
                  textAlignMobile,
                });
              }

              if (screen === 'mobile') {
                return commands.updateAttributes(type, {
                  textAlign: alignment,
                  textAlignDesktop,
                  textAlignMobile: alignment,
                });
              }

              return commands.updateAttributes(type, { textAlign: alignment });
            })
            .every((response) => response);
        },

      setTextAlignScreen:
        (screen) =>
        ({ editor, commands }) =>
          this.options.types
            .map((type) => {
              const { textAlign, textAlignDesktop, textAlignMobile } = editor.getAttributes(type);

              if (screen === 'desktop') {
                return commands.updateAttributes(type, {
                  textAlign: textAlignDesktop || textAlign, // fallback to the default alignment
                  textAlignDesktop,
                  textAlignMobile,
                });
              }

              return commands.updateAttributes(type, {
                textAlign: textAlignMobile || textAlign, // fallback to the default alignment
                textAlignDesktop,
                textAlignMobile,
              });
            })
            .every((response) => response),

      changeDefaultAlignment:
        (alignment) =>
        ({ tr, dispatch }) => {
          const { doc } = tr;

          doc.descendants((node, pos) => {
            if (!this.options.types.includes(node.type.name)) return;
            const { textAlign: currentTextAlign, ...other } = node.attrs;

            if (currentTextAlign === this.options.defaultAlignment) {
              tr.setNodeMarkup(pos, node.type, { textAlign: alignment, ...other }, node.marks);
            }
          });

          this.options.defaultAlignment = alignment;

          if (tr.docChanged) {
            dispatch?.(tr);
            return true;
          }

          return false;
        },

      unsetTextAlign:
        () =>
        ({ commands }) =>
          this.options.types
            .map((type) => commands.resetAttributes(type, 'textAlign'))
            .every((response) => response),
    };
  },
});
