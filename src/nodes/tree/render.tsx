import { memo, Fragment } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { converter } from '@/utils/converter';
import { useBuilderStore } from '@/hooks/use-builder-store';
import { useTreeStyle } from './style';
import { Stripe } from '../stripe/render';
import { DropZone } from '../container/drop-zone/drop-zone';

function TreeMemo() {
  const [tree, margin, screen] = useBuilderStore(
    useShallow((s) => [s.tree, s.styles.general.margin, s.screen])
  );

  const style = useTreeStyle();

  return (
    <div
      className="flex h-full flex-col px-1"
      id="tree"
      style={{ margin: converter.inset(margin[screen], 'px'), ...style }}>
      {tree.children.map((stripe, index) => (
        <Fragment key={stripe.id}>
          <DropZone accept="stripe" stripeIndex={index} />

          <Stripe stripeIndex={index} {...stripe} />
        </Fragment>
      ))}

      <DropZone accept="stripe" stripeIndex={tree.children.length} />

      <div className="h-28" />
    </div>
  );
}

export const Tree = memo(TreeMemo);
