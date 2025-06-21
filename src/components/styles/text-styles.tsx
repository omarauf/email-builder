import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Iconify } from '@/components/iconify';
import { Block } from './block';

type Value = 'bold' | 'italic' | 'underline';

interface Props {
  value: Value[];
  onChange: (newValue: Value[]) => void;
}

export function TextStyles({ value, onChange }: Props) {
  return (
    <Block title="Text Styles">
      <ToggleButtonGroup size="small" value={value} onChange={(_, v) => onChange(v)}>
        <ToggleButton key="bold" value="bold">
          <Iconify icon="ooui:bold-b" />
        </ToggleButton>
        <ToggleButton key="italic" value="italic">
          <Iconify icon="ooui:italic-i" />
        </ToggleButton>
        <ToggleButton key="underline" value="underline">
          <Iconify icon="ooui:underline-u" />
        </ToggleButton>
      </ToggleButtonGroup>
    </Block>
  );
}
