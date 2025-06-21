import { Stack, Typography, ToggleButton } from '@mui/material';
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

export function MarginPaddingNew({ badge, title, value, onChange }: Props) {
  const [sync, setSync] = useState(false);

  const onChangeHandler = (key: number) => (v?: number) => {
    if (v === undefined) return;
    const p = value || [0, 0, 0, 0];
    if (sync) onChange([v, v, v, v]);
    else onChange([...p.slice(0, key), v, ...p.slice(key + 1)] as Inset);
  };

  const icon = sync
    ? 'solar:lock-keyhole-minimalistic-bold-duotone'
    : 'solar:lock-keyhole-minimalistic-unlocked-bold-duotone';

  return (
    <Block
      title={title}
      badge={badge}
      control={
        <ToggleButton
          value={sync}
          size="small"
          selected={sync}
          onChange={() => setSync((prv) => !prv)}>
          <Iconify icon={icon} />
        </ToggleButton>
      }>
      <Stack
        direction="row"
        display="grid"
        gridTemplateColumns="1fr 1fr 1fr 1fr"
        columnGap={2}
        rowGap={1}
        mt={0.5}>
        <Typography variant="body2">Top</Typography>
        <Typography variant="body2">Right</Typography>
        <Typography variant="body2">Bottom</Typography>
        <Typography variant="body2">Left</Typography>
        <XField.Number2 size="small" value={value?.[0] || 0} onChange={onChangeHandler(0)} />
        <XField.Number2 size="small" value={value?.[1] || 0} onChange={onChangeHandler(1)} />
        <XField.Number2 size="small" value={value?.[2] || 0} onChange={onChangeHandler(2)} />
        <XField.Number2 size="small" value={value?.[3] || 0} onChange={onChangeHandler(3)} />
      </Stack>
    </Block>
  );
}
