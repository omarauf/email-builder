import { Stack, Typography } from '@mui/material';
import type { ButtonHover } from '@/types';
import { ColorPicker } from '../color-picker';
import { Block } from './block';

interface Props {
  value: ButtonHover;
  onChange: (k: keyof ButtonHover, v: string) => void;
}

export function ButtonHoverSetting({ value, onChange }: Props) {
  return (
    <Block title="Button Hover Style" control>
      <Stack pt={1} spacing={2}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="body2">Button Color</Typography>
          <ColorPicker value={value.buttonColor} onChange={(c) => onChange('buttonColor', c)} />
        </Stack>

        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="body2">Font Color</Typography>
          <ColorPicker value={value.fontColor} onChange={(c) => onChange('fontColor', c)} />
        </Stack>

        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="body2">Border Color</Typography>
          <ColorPicker value={value.borderColor} onChange={(c) => onChange('borderColor', c)} />
        </Stack>
      </Stack>
    </Block>
  );
}
