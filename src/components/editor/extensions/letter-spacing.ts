import { Extension } from '@tiptap/react';

interface LetterSpacingOptions {
  types: string[];
  getStyle: (letterSpacing: string) => string;
}

declare module '@tiptap/react' {
  interface Commands<ReturnType> {
    letterSpacing: {
      /**
       * Set the letter spacing attribute
       */
      setLetterSpacing: (letterSpacing: string) => ReturnType;
      /**
       * Unset the letter spacing attribute
       */
      unsetLetterSpacing: () => ReturnType;
    };
  }
}

export const LetterSpacing = Extension.create<LetterSpacingOptions>({
  name: 'letterSpacing',

  addOptions() {
    return {
      types: ['textStyle'],
      getStyle: (letterSpacing: string) => `letter-spacing: ${letterSpacing}`,
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          letterSpacing: {
            default: null,
            parseHTML: (element) => element.style.letterSpacing.replace(/['"]+/g, ''),
            renderHTML: (attributes) => {
              if (!attributes.letterSpacing) {
                return {};
              }

              return {
                style: this.options.getStyle(attributes.letterSpacing),
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setLetterSpacing:
        (letterSpacing) =>
        ({ chain }) =>
          chain().setMark('textStyle', { letterSpacing }).run(),
      unsetLetterSpacing:
        () =>
        ({ chain }) =>
          chain().setMark('textStyle', { letterSpacing: null }).removeEmptyTextStyle().run(),
    };
  },
});
