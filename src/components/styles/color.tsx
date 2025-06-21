import { ColorPicker } from '../color-picker';
import { Block } from './block';

interface Props {
  title: string;
  value: string;
  onChange: (value: string) => void;
}

export function Color({ title, value, onChange }: Props) {
  return (
    <Block title={title}>
      <ColorPicker value={value} onChange={onChange} />
    </Block>
  );
}
