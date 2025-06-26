import type { FontFamily } from '@/types';
import { fontFamilyOptions } from '@/constant/font';
import { Block } from './block';
import { XSelect } from '../x-common';

interface Props {
  value: FontFamily;
  onChange: (v: FontFamily) => void;
}

export function FontFamilySetting({ value, onChange }: Props) {
  return (
    <Block title="Font Family">
      <XSelect
        value={value}
        options={fontFamilyOptions.map((o) => ({ id: o.id, name: o.name }))}
        onChange={onChange}
        className="w-64"
      />
    </Block>
  );
}
