import { Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useMemo, useState, useEffect } from 'react';
import { XField } from '@/components/input';
import { Block } from './block';

interface Props {
  badge?: boolean;
  title: string;
  value: number;
  onChange: (value: number) => void;
}

export function LineHeight({ badge, title, value, onChange }: Props) {
  const options = useMemo(
    () => [
      { title: 's', value: 1 },
      { title: 'ms', value: 1.2 },
      { title: 'ml', value: 1.5 },
      { title: 'l', value: 2 },
      { title: 'c', value },
    ],
    [value]
  );

  const [preset, setPreset] = useState(options.find((o) => o.value === value)?.title || 'c');

  useEffect(() => {
    if (preset === 'c') return;
    setPreset(options.find((o) => o.value === value)?.title || 'c');
  }, [options, preset, value]);

  const presetHandler = (selectedPreset: string) => {
    const v = options.find((o) => o.title === selectedPreset);
    if (v) {
      setPreset(selectedPreset);
      onChange(v.value);
    }
  };

  return (
    <Block badge={badge} title={title} control>
      <Stack direction="row" spacing={1} alignItems="center">
        <ToggleButtonGroup
          value={preset}
          exclusive
          size="small"
          fullWidth
          onChange={(_, a) => a && presetHandler(a)}>
          {options.map((o) => (
            <ToggleButton key={o.value} value={o.title}>
              {o.title}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        <XField.Number
          size="small"
          value={Math.round(value * 100) / 100}
          onChange={onChange}
          sx={{ width: 200 }}
          steps={0.1}
        />
      </Stack>
    </Block>
  );
}
