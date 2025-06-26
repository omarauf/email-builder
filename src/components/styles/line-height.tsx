import { useMemo, useState, useEffect } from 'react';
import { Block } from './block';
import { Input } from '../ui/input';
import { XToggleButtonGroup } from '../x-common';

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
      <div className="flex items-center gap-2 pt-2">
        <XToggleButtonGroup
          type="single"
          value={preset}
          onChange={(v) => presetHandler(v)}
          buttons={options.map((v) => ({
            title: v.title,
            value: v.title,
          }))}
          className="flex-1"
        />

        <Input
          value={Math.round(value * 100) / 100}
          type="number"
          onChange={(v) => onChange(v.target.valueAsNumber)}
          className="w-32"
          step={0.1}
        />
      </div>
    </Block>
  );
}
