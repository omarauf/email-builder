import { NoSsr, type Theme, type SxProps } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import type { JSX } from 'react';
import type { CustomStyleProps } from './use-custom-style';
import { useCustomStyle } from './use-custom-style';
import { Iconify } from '../iconify';
import { useTab } from './use-tab';

interface Props {
  tabs: {
    content: string | JSX.Element;
    label?: string;
    sx?: SxProps<Theme>;
    icon?: string;
    disabled?: boolean;
  }[];
  defaultTab?: number;
  styleType?: 'standard' | 'custom' | 'border';
  variant?: 'standard' | 'fullWidth' | 'scrollable';
  slotProps?: CustomStyleProps & {
    tabs?: SxProps<Theme>;
    wrapper?: SxProps<Theme>;
    content?: SxProps<Theme>;
  };
}

export function XTabs({ tabs, styleType, slotProps, variant, defaultTab }: Props) {
  const [tabIndex, handleTabChange] = useTab(defaultTab);

  const style = useCustomStyle(slotProps);

  let sx;
  if (styleType === 'custom') sx = style;
  else if (styleType === 'border') sx = { borderBottom: 1, borderColor: 'divider' };

  const selectedTab = tabs[tabIndex];

  return (
    <Box sx={slotProps?.wrapper}>
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        sx={{ ...sx, ...slotProps?.tabs }}
        variant={variant}
        TabIndicatorProps={{
          children: (
            <NoSsr>
              <span />
            </NoSsr>
          ),
        }}>
        {tabs.map((tab, index) => (
          <Tab
            key={tab.label || tab.icon}
            value={index}
            label={tab.label}
            disabled={tab.disabled}
            icon={tab.icon && <Iconify icon={tab.icon} width={24} />}
          />
        ))}
      </Tabs>

      <Box sx={{ ...slotProps?.content, ...selectedTab?.sx } as SxProps<Theme>}>
        {selectedTab?.content}
      </Box>
    </Box>
  );
}
