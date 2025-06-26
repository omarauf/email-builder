import { Block } from './block';
import { Input } from '../ui/input';
import { XToggleButtonGroup } from '../x-common';

interface Props {
  unit: 'px' | 'em';
  value: number;
  onValueChange: (value: number) => void;
  onUnitChange: (value: 'px' | 'em') => void;
}

export function LetterSpacing({ unit, value, onValueChange, onUnitChange }: Props) {
  return (
    <Block title="Letter Spacing">
      <div className="flex items-center gap-2">
        <Input
          type="number"
          value={value}
          onChange={(e) => onValueChange(e.target.valueAsNumber)}
          className="w-32"
        />

        <XToggleButtonGroup
          type="single"
          value={unit}
          buttons={[
            { value: 'px', title: 'px' },
            { value: 'em', title: 'em' },
          ]}
          onChange={(v) => onUnitChange(v)}
        />
      </div>
    </Block>
  );
}
