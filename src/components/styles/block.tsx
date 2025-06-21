import type { Theme, SxProps } from '@mui/material';
import { Badge, Stack, Typography } from '@mui/material';

interface Props {
  title: string;
  control?: React.ReactNode | boolean;
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
  badge?: boolean;
}

export const blockStyle = { px: 2.5, py: 2 };

export function Block({ badge, title, children, control, sx }: Props) {
  const bothExist = control && children;

  return (
    <Stack py={blockStyle.py} px={blockStyle.px} spacing={1} sx={sx}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        {badge ? (
          <BadgedTitle title={title} />
        ) : (
          title && <Typography variant="body2">{title}</Typography>
        )}

        {typeof control === 'boolean' ? '' : typeof control === 'object' ? control : children}
      </Stack>

      {bothExist && <Stack>{children}</Stack>}
    </Stack>
  );
}

function BadgedTitle({ title }: { title: string }) {
  return (
    <Badge
      color="primary"
      variant="dot"
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      slotProps={{
        badge: {
          style: {
            width: '6px',
            height: '6px',
            minWidth: '6px',
            transform: 'translate(-10px, -4px)',
          },
        },
      }}>
      <Typography variant="body2">{title}</Typography>
    </Badge>
  );
}
