import { useState } from 'react';
import type { Border } from '@/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Iconify } from '@/components/iconify';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Block } from './block';
import { ColorPicker } from '../color-picker';

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
        <div className="flex flex-row items-center justify-between gap-2">
          <ToggleGroup
            type="single"
            variant="outline"
            value={value.style}
            onValueChange={(v) => onChange({ ...value, style: v as Border['style'] })}>
            <ToggleGroupItem value="solid">
              <Iconify icon="gg:border-style-solid" />
            </ToggleGroupItem>
            <ToggleGroupItem value="dashed">
              <Iconify icon="gg:border-style-dashed" />
            </ToggleGroupItem>
            <ToggleGroupItem value="dotted">
              <Iconify icon="gg:border-style-dotted" />
            </ToggleGroupItem>
          </ToggleGroup>
          <ColorPicker value={value.color} onChange={(c) => onChange({ ...value, color: c })} />
        </div>
      }>
      <div className="mt-2 flex w-full flex-col gap-2">
        <div className="grid grid-cols-5 items-center gap-1">
          <Label className="text-xs">Top</Label>
          <Label className="text-xs">Right</Label>
          <Label className="text-xs">Bottom</Label>
          <Label className="text-xs">Left</Label>
          <Label className="text-xs">Sync</Label>
          <Input
            type="number"
            min={0}
            value={value.width[0]}
            onChange={(e) => onWidthChangeHandler(0, Number(e.target.value))}
            className="w-full"
          />
          <Input
            type="number"
            min={0}
            value={value.width[1]}
            onChange={(e) => onWidthChangeHandler(1, Number(e.target.value))}
            className="w-full"
          />
          <Input
            type="number"
            min={0}
            value={value.width[2]}
            onChange={(e) => onWidthChangeHandler(2, Number(e.target.value))}
            className="w-full"
          />
          <Input
            type="number"
            min={0}
            value={value.width[3]}
            onChange={(e) => onWidthChangeHandler(3, Number(e.target.value))}
            className="w-full"
          />
          <Button
            variant={sync ? 'default' : 'outline'}
            size="icon"
            aria-pressed={sync}
            onClick={() => setSync((prv) => !prv)}>
            <Iconify
              icon={
                sync
                  ? 'solar:lock-keyhole-minimalistic-bold-duotone'
                  : 'solar:lock-keyhole-minimalistic-unlocked-bold-duotone'
              }
            />
          </Button>
        </div>
      </div>
    </Block>
  );
}
