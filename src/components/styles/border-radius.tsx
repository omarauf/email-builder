import { Box, Stack, Typography, ToggleButton } from '@mui/material';
import { XField } from '@/components/input';
import { useState } from 'react';
import { Iconify } from '@/components/iconify';
import type { Inset } from '@/types';
import { blockStyle } from './block';

interface Props {
  value?: Inset;
  onChange: (v: Inset) => void;
}

export function BorderRadiusSetting({ value, onChange }: Props) {
  const [sync, setSync] = useState(true);

  const onChangeHandler = (key: number) => (c: number) => {
    const v = value || [0, 0, 0, 0];
    if (sync) onChange([c, c, c, c]);
    else onChange([...v.slice(0, key), c, ...v.slice(key + 1)] as Inset);
  };

  return (
    <Stack {...blockStyle} py={2}>
      <Stack
        direction="row"
        display="grid"
        gridTemplateColumns="1fr 1fr 1fr"
        gap={2}
        alignItems="center">
        <Typography variant="body2">Border Radius</Typography>
        {sync ? (
          <XField.Number size="small" value={value?.[0] || 0} onChange={onChangeHandler(0)} />
        ) : (
          <Box />
        )}
        <Stack direction="row" justifyContent="end">
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
        {!sync && (
          <>
            <XField.Number size="small" value={value?.[0] || 0} onChange={onChangeHandler(0)} />
            <Box />
            <XField.Number size="small" value={value?.[1] || 0} onChange={onChangeHandler(1)} />
            <XField.Number size="small" value={value?.[2] || 0} onChange={onChangeHandler(2)} />
            <Box />
            <XField.Number size="small" value={value?.[3] || 0} onChange={onChangeHandler(3)} />
          </>
        )}
      </Stack>
    </Stack>
  );
}
