import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { Box, Stack, Tooltip, IconButton } from '@mui/material';
import { Iconify } from '@/components/iconify';
import { useShallow } from 'zustand/react/shallow';
import type { Node } from '@/types';
import { useBuilderStore } from '@/hooks/use-builder-store';

interface Props {
  listeners?: SyntheticListenerMap;
  className?: string;
  dragRef: (element: HTMLElement | null) => void;
  node: Node;
  position: 'outside-right' | 'outside-left' | 'inside';
  colorful?: boolean;
  disableDelete?: boolean;
}

export function MasterButton(props: Props) {
  const { listeners, className, node, colorful, disableDelete, position, dragRef } = props;
  const [deleteNode, cloneNode, selectNode] = useBuilderStore(
    useShallow((s) => [s.deleteNode, s.cloneNode, s.selectNode])
  );

  return (
    <>
      <Box
        dir="ltr"
        className={`floating-button ${className}`}
        sx={{
          position: 'absolute',
          top: 0,
          height: '100%',
          width: '46px',
          zIndex: 100,

          ...(position === 'inside' && {
            right: 0,
            pr: 1,
          }),

          ...(position === 'outside-right' && {
            clipPath: 'polygon(0 0,100% calc(50% - 10px),100% calc(50% + 10px),0 100%)',
            right: 0,
            transform: 'translateX(100%)',
          }),

          ...(position === 'outside-left' && {
            left: 1,
            clipPath: 'polygon(100% 0,0 calc(50% - 10px),0 calc(50% + 10px),100% 100%)',
            transform: 'translateX(-100%)',
          }),
        }}
      />

      <Box
        dir="ltr"
        className={`floating-button ${className}`}
        sx={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          alignItems: 'center',
          zIndex: 100,
          ...(position === 'inside' && {
            right: 0,
            pr: 1,
          }),

          ...(position === 'outside-right' && {
            right: 0,
            transform: 'translateY(-50%) translateX(100%)',
            pl: 1,
          }),

          ...(position === 'outside-left' && {
            left: 0,
            transform: 'translateY(-50%) translateX(-100%)',
            pr: 1,
          }),
        }}>
        <Stack
          direction="row"
          className="floating-button-stack"
          bgcolor={colorful ? 'primary.light' : 'var(--palette-grey-800)'}
          borderRadius="15px"
          sx={{
            width: '38px',
            height: '38px',
            cursor: 'pointer',
            '&:hover': {
              width: 'auto',
            },
          }}>
          <Stack
            direction="row"
            spacing={0}
            sx={{
              display: 'none',
              '.floating-button-stack:hover &': {
                display: 'flex',
              },
            }}>
            <Tooltip title="Drag" arrow>
              <IconButton ref={dragRef} {...listeners}>
                <Iconify icon="ant-design:drag-outlined" color="white" width={22} />
              </IconButton>
            </Tooltip>

            <IconButton
              disabled={disableDelete}
              onClick={() => {
                selectNode(undefined);
                deleteNode(node);
              }}>
              <Iconify icon="solar:trash-bin-trash-bold" color="white" width={22} />
            </IconButton>

            <IconButton onClick={() => cloneNode(node)}>
              <Iconify icon="ion:duplicate" color="white" width={22} />
            </IconButton>
          </Stack>

          <IconButton>
            <Iconify
              icon="tabler:dots"
              color="white"
              width={22}
              // sx={{
              //   display: "block",
              //   ".floating-button:hover &": {
              //     display: "none",
              //   },
              // }}
            />
          </IconButton>
        </Stack>
      </Box>
    </>
  );
}
