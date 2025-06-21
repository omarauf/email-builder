import SimpleBar from 'simplebar-react';

import Box from '@mui/material/Box';

import { scrollbarClasses } from './classes';

import type { ScrollbarProps } from './types';

export function Scrollbar({
  slotProps,
  children,
  fillContent,
  naturalScroll,
  sx,
  ref,
  ...other
}: ScrollbarProps) {
  return (
    <Box
      component={SimpleBar}
      scrollableNodeProps={{ ref }}
      clickOnTrack={false}
      className={scrollbarClasses.root}
      sx={{
        minWidth: 0,
        minHeight: 0,
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        '& .simplebar-wrapper': slotProps?.wrapper as React.CSSProperties,
        '& .simplebar-content-wrapper': slotProps?.contentWrapper as React.CSSProperties,
        '& .simplebar-content': {
          ...(fillContent && {
            minHeight: 1,
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
          }),
          ...slotProps?.content,
        } as React.CSSProperties,
        ...sx,
      }}
      {...other}>
      {children as React.ReactNode}
    </Box>
  );
}
