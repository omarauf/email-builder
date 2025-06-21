import { useShallow } from 'zustand/react/shallow';
import { useRef, useEffect, useCallback } from 'react';
import { useBuilderStore } from './use-builder-store';

export function useDragHandler() {
  const allNode = useRef<Element[]>([]);
  const previousHover = useRef<HTMLElement | null>(null);

  // console.log("useDragHandler");

  const [frameRef, active, setHoverEle] = useBuilderStore(
    useShallow((s) => [s.frameRef, s.active, s.setHoverEle])
  );

  const getAllNode = useCallback(() => {
    if (!frameRef?.current) return;
    const stripes = Array.from(frameRef.current.getElementsByClassName('stripe'));
    const structures = Array.from(frameRef.current.getElementsByClassName('structure'));
    const containers = Array.from(frameRef.current.getElementsByClassName('container'));
    const blocks = Array.from(frameRef.current.getElementsByClassName('block'));

    allNode.current = [...stripes, ...structures, ...containers, ...blocks];
  }, [frameRef]);

  useEffect(() => {
    getAllNode();
    const un = useBuilderStore.subscribe(
      (s) => s.tree,
      // here we add a delay to wait for the new elements to be added to the DOM
      // we can avoid this by using a adding the tree to the state and listen to it
      // but this will cause a lot of rerenders. since the useDragHandler will render
      // on each update of the tree this will cause the app to rerender on each update
      // which will cause all nodes to be re-rendered. so we will use this approach
      () => setTimeout(getAllNode, 50)
    );
    return () => un();
  }, [getAllNode]);

  const handleMouseMove = useCallback(
    (ev: MouseEvent) => {
      if (active) return;
      const element = document.elementFromPoint(ev.clientX, ev.clientY);
      const floatingButtons = frameRef?.current?.querySelectorAll('.floating-button');
      const containerFloatingButtons = frameRef?.current?.querySelectorAll(
        '.container-master-button'
      );

      if (
        isElementChildOfAny(element, containerFloatingButtons) &&
        previousHover.current?.className.includes('block')
      ) {
        // we are use two parentElement because the first wrapper around the block
        // and second one is the container
        const container = previousHover.current.parentElement?.parentElement;
        if (container) setHoverEle(container, true);
        return;
      }
      if (isElementChildOfAny(element, floatingButtons)) return;

      // if (element?.className.includes("floating-button")) return;
      // const hoverNode = getHoverNode(frameRef.current, ev.clientX, ev.clientY);
      // if (hoverNode) {
      //   setHoverEle(hoverNode.id);
      // }
      const tree = frameRef?.current?.querySelector('#tree');
      const isInsideTree = tree?.contains(element) || false;

      const hoverNode = getHoverNode(allNode.current, ev.clientX, ev.clientY);
      setHoverEle(hoverNode, isInsideTree);
      previousHover.current = hoverNode;
    },
    [active, frameRef, setHoverEle]
  );

  //   const handleMouseOver = useCallback(
  //     (ev: MouseEvent) => {
  //       const hoverNode = getHoverNode(allNode.current, ev.clientX, ev.clientY);
  //       if (hoverNode) setHoverEle(hoverNode);
  //     },
  //     [setHoverEle]
  //   );

  const handleMouseLeave = useCallback(() => {
    setHoverEle(undefined, false);
  }, [setHoverEle]);

  const handleMouseEnter = useCallback(() => {
    // const target = ev.target as HTMLElement;
    // const newElement = document.createElement("div");
    // newElement.id = "lkdmsdflkmvlkdfbdflkbmdflk";
    // target.insertBefore(newElement, target.previousSibling);
  }, []);

  useEffect(() => {
    const copyFrameRef = frameRef;

    if (frameRef?.current) {
      frameRef.current.addEventListener('mousemove', handleMouseMove);
      // frameRef.current.addEventListener("mouseover", handleMouseOver);
      // frameRef.current.addEventListener("mouseenter", handleMouseEnter);
      frameRef.current.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (copyFrameRef?.current) {
        copyFrameRef.current.removeEventListener('mousemove', handleMouseMove);
        // copyFrameRef.current.removeEventListener("mouseover", handleMouseOver);
        copyFrameRef.current.removeEventListener('mouseenter', handleMouseEnter);
        // copyFrameRef.current.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [frameRef, handleMouseEnter, handleMouseLeave, handleMouseMove]);
}

const getHoverNode = (elements: Element[], x: number, y: number) => {
  const onHavering = [];
  for (let i = 0; i < elements.length; i += 1) {
    const ele = elements[i];
    const box = ele.getBoundingClientRect();
    if (x > box.x && x < box.x + box.width && y > box.y && y < box.y + box.height) {
      onHavering.push(ele);
    }
  }

  return onHavering[onHavering.length - 1] as HTMLElement;

  // const element = document.elementFromPoint(x, y);
  // return element;
};

function isElementChildOfAny(element: Element | null, elements: NodeListOf<Element> | undefined) {
  return Array.from(elements || []).some((ele) => ele.contains(element));
}
