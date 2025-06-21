import type { SxProps, CardProps } from '@mui/material';
import { Card, Stack, Divider, Typography, IconButton } from '@mui/material';
import { Iconify } from '@/components/iconify';
import { Scrollbar } from '@/components/scrollbar';

const cardSx = {
  boxShadow:
    'rgba(0, 0, 0, 0.07) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 15px 35px -5px, rgba(0, 0, 0, 0.1) 0px 8px 10px -6px',
  transition: 'margin .15s ease-out',
  display: 'grid',
};

interface ActionButton {
  icon: string;
  onClick: () => void;
  sx?: SxProps;
}

interface Props extends CardProps {
  title?: string;
  children: React.ReactNode;
  actionButton?: { left?: ActionButton; right?: ActionButton };
}

export function SettingCard({ title, actionButton, children, sx, ...other }: Props) {
  return (
    <Card sx={{ ...cardSx, ...sx }} {...other}>
      {title && (
        <>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ cursor: 'pointer' }}>
            {actionButton?.left && (
              <IconButton
                onClick={actionButton.left.onClick}
                sx={{
                  position: 'absolute',
                  left: 10,
                  ...actionButton.left.sx,
                }}>
                <Iconify icon={actionButton.left.icon} />
              </IconButton>
            )}

            <Typography variant="subtitle1" px={2.5} py={2} textAlign="center">
              {title}
            </Typography>

            {actionButton?.right && (
              <IconButton
                onClick={actionButton.right.onClick}
                sx={{
                  position: 'absolute',
                  right: 10,
                  ...actionButton.right.sx,
                }}>
                <Iconify icon={actionButton.right.icon} />
              </IconButton>
            )}
          </Stack>
          <Divider />
        </>
      )}

      <Scrollbar>{children}</Scrollbar>
    </Card>
  );
}
