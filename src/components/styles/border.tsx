import { Stack, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Iconify } from '@/components/iconify';
import { XField } from '@/components/input';
import { useState } from 'react';
import type { Border } from '@/types';
import { ColorPicker } from '../color-picker';
import { Block } from './block';

interface Props {
  value?: Border;
  onChange: (value: Border) => void;
}

const defaultValue: Border = {
  style: 'solid',
  color: '#000000',
  width: [0, 0, 0, 0],
};

export function BorderSetting({ value, onChange }: Props) {
  const [sync, setSync] = useState(true);

  value = value || defaultValue;

  const onWidthChangeHandler = (index: number, v?: number) => {
    if (v === undefined || v < 0) return;

    if (sync) {
      onChange({ ...value, width: [v, v, v, v] });
      return;
    }

    const newWidth = [...value.width] as [number, number, number, number];
    newWidth[index] = v;
    onChange({ ...value, width: newWidth });
  };

  return (
    <Block
      title="Border"
      control={
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <ToggleButtonGroup
            size="small"
            exclusive
            value={value.style}
            onChange={(_, v) => onChange({ ...value, style: v })}>
            <ToggleButton key="solid" value="solid">
              <Iconify icon="gg:border-style-solid" />
            </ToggleButton>
            <ToggleButton key="dashed" value="dashed">
              <Iconify icon="gg:border-style-dashed" />
            </ToggleButton>
            <ToggleButton key="dotted" value="dotted">
              <Iconify icon="gg:border-style-dotted" />
            </ToggleButton>
          </ToggleButtonGroup>

          <ColorPicker value={value.color} onChange={(c) => onChange({ ...value, color: c })} />
        </Stack>
      }>
      <Stack direction="column" spacing={2} width={1} mt={1}>
        <Stack
          direction="row"
          display="grid"
          gridTemplateColumns="1fr 1fr 1fr 1fr 1fr"
          columnGap={1}
          rowGap={1}>
          <Typography variant="body2">Top</Typography>
          <Typography variant="body2">Right</Typography>
          <Typography variant="body2">Bottom</Typography>
          <Typography variant="body2">Left</Typography>
          <Typography variant="body2">Sync</Typography>
          <XField.Number2
            size="small"
            value={value.width[0]}
            onChange={(v) => onWidthChangeHandler(0, v)}
          />
          <XField.Number2
            size="small"
            value={value.width[1]}
            onChange={(v) => onWidthChangeHandler(1, v)}
          />
          <XField.Number2
            size="small"
            value={value.width[2]}
            onChange={(v) => onWidthChangeHandler(2, v)}
          />
          <XField.Number2
            size="small"
            value={value.width[3]}
            onChange={(v) => onWidthChangeHandler(3, v)}
          />
          <ToggleButton
            value={sync}
            size="small"
            selected={sync}
            onChange={() => setSync((prv) => !prv)}>
            <Iconify
              icon={
                sync
                  ? 'solar:lock-keyhole-minimalistic-bold-duotone'
                  : 'solar:lock-keyhole-minimalistic-unlocked-bold-duotone'
              }
            />
          </ToggleButton>
        </Stack>
      </Stack>
    </Block>
  );
}
