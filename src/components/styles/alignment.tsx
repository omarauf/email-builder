import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Iconify } from '@/components/iconify';
import type { Alignment } from '@/types';
import { Block } from './block';

interface Props {
  title: string;
  value?: Alignment;
  defaultValue: Alignment;
  disabled?: boolean;
  onChange: (value: Alignment) => void;
}

export function AlignmentSetting({ title, value, disabled, defaultValue, onChange }: Props) {
  return (
    <Block badge title={title}>
      <ToggleButtonGroup
        exclusive
        disabled={disabled}
        size="small"
        value={value || defaultValue}
        onChange={(_, v) => {
          if (v === null || v === value) return;
          onChange(v);
        }}>
        <ToggleButton key="left" value="left">
          <Iconify icon="lucide:align-start-vertical" />
        </ToggleButton>
        <ToggleButton key="center" value="center">
          <Iconify icon="lucide:align-center-vertical" />
        </ToggleButton>
        <ToggleButton key="right" value="right">
          <Iconify icon="lucide:align-end-vertical" />
        </ToggleButton>
      </ToggleButtonGroup>
    </Block>
  );
}
