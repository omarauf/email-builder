import type { RefObject } from 'react';
import type { Coordinates } from '@dnd-kit/utilities';
import type { Collision, ClientRect, CollisionDetection } from '@dnd-kit/core';

/**
 * Sort collisions in descending order (from greatest to smallest value)
 */
export function sortCollisionsDesc({ data: { value: a } }: any, { data: { value: b } }: any) {
  return a - b;
}

// function drawLines(ele: ClientRect, id: string) {
//   if (document.getElementById(id)) {
//     document.getElementById(id)?.remove();
//   }
//   const lines = document.createElement("div");
//   lines.id = id;
//   lines.style.position = "absolute";
//   lines.style.width = `${ele.width}px`;
//   lines.style.height = `${ele.height}px`;
//   lines.style.border = "1px solid red";
//   lines.style.left = `${ele.left}px`;
//   lines.style.top = `${ele.top}px`;
//   document.body.appendChild(lines);
// }

// function getCenterToNearestCornerDistnace(entry: ClientRect, target: ClientRect) {
//   const entryCenter = {
//     x: entry.left + entry.width / 2,
//     y: entry.top + entry.height / 2,
//   };
//   const targetCorners = [
//     { x: target.left, y: target.top },
//     { x: target.right, y: target.top },
//     { x: target.right, y: target.bottom },
//     { x: target.left, y: target.bottom },
//   ];

//   let minDistance = Infinity;

//   for (let i = 0; i < targetCorners.length; i += 1) {
//     const distance = Math.sqrt(
//       (entryCenter.x - targetCorners[i].x) ** 2 + (entryCenter.y - targetCorners[i].y) ** 2
//     );

//     if (distance < minDistance) {
//       minDistance = distance;
//     }
//   }
//   return minDistance;
// }

const offset = 10;

function getOverlapPointer(entry: ClientRect, target: ClientRect) {
  const xOverlap = Math.max(
    0,
    Math.min(entry.left + offset, target.right) - Math.max(entry.left, target.left)
  );
  const yOverlap = Math.max(
    0,
    Math.min(entry.top + offset, target.bottom + 1) - Math.max(entry.top, target.top - 1)
  );

  // drawLines({ top: entry.top, left: entry.left, width: 10, height: 10 }, "collisionRect");
  return xOverlap * yOverlap;
}

/**
 * Returns the circle that has the greatest intersection area
 */
export const myClosestCorners: CollisionDetection = ({
  collisionRect,
  droppableRects,
  droppableContainers,
}) => {
  const collisions: Collision[] = [];

  droppableContainers.forEach((droppableContainer) => {
    const { id } = droppableContainer;
    const rect = droppableRects.get(id);

    if (rect) {
      const overlap = getOverlapPointer(collisionRect, rect);
      if (overlap > 0) {
        collisions.push({
          id,
          data: { droppableContainer, value: overlap },
        });
      } else {
        // const intersectionRatio = getCenterToNearestCornerDistnace(collisionRect, rect);
        // if (intersectionRatio > 0) {
        //   collisions.push({
        //     id,
        //     data: { droppableContainer, value: intersectionRatio },
        //   });
        // }
      }
    }
  });

  const sorted = collisions.sort(sortCollisionsDesc);

  return sorted;
};

// ----------------------------------------------------------------------------

export function isMouseInFrame(
  frame: RefObject<HTMLDivElement | null>,
  pointerCor: Coordinates | null
) {
  if (!frame.current) return false;

  if (!pointerCor) return false;

  const { left, right, top, bottom } = frame.current.getBoundingClientRect();

  if (pointerCor.x < left || pointerCor.x > right) {
    return false;
  }

  if (pointerCor.y < top || pointerCor.y > bottom) {
    return false;
  }

  return true;
}
