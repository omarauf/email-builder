import { Extension } from '@tiptap/react';

type TextDirection = 'auto' | 'rtl' | 'ltr';

interface TextDirectionOptions {
  types: string[];
  directions: TextDirection[];
  defaultDirection: TextDirection;
}

declare module '@tiptap/react' {
  interface Commands<ReturnType> {
    dir: {
      /**
       * Set the letter spacing attribute
       */
      setTextDirection: (direction: TextDirection) => ReturnType;
      /**
       * Unset the letter spacing attribute
       */
      unsetTextDirection: () => ReturnType;
    };
  }
}

const TextDirection = Extension.create<TextDirectionOptions>({
  name: 'textDirection',
  addOptions() {
    return {
      types: ['heading', 'paragraph', 'bulletList', 'orderedList'],
      directions: ['ltr', 'rtl', 'auto'],
      defaultDirection: 'auto',
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          dir: {
            default: this.options.defaultDirection,
            // parseHTML: (element) =>
            // if (
            //   element.attributes.dir &&
            //   this.options.directions.includes(element.attributes.dir)
            // ) {
            //   return element.attributes.dir.value;
            // }
            // this.options.defaultDirection,
            parseHTML: (element) => {
              const dir = element.attributes.getNamedItem('dir') as any;

              if (dir && this.options.directions.includes(dir)) {
                return dir.value;
              }
              return this.options.defaultDirection;
            },
            renderHTML: (attributes) => ({ dir: attributes.dir }),
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setTextDirection:
        (direction) =>
        ({ commands }) => {
          if (!this.options.directions.includes(direction)) {
            return false;
          }
          return this.options.types.every((type) =>
            commands.updateAttributes(type, { dir: direction })
          );
        },
      unsetTextDirection:
        () =>
        ({ commands }) =>
          this.options.types.every((type) => commands.resetAttributes(type, 'dir')),
    };
  },
});

export default TextDirection;
export { TextDirection };
