import type { ButtonHover } from '@/types';
import { Block } from './block';
import { ColorPicker } from '../color-picker';

interface Props {
  value: ButtonHover;
  onChange: (k: keyof ButtonHover, v: string) => void;
}

export function ButtonHoverSetting({ value, onChange }: Props) {
  return (
    <Block title="Button Hover Style" control>
      <div className="flex flex-col gap-4 pt-1">
        <div className="flex flex-row items-center justify-between">
          <span className="text-muted-foreground text-sm">Button Color</span>
          <ColorPicker value={value.buttonColor} onChange={(c) => onChange('buttonColor', c)} />
        </div>
        <div className="flex flex-row items-center justify-between">
          <span className="text-muted-foreground text-sm">Font Color</span>
          <ColorPicker value={value.fontColor} onChange={(c) => onChange('fontColor', c)} />
        </div>
        <div className="flex flex-row items-center justify-between">
          <span className="text-muted-foreground text-sm">Border Color</span>
          <ColorPicker value={value.borderColor} onChange={(c) => onChange('borderColor', c)} />
        </div>
      </div>
    </Block>
  );
}
