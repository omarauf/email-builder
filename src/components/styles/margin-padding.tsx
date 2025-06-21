import { Box, Stack, ToggleButton } from '@mui/material';
import { useState } from 'react';
import { Iconify } from '@/components/iconify';
import { XField } from '@/components/input';
import type { Inset } from '@/types';
import { Block } from './block';

interface Props {
  badge?: boolean;
  title: string;
  value?: Inset;
  onChange: (value: Inset) => void;
}

export function MarginPadding({ badge, title, value, onChange }: Props) {
  const [sync, setSync] = useState(false);

  const onChangeHandler = (key: number) => (v: number) => {
    const p = value || [0, 0, 0, 0];
    if (sync) {
      onChange([v, v, v, v]);
    } else {
      onChange([...p.slice(0, key), v, ...p.slice(key + 1)] as Inset);
    }
  };

  return (
    <Block title={title} badge={badge} control>
      <Stack
        direction="row"
        display="grid"
        gridTemplateColumns="1fr 1fr 1fr"
        gap={2}
        mt={2}
        alignItems="center">
        <Box />
        <XField.Number
          size="small"
          value={value?.[0] || 0}
          onChange={onChangeHandler(0)}
          steps={5}
          min={0}
        />
        <Box />
        <XField.Number
          size="small"
          value={value?.[3] || 0}
          onChange={onChangeHandler(3)}
          steps={5}
          min={0}
        />
        <Stack direction="row" justifyContent="center">
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
        <XField.Number
          size="small"
          value={value?.[1] || 0}
          onChange={onChangeHandler(1)}
          steps={5}
          min={0}
        />
        <Box />
        <XField.Number
          size="small"
          value={value?.[2] || 0}
          onChange={onChangeHandler(2)}
          steps={5}
          min={0}
        />
      </Stack>
    </Block>
  );
}
