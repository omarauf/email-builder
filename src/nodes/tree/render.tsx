import { Box, Stack } from '@mui/material';
import { memo, Fragment } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useBuilderStore } from '@/hooks/use-builder-store';
import { converter } from '@/utils/converter';
import { DropZone } from '../container/drop-zone/drop-zone';
import { Stripe } from '../stripe/render';

function TreeMemo() {
  const [tree, margin, screen] = useBuilderStore(
    useShallow((s) => [s.tree, s.styles.general.margin, s.screen])
  );

  return (
    <Stack
      id="tree"
      spacing={0}
      px={0.5}
      sx={{
        margin: converter.inset(margin[screen], 'px'),
        // pl: 12,
        // pr: 54,
        height: '100%',
      }}>
      {tree.children.map((stripe, index) => (
        <Fragment key={stripe.id}>
          <DropZone accept="stripe" stripeIndex={index} />

          <Stripe stripeIndex={index} {...stripe} />
        </Fragment>
      ))}

      <DropZone accept="stripe" stripeIndex={tree.children.length} />

      <Box sx={{ height: 100 }} />
    </Stack>
  );
}

export const Tree = memo(TreeMemo);
