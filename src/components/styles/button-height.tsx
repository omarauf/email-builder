import { XField } from '@/components/input';
import { useBoolean } from '@/hooks/use-boolean';
import { Block } from './block';
import { Switch } from '../ui/switch';
import { XToggleButtonGroup } from '../x-common';

type Align = 'top' | 'middle' | 'bottom';

interface Props {
  align: Align | undefined;
  height: number | undefined;
  onHeightChange: (height?: number) => void;
  onAlignChange: (align?: Align) => void;
}

export function ButtonHeight({ align, height, onHeightChange, onAlignChange }: Props) {
  const toggle = useBoolean();

  const onChangeHandler = (v: boolean) => {
    toggle.setValue(v);
    if (v) {
      onHeightChange(80);
      onAlignChange('middle');
    } else {
      onHeightChange(undefined);
      onAlignChange(undefined);
    }
  };

  return (
    <Block
      title="Button Height"
      control={<Switch checked={toggle.value} onCheckedChange={onChangeHandler} />}>
      {toggle.value && (
        <div className="mt-2 flex justify-between">
          <XField.Number value={height || 80} onChange={onHeightChange} className="w-[120px]" />

          <XToggleButtonGroup
            type="single"
            value={align || 'middle'}
            onChange={(v) => {
              if (v === null || v === align) return;
              onAlignChange(v);
            }}
            buttons={[
              { value: 'top', icon: 'lucide:align-start-horizontal' },
              { value: 'middle', icon: 'lucide:align-center-horizontal' },
              { value: 'bottom', icon: 'lucide:align-end-horizontal' },
            ]}
          />
        </div>
      )}
    </Block>
  );
}
