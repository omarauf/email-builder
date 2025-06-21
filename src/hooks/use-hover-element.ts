// import type { RefObject } from "react";
// import { useState, useEffect, useCallback } from "react";
// import type { DragData } from "../util/node-utils";
// import { useBuilderContext } from "../context/builder-context";

// const getHoverNode = (elements: Element[], x: number, y: number) => {
//   const onHavering = [];
//   for (let i = 0; i < elements.length; i += 1) {
//     const ele = elements[i];
//     const box = ele.getBoundingClientRect();
//     if (x > box.x && x < box.x + box.width && y > box.y && y < box.y + box.height) {
//       onHavering.push(ele);
//     }
//   }

//   return onHavering[onHavering.length - 1] as HTMLElement;
// };

// function isElementChildOfAny(element: Element | null, elements: NodeListOf<Element> | undefined) {
//   return Array.from(elements || []).some((ele) => ele.contains(element));
// }

// export function useHoverElement() {
//   const { allNode, frameRef, activeNode } = useBuilderContextx();
//   const [hoverEle, setHoverEle] = useState<HTMLElement>();

//   const handleMouseMove = useCallback(
//     (ev: MouseEvent) => {
//       if (activeNode) return;
//       const element = document.elementFromPoint(ev.clientX, ev.clientY);
//       const floatingButtons = frameRef.current?.querySelectorAll(".floating-button");
//       if (isElementChildOfAny(element, floatingButtons)) return;

//       // if (element?.className.includes("floating-button")) return;
//       // const hoverNode = getHoverNode(frameRef.current, ev.clientX, ev.clientY);
//       // if (hoverNode) {
//       //   setHoverEle(hoverNode.id);
//       // }
//       const hoverNode = getHoverNode(allNode, ev.clientX, ev.clientY);
//       setHoverEle(hoverNode);
//     },
//     [activeNode, allNode, frameRef]
//   );

//   const handleMouseLeave = useCallback(() => {
//     setHoverEle(undefined);
//   }, []);

//   useEffect(() => {
//     const copyFrameRef = frameRef;

//     if (frameRef.current) {
//       frameRef.current.addEventListener("mousemove", handleMouseMove);
//       frameRef.current.addEventListener("mouseleave", handleMouseLeave);
//     }

//     return () => {
//       if (copyFrameRef.current) {
//         copyFrameRef.current.removeEventListener("mousemove", handleMouseMove);
//         copyFrameRef.current.removeEventListener("mouseleave", handleMouseLeave);
//       }
//     };
//   }, [frameRef, handleMouseLeave, handleMouseMove]);

//   return { hoverEle, setHoverEle };
// }
