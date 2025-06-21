import { Box, Stack, IconButton } from '@mui/material';
import { Iconify } from '@/components/iconify';
import { useShallow } from 'zustand/react/shallow';
import type { Node } from '@/types';
import { LayoutContainer } from '@/nodes/container/layout';
import { useBuilderStore } from '@/hooks/use-builder-store';
import { usePopover, CustomPopover } from '@/components/custom-popover';

interface Props {
  node: Node;
}

export function AddButton({ node }: Props) {
  const [addStripe, addStructure] = useBuilderStore(
    useShallow((s) => [s.addStripe, s.addStructure])
  );

  const clickPopover = usePopover();

  const { idx, type } = node;

  return (
    <>
      <Box
        className="floating-button"
        sx={{
          position: 'absolute',
          clipPath: 'polygon(0 0, 10px 100%, 100% 0)',
          transform: 'translateY(100%)',
          width: 'calc(50% - 19px)',
          bottom: 0,
          left: 0,
          height: '46px',
          zIndex: 100,
        }}
      />
      <Box
        className="floating-button"
        sx={{
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          zIndex: 100,
          pt: 1,
          // bgcolor: "action.hover",
          bottom: 0,
          left: 0,
          transform: 'translateY(100%)',
        }}>
        <Stack
          direction="row"
          bgcolor="var(--palette-grey-800)"
          borderRadius="15px"
          sx={{
            width: '38px',
            height: '38px',
            cursor: 'pointer',
          }}>
          <IconButton onClick={clickPopover.onOpen}>
            <Iconify color="white" icon="ic:baseline-plus" width={22} />
          </IconButton>

          <CustomPopover
            open={clickPopover.open}
            onClose={clickPopover.onClose}
            anchorEl={clickPopover.anchorEl}
            slotProps={{ arrow: { placement: 'top-left' } }}>
            <Box
              sx={{ p: 1.5, width: 500 }}
              display="grid"
              gridTemplateColumns="1fr 1fr 1fr"
              gap={1.5}>
              {(['1', '2', '3', '4', '1:2', '2:1'] as const).map((layout) => (
                <LayoutContainer
                  key={layout}
                  layout={layout}
                  onClick={() => {
                    if (type === 'stripe') addStripe({ stripeIndex: idx.stripeIndex + 1 }, layout);
                    else addStructure({ ...idx, structureIndex: idx.structureIndex + 1 }, layout);
                    clickPopover.onClose();
                  }}
                />
              ))}
            </Box>
          </CustomPopover>
        </Stack>
      </Box>
    </>
  );
}
