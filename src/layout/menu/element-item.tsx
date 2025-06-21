import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import type { CardProps } from '@mui/material';
import { Card, Tooltip } from '@mui/material';
import { Iconify } from '@/components/iconify';

type Props = Omit<CardProps, 'itemRef'> & {
  icon: string;
  itemRef?: (element: HTMLElement | null) => void;
  listeners?: SyntheticListenerMap;
  tooltip?: string;
};

export function ElementItem(props: Props) {
  const { icon, tooltip, itemRef, listeners, sx, onClick, ...other } = props;

  return (
    <Tooltip title={tooltip} arrow placement="right">
      <Card
        ref={itemRef || null}
        sx={{
          aspectRatio: 1,
          width: 44,
          borderRadius: 1.25,
          border: '1px solid',
          borderColor: (theme) => theme.palette.divider,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
          cursor: onClick ? 'pointer' : 'grab',
          '&:hover': {
            boxShadow: (theme) => theme.shadows[15],
            transform: 'scale(1.025)',
            transition: 'all 0.2s ease-in-out',
            borderColor: (theme) => theme.palette.primary.main,
          },
          ...sx,
        }}
        onClick={onClick}
        {...other}
        {...listeners}>
        <Iconify icon={icon} width={20} />
      </Card>
    </Tooltip>
  );
}
