import type { Command } from '@tiptap/react';
import type { Transaction } from 'prosemirror-state';
import { Extension } from '@tiptap/react';
import { AllSelection, TextSelection } from 'prosemirror-state';

interface IndentOptions {
  types: string[];
  minLevel: number;
  maxLevel: number;
}

declare module '@tiptap/react' {
  interface Commands<ReturnType> {
    indent: {
      indent: () => ReturnType;
      outdent: () => ReturnType;
    };
  }
}

export const Indent = Extension.create<IndentOptions>({
  name: 'indent',

  addOptions() {
    return {
      types: ['bulletList', 'orderedList', 'paragraph', 'heading'],
      minLevel: 0,
      maxLevel: 4,
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          indent: {
            renderHTML: (attributes) =>
              attributes.indent > this.options.minLevel
                ? { style: `margin-left: ${attributes.indent * 20}px` }
                : null,

            parseHTML: (element) => {
              const indentLevel = Number(element.style.marginLeft.replace('px', '')) / 20;
              return indentLevel && indentLevel > this.options.minLevel ? indentLevel : null;
            },
          },
        },
      },
    ];
  },

  addCommands() {
    const setNodeIndentMarkup = (tr: Transaction, pos: number, delta: number): Transaction => {
      const node = tr?.doc?.nodeAt(pos);

      if (node) {
        const nextLevel = (node.attrs.indent || 0) + delta;
        const { minLevel, maxLevel } = this.options;
        const indent =
          nextLevel < minLevel ? minLevel : nextLevel > maxLevel ? maxLevel : nextLevel;

        if (indent !== node.attrs.indent) {
          const { indent: oldIndent, ...currentAttrs } = node.attrs;
          const nodeAttrs = indent > minLevel ? { ...currentAttrs, indent } : currentAttrs;
          return tr.setNodeMarkup(pos, node.type, nodeAttrs, node.marks);
        }
      }
      return tr;
    };

    const updateIndentLevel = (tr: Transaction, delta: number): Transaction => {
      const { doc, selection } = tr;

      if (
        doc &&
        selection &&
        (selection instanceof TextSelection || selection instanceof AllSelection)
      ) {
        const { from, to } = selection;
        doc.nodesBetween(from, to, (node, pos) => {
          if (this.options.types.includes(node.type.name)) {
            tr = setNodeIndentMarkup(tr, pos, delta);
            return false;
          }

          return true;
        });
      }

      return tr;
    };

    const applyIndent: (direction: number) => () => Command =
      (direction) =>
      () =>
      ({ tr, state, dispatch }) => {
        const { selection } = state;
        tr = tr.setSelection(selection);
        tr = updateIndentLevel(tr, direction);

        if (tr.docChanged) {
          dispatch?.(tr);
          return true;
        }

        return false;
      };

    return {
      indent: applyIndent(1),
      outdent: applyIndent(-1),
    };
  },

  // addKeyboardShortcuts() {
  //   return {
  //     Tab: () => this.editor.commands.indent(),
  //     "Shift-Tab": () => this.editor.commands.outdent(),
  //   };
  // },
});
