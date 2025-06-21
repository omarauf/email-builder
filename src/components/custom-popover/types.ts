import type { PopoverProps } from '@mui/material/Popover';
import type { Theme, SxProps } from '@mui/material/styles';

export interface PopoverArrow {
  hide?: boolean;
  size?: number;
  offset?: number;
  sx?: SxProps<Theme>;
  placement?:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right'
    | 'left-top'
    | 'left-center'
    | 'left-bottom'
    | 'right-top'
    | 'right-center'
    | 'right-bottom';
}

export interface UsePopoverReturn {
  open: PopoverProps['open'];
  anchorEl: PopoverProps['anchorEl'];
  onClose: () => void;
  onOpen: (event: React.MouseEvent<HTMLElement>) => void;
  setAnchorEl: React.Dispatch<React.SetStateAction<PopoverProps['anchorEl']>>;
}

export type CustomPopoverProps = PopoverProps & {
  slotProps?: PopoverProps['slotProps'] & {
    arrow?: PopoverArrow;
  };
};
