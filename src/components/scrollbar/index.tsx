import type { Props as SimplebarProps } from 'simplebar-react';

import SimpleBar from 'simplebar-react';

type ScrollbarProps = SimplebarProps & {
  fillContent?: boolean;
  naturalScroll?: boolean;
  ref?: React.Ref<HTMLDivElement>;
};

export function Scrollbar({
  children,
  fillContent,
  naturalScroll,
  ref,
  style,
  ...other
}: ScrollbarProps) {
  return (
    <SimpleBar
      clickOnTrack={false}
      scrollableNodeProps={{ ref }}
      style={{
        minWidth: 0,
        minHeight: 0,
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
      {...other}>
      {children}
    </SimpleBar>
  );
}
