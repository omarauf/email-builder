import { Plugin } from '@tiptap/pm/state';
import { Extension } from '@tiptap/react';
import { Decoration, DecorationSet } from '@tiptap/pm/view';

export const TextSelectionWrapper = Extension.create({
  name: 'selecation',

  addProseMirrorPlugins() {
    return [
      new Plugin({
        state: {
          init(_) {
            // Initialize the plugin state with an empty decoration set
            return DecorationSet.empty;
          },
          apply(tr) {
            // Update the decoration set based on the transaction
            const { from, to } = tr.selection;
            const decorations =
              from < to ? [Decoration.inline(from, to, { class: 'selected-text' })] : [];
            return DecorationSet.create(tr.doc, decorations);
          },
        },
        props: {
          // @ts-ignore
          decorations(state) {
            // Provide the current decoration set to the editor view
            return this.getState(state);
          },
        },
      }),
    ];
  },
});
