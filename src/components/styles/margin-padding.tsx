import { useState } from 'react';
import type { Inset } from '@/types';
import { Iconify } from '@/components/iconify';
import { Block } from './block';
import { Toggle } from '../ui/toggle';
import { XNumber } from '../input/text/number';

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
      <div className="grid grid-cols-3 gap-4">
        <div />
        <XNumber
          value={value?.[0] || 0}
          onChange={(e) => onChangeHandler(e)(0)}
          steps={5}
          min={0}
        />
        <div />
        <XNumber
          value={value?.[3] || 0}
          onChange={(e) => onChangeHandler(e)(3)}
          steps={5}
          min={0}
        />
        <div className="flex justify-center">
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
        <XNumber
          value={value?.[1] || 0}
          onChange={(e) => onChangeHandler(e)(1)}
          steps={5}
          min={0}
        />
        <div />
        <XNumber
          value={value?.[2] || 0}
          onChange={(e) => onChangeHandler(e)(2)}
          steps={5}
          min={0}
        />
      </div>
    </Block>
  );
}
