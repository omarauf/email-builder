import { useState } from 'react';
import type { Inset } from '@/types';
import { cn } from '@/lib/utils';
import { Iconify } from '@/components/iconify';
import { Input } from '../ui/input';
import { blockStyle } from './block';
import { Toggle } from '../ui/toggle';

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
    <div className={cn('space-y-2', blockStyle.px, blockStyle.py)}>
      <div className="grid grid-cols-3 items-center gap-2">
        <span className="text-muted-foreground text-sm">Border Radius</span>

        {sync ? (
          <Input
            type="number"
            value={value?.[0] ?? 0}
            onChange={(e) => onChangeHandler(0)(+e.target.value)}
          />
        ) : (
          <div />
        )}

        <div className="flex justify-end">
          <Toggle pressed={sync} onPressedChange={() => setSync(!sync)} variant="outline">
            <Iconify
              icon={
                sync
                  ? 'solar:lock-keyhole-minimalistic-bold-duotone'
                  : 'solar:lock-keyhole-minimalistic-unlocked-bold-duotone'
              }
            />
          </Toggle>
        </div>

        {!sync && (
          <>
            <Input
              type="number"
              value={value?.[0] ?? 0}
              onChange={(e) => onChangeHandler(0)(+e.target.value)}
            />
            <div />
            <Input
              type="number"
              value={value?.[1] ?? 0}
              onChange={(e) => onChangeHandler(1)(+e.target.value)}
            />
            <Input
              type="number"
              value={value?.[2] ?? 0}
              onChange={(e) => onChangeHandler(2)(+e.target.value)}
            />
            <div />
            <Input
              type="number"
              value={value?.[3] ?? 0}
              onChange={(e) => onChangeHandler(3)(+e.target.value)}
            />
          </>
        )}
      </div>
    </div>
  );
}
