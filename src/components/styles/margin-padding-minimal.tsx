import { useState } from 'react';
import type { Inset } from '@/types';
import { Iconify } from '@/components/iconify';
import { Block } from './block';
import { Input } from '../ui/input';
import { Toggle } from '../ui/toggle';

interface Props {
  badge?: boolean;
  title: string;
  value?: Inset;
  onChange: (value: Inset) => void;
}

export function MarginPaddingMinimal({ badge, title, value, onChange }: Props) {
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
        <Toggle pressed={sync} onPressedChange={() => setSync(!sync)} variant="outline">
          <Iconify icon={icon} />
        </Toggle>
      }>
      <div className="mt-1 grid grid-cols-4 gap-x-4 gap-y-2">
        <p className="text-sm">Top</p>
        <p className="text-sm">Right</p>
        <p className="text-sm">Bottom</p>
        <p className="text-sm">Left</p>
        <Input
          type="number"
          value={value?.[0] || 0}
          onChange={(e) => onChangeHandler(0)(e.target.valueAsNumber)}
        />
        <Input
          type="number"
          value={value?.[1] || 0}
          onChange={(e) => onChangeHandler(1)(e.target.valueAsNumber)}
        />
        <Input
          type="number"
          value={value?.[2] || 0}
          onChange={(e) => onChangeHandler(2)(e.target.valueAsNumber)}
        />
        <Input
          type="number"
          value={value?.[3] || 0}
          onChange={(e) => onChangeHandler(3)(e.target.valueAsNumber)}
        />
      </div>
    </Block>
  );
}
