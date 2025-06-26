import type { TextAlignment } from '@/types';
import { Block } from './block';
import { XToggleButtonGroup } from '../x-common';

interface Props {
  title: string;
  value: TextAlignment;
  onChange: (value: TextAlignment) => void;
}

export function TextAlignmentSetting({ title, value, onChange }: Props) {
  const options: { value: TextAlignment; icon: string; title: string }[] = [
    { title: 'Left', value: 'left', icon: 'ic:round-format-align-left' },
    { title: 'Center', value: 'center', icon: 'ic:round-format-align-center' },
    { title: 'Right', value: 'right', icon: 'ic:round-format-align-right' },
    { title: 'Justify', value: 'justify', icon: 'ic:round-format-align-justify' },
  ];

  return (
    <Block badge title={title} control>
      <XToggleButtonGroup
        type="single"
        value={value}
        onChange={onChange}
        buttons={options}
        className="mt-2 w-full"
      />
    </Block>
  );
}
