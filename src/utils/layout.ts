import type { Layout } from '../nodes/structure/type';

export function parseLayouts(layout: Layout) {
  if (layout.includes(':')) {
    return layout.split(':').map((i) => parseInt(i, 10));
  }
  return new Array(parseInt(layout, 10)).fill(1);
}

export function getLayoutTotal(layout: Layout) {
  return parseLayouts(layout).reduce((acc, cur) => acc + cur, 0);
}
