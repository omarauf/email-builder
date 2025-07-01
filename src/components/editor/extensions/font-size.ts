import { Extension } from '@tiptap/react';
import '@tiptap/extension-text-style';
import type { Screen } from '@/types';
import { updateNodeStyle } from '../utils/node';

interface FontSizeOptions {
  types: string[];
  getStyle: (fontSize: string) => string;
}

declare module '@tiptap/react' {
  interface Commands<ReturnType> {
    fontSize: {
      /**
       * Set the font size attribute
       */
      setFontSize: (size: string, lineHeight: number, screen: Screen) => ReturnType;
      /**
       * Set the font size based on the screen
       */
      setFontSizeScreen: (screen: Screen) => ReturnType;
      /**
       * Unset the font size attribute
       */
      unsetFontSize: () => ReturnType;
    };
  }
}

export const FontSize = Extension.create<FontSizeOptions>({
  name: 'fontSize',

  addOptions(): FontSizeOptions {
    return {
      types: ['textStyle', 'paragraph', 'heading'],
      getStyle: (fontSize: string) => `font-size: ${fontSize}`,
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) => element.style.fontSize,
            renderHTML: (attributes) => {
              if (!attributes.fontSize) return {};

              return {
                style: this.options.getStyle(attributes.fontSize),
              };
            },
          },
          fzD: {
            default: null,
            parseHTML: (element) =>
              element.getAttribute('font-size-desktop')?.replace(/['"]+/g, ''),

            renderHTML: (attributes) => {
              if (!attributes.fzD) return {};

              return {
                [`font-size-desktop`]: attributes.fzD,
              };
            },
          },
          fzM: {
            default: null,
            parseHTML: (element) => element.getAttribute('font-size-mobile')?.replace(/['"]+/g, ''),

            renderHTML: (attributes) => {
              if (!attributes.fzM) return {};

              return {
                [`font-size-mobile`]: attributes.fzM,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setFontSize:
        (fontSize, lineHeight, screen) =>
        ({ chain, editor, tr, dispatch }) => {
          tr = updateNodeStyle({
            tr,
            editor,
            nodeUpdateAttrs: {
              // to remove the font size and line height for the mark inside the node
              // because it will be added again the parent node
              markAttrs: (attrs) => {
                delete attrs.fontSize;
                delete attrs.lineHeight;
                const { fzD, fzM, ...other } = attrs; // const { fontSize: oldFs, lineHeight: oldL, fzD, fzM, ...other } = attrs;
                let newAttributes = {};
                if (screen === 'desktop') newAttributes = { fzM };
                else newAttributes = { fzD };
                return { ...other, ...newAttributes };
              },

              // add the attributes to the parent node
              nodeAttrs: (attrs) => {
                const { fzD, fzM, ...other } = attrs;
                let newAttributes = {};
                if (screen === 'desktop') newAttributes = { fontSize, fzD: fontSize, fzM };
                else newAttributes = { fontSize, fzD, fzM: fontSize };

                return { ...other, ...newAttributes };
              },
            },

            markUpdateAttrs: (attrs) => {
              const { fzD, fzM } = attrs;
              let newAttributes = {};
              if (screen === 'desktop') newAttributes = { fontSize, fzD: fontSize, fzM };
              else newAttributes = { fontSize, fzD, fzM: fontSize };

              chain().setLineHeight(lineHeight).setMark('textStyle', newAttributes).run();
            },

            ignoreEmpty: true,
          });

          if (tr.docChanged) {
            dispatch?.(tr);
            return true;
          }

          return false;
        },

      setFontSizeScreen:
        (screen) =>
        ({ tr, dispatch }) => {
          const { doc } = tr;

          // iterate over all nodes (text, paragraph, heading) as linearly
          doc.descendants((node, pos) => {
            // iterate over all text nodes because only text nodes have marks
            node.marks.forEach((mark) => {
              if (mark.type.name !== 'textStyle') return;

              const { fontSize } = mark.attrs;
              let { fzD, fzM } = mark.attrs;
              let newAttributes = {};

              if (fzD === null && screen === 'desktop') fzD = fontSize;
              if (fzM === null && screen === 'mobile') fzM = fontSize;
              if (screen === 'desktop') newAttributes = { fontSize: fzD || fontSize, fzD, fzM };
              else newAttributes = { fontSize: fzM || fontSize, fzD, fzM };

              const newMark = mark.type.create({
                ...mark.attrs,
                ...newAttributes,
              });

              tr = tr.removeMark(pos, pos + node.nodeSize, mark.type);
              tr = tr.addMark(pos, pos + node.nodeSize, newMark);
            });

            if (node.type.name === 'paragraph' || node.type.name === 'heading') {
              const { attrs } = node;
              const { fontSize } = attrs;
              let { fzD, fzM } = attrs;

              if (fzD === null && screen === 'desktop') fzD = fontSize;
              if (fzM === null && screen === 'mobile') fzM = fontSize;

              let newAttributes = {};

              if (screen === 'desktop') newAttributes = { fontSize: fzD, fzD, fzM };
              else newAttributes = { fontSize: fzM, fzD, fzM };

              tr = tr.setNodeMarkup(pos, node.type, {
                ...attrs,
                ...newAttributes,
              });
            }
          });

          if (tr.docChanged) {
            dispatch?.(tr);
            return true;
          }

          return false;
        },

      unsetFontSize:
        () =>
        ({ chain }) =>
          chain().setMark('textStyle', { fontSize: null }).removeEmptyTextStyle().run(),
    };
  },
});
