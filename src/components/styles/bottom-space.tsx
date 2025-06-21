import { XField } from '@/components/input';
import type { Theme, SxProps } from '@mui/material';
import { Typography } from '@mui/material';
import { Block } from './block';

interface Props {
  badge?: boolean;
  title: string;
  subTitle: string;
  value: number;
  sx?: SxProps<Theme>;
  onChange: (v: number) => void;
}

export function BottomSpace({ title, subTitle, sx, badge, value, onChange }: Props) {
  return (
    <Block
      title={title}
      badge={badge}
      control={<XField.Number size="small" value={value} onChange={onChange} sx={{ width: 120 }} />}
      sx={sx}>
      <Typography variant="body2" sx={{ mb: 1 }}>
        {subTitle}
      </Typography>
    </Block>
  );
}
