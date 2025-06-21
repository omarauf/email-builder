import type { Editor } from '@tiptap/core';
import { type Transaction } from 'prosemirror-state';

interface Props {
  tr: Transaction;
  editor: Editor;
  //   chain: () => ChainedCommands;
  nodeUpdateAttrs: {
    markAttrs: (attrs: Record<string, any>) => Record<string, any>;
    nodeAttrs: (attrs: Record<string, any>) => Record<string, any>;
  };
  markUpdateAttrs: (attrs: Record<string, any>) => void;
  ignoreEmpty?: boolean;
}

export function updateNodeStyle({
  tr,
  editor,
  nodeUpdateAttrs,
  ignoreEmpty,
  markUpdateAttrs,
}: Props) {
  const { selection, doc } = tr;
  const { markAttrs, nodeAttrs } = nodeUpdateAttrs;

  const randomId = Math.random().toString(36);
  const { from, to, empty } = selection;
  tr = tr.setSelection(selection);

  const selectedText = doc.textBetween(from, to, randomId);
  const selectedTexts = selectedText.split(randomId); // it must have same length as doc.nodesBetween(from, to)

  // if the selection is empty and ignoreEmpty is false
  if (empty && !ignoreEmpty) {
    // iterate over all nodes (text, paragraph, heading) as linearly
    doc.descendants((node, pos) => {
      //

      // iterate over all text nodes because only text nodes have marks
      node.marks.forEach((mark) => {
        if (mark.type.name !== 'textStyle') return;

        const newAttributes = markAttrs(mark.attrs);
        const updatedMark = mark.type.create(newAttributes);

        tr = tr.removeMark(pos, pos + node.nodeSize, mark.type);
        tr = tr.addMark(pos, pos + node.nodeSize, updatedMark);
      });

      if (node.type.name === 'text') return;

      const newAttributes = nodeAttrs(node.attrs);
      // commands.updateAttributes(node.type.name, newAttributes);
      tr = tr.setNodeMarkup(pos, node.type, newAttributes, node.marks);
    });

    return tr;
  }

  let index = 0;
  doc.nodesBetween(from, to, (node, pos) => {
    // if (!this.options.types.includes(node.type.name)) return;
    if (node.type.name === 'orderedList') return;
    if (node.type.name === 'listItem') return;
    if (node.type.name === 'bulletList') return;
    if (node.type.name === 'text') return;

    const text = selectedTexts[index];

    if (text === node.textContent) {
      // here we iterate over all mark inside the node and remove the font size mark
      // because it will be added again the parent node
      // and we have to remove the font size for desktop or mobile based on the screen
      // console.log("fully selected", node.type.name);

      node.content.descendants((textNode, textPosition) => {
        textNode.marks.forEach((mark) => {
          if (mark.type.name !== 'textStyle') return;
          const newAttributes = markAttrs(mark.attrs);
          const updatedMark = mark.type.create(newAttributes);

          // METHOD 1
          const trimmedFrom = Math.max(pos, from);
          const start = trimmedFrom + textPosition;
          const end = start + textNode.nodeSize;
          // tr = tr.removeMark(start, end, mark);
          tr = tr.addMark(start, end, updatedMark);

          // METHOD 2
          // Replace the mark with the updated one
          // @ts-ignore
          // textNode.marks = textNode.marks.map((m) =>
          //   m.type.name === "textStyle" ? updatedMark : m
          // );
        });
      });

      const newAttributes = nodeAttrs(node.attrs);
      // commands.updateAttributes(node.type.name, newAttributes);
      tr = tr.setNodeMarkup(pos, node.type, newAttributes, node.marks);
    } else {
      // console.log("node partial selected", node.type.name);

      const attrs = editor.getAttributes('textStyle');

      markUpdateAttrs(attrs);
    }

    index += 1;
  });

  return tr;
}
