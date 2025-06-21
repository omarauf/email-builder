// import type { Editor } from "@tiptap/react";
// import { TextSelection } from "prosemirror-state";

// function getActiveMarks(editor: Editor) {
//     const { from, to } = editor.state.selection;
//     const { doc } = editor.state;

//     // doc.descendants((node, pos) => {
//     //   if (node.isText) {
//     //     const { text, marks } = node;

//     //     const isMarkActive = marks.some((mark) => mark.type.name === "link");

//     //     if (isMarkActive) {
//     //       console.log("Link Active", text);
//     //     }
//     //   }
//     // });
//     let textValue = "";

//     doc.nodesBetween(from, to, (node) => {
//       if (node.isText) {
//         const { text } = node;
//         const { marks } = node;

//         // Check if the node has the specific mark
//         const hasMark = marks.some((mark) => mark.type.name === "link");
//         if (hasMark) {
//           textValue = String(text);
//         }
//       }
//     });

//     return textValue;

//     if (editor.isFocused && editor.state.selection instanceof TextSelection) {
//       const { selection } = editor.state;
//       const marks = selection.$head.marks();

//       return marks;
//     }

//     return [];
//   }

// const findNodesOfType = (node: Editor["state"]["doc"], type: string) => {
//   let nodes: Editor["state"]["doc"][] = [];

//   // Check if current node is of the type we're interested in
//   if (node.type.name === type) {
//     nodes.push(node);
//   }

//   // Recursively check child nodes
//   node.forEach((childNode) => {
//     nodes = nodes.concat(findNodesOfType(childNode, type));
//   });

//   return nodes;
// };
