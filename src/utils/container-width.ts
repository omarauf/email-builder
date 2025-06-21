import type { StructureTree } from '../nodes/structure/type';

interface AdjustContainerWidthParameters {
  structure: StructureTree;
  availableWidth: number;
  updatedContainerWidth?: number;
  updatedContainerIndex?: number;
}

export function adjustContainerWidth(params: AdjustContainerWidthParameters): number[] {
  const { structure, updatedContainerWidth, updatedContainerIndex, availableWidth } = params;
  const containers = structure.children;
  const containerCount = containers.length;
  const containerWidths = containers.map((c) => c.style.width);

  const containerMinWidth = 30;
  const containerMaxWidth = availableWidth - containerMinWidth * (containerCount - 1);

  if (updatedContainerWidth !== undefined && updatedContainerIndex !== undefined) {
    const newContainerWidth = Math.min(
      containerMaxWidth,
      Math.max(containerMinWidth, updatedContainerWidth)
    );

    let diff = newContainerWidth - containerWidths[updatedContainerIndex];

    if (diff === 0) return containerWidths;

    const orderIndexes = getOrderedArrayFromIndex(containerCount, updatedContainerIndex + 1);

    orderIndexes.forEach((i) => {
      if (diff === 0) return;

      const value = containerWidths[i];

      // we need to increase the value, so we have to take form other values
      if (diff > 0) {
        // Increase the current value and decrease the next values
        const takeable = value - containerMinWidth;
        const adjustment = Math.min(takeable, diff);

        containerWidths[i] -= adjustment;
        containerWidths[updatedContainerIndex] += adjustment;
        diff -= adjustment;
      }

      // we need to decrease the value, so we have to give to other values
      else {
        // Decrease the current value and increase the next values
        const giveable = containerMaxWidth - value;
        const adjustment = Math.min(giveable, -diff);

        containerWidths[i] += adjustment;
        containerWidths[updatedContainerIndex] -= adjustment;
        diff += adjustment;
      }
    });
  } else {
    const diff = availableWidth - containerWidths.reduce((acc, c) => acc + c, 0);
    const absDiff = Math.abs(diff);

    const flexibleContainerIndex: number[] = [];
    containers.forEach((c, i) => {
      if (c.data.widthLocked) return;

      if (diff > 0) {
        if (c.style.width < containerMaxWidth) {
          flexibleContainerIndex.push(i);
        }
      }

      if (diff < 0) {
        if (c.style.width > containerMinWidth) {
          flexibleContainerIndex.push(i);
        }
      }
    });
    const flexibleContainerCount = flexibleContainerIndex.length;

    const baseValue = Math.floor(absDiff / flexibleContainerCount);
    let remainder = absDiff % flexibleContainerCount;

    // update the width of the flexible containers
    containerWidths.forEach((c, i) => {
      if (flexibleContainerIndex.includes(i) === false) return;

      // we need to increase container width
      if (diff > 0) {
        if (containers[i].data.widthLocked) return;

        const newWidth = c + baseValue + (remainder > 0 ? 1 : 0);
        remainder -= 1;
        containerWidths[i] = Math.min(containerMaxWidth, newWidth);
      }

      // we need to decrease container width
      else {
        if (containers[i].data.widthLocked) return;

        const newWidth = c - baseValue - (remainder > 0 ? 1 : 0);
        remainder -= 1;
        containerWidths[i] = Math.max(containerMinWidth, newWidth);
      }
    });
  }

  return containerWidths;
}

function getOrderedArrayFromIndex(length: number, index: number) {
  // Handle invalid index
  if (index < 0 || index > length) {
    throw new Error('Index out of bounds');
  }

  // Create an array of indices from 0 to length - 1

  const indices = Array.from({ length }, (_, i) => i);

  if (index === length) {
    indices.reverse().shift();
    indices.push(index - 1);
    return indices;
  }

  // Create the ordered array starting from the given index
  const orderedIndices = [...indices.slice(index), ...indices.slice(0, index)];

  return orderedIndices;
}
