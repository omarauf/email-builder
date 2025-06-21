import { Box, Stack } from '@mui/material';
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { parseLayouts, getLayoutTotal } from '@/utils/layout';
import type { Layout } from '../structure/type';

interface Props {
  layout: Layout;
  size?: 'small' | 'large';
  onClick?: VoidFunction;
  itemRef?: (element: HTMLElement | null) => void;
  listeners?: SyntheticListenerMap;
}

export function LayoutContainer({ layout, size = 'small', onClick, itemRef, listeners }: Props) {
  const layouts = parseLayouts(layout);
  const total = getLayoutTotal(layout);

  const isSmall = size === 'small';

  return (
    <Stack
      ref={itemRef}
      direction="row"
      spacing={isSmall ? 1 : 1.5}
      bgcolor="background.paper"
      sx={{
        p: isSmall ? 0.75 : 1,
        borderRadius: 0.75,
        boxShadow: `0 0 0 2px var(--palette-divider)`,
        cursor: onClick ? 'pointer' : 'grab',
        '&:hover': {
          boxShadow: `0 0 0 2px var(--palette-primary-main)`,
        },
        height: isSmall ? 30 : 40,
      }}
      {...listeners}>
      {layouts.map((l, i) => (
        <Box
          key={i}
          onClick={onClick}
          sx={{
            textAlign: 'center',
            bgcolor: 'primary.lighter',
            color: 'primary.main',
            py: 1,
            borderRadius: 0.5,
            border: '1px dashed',
            borderColor: 'primary.main',
            width: `${(l / total) * 100}%`,
          }}
        />
      ))}
    </Stack>
  );
}
