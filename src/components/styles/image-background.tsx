import type { ImageBackground } from '@/types';
import { cn } from '@/lib/utils';
import { useBoolean } from '@/hooks/use-boolean';
import { Block } from './block';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';
import { ImageChanger } from './image-changer';
import { XSelect, XToggleButtonGroup } from '../x-common';

interface Props {
  title: string;
  value?: ImageBackground;
  onSrcChange: (v: string) => void;
  onChange: (v?: ImageBackground) => void;
}

export function ImageBackgroundSetting({ title, value, onSrcChange, onChange }: Props) {
  const enable = value !== undefined;

  const handleEnableChange = (v: boolean) => {
    if (v) {
      onChange({
        src: '',
        positionH: { value: 'left', customValue: 0, customUnit: 'px' },
        positionV: { value: 'top', customValue: 0, customUnit: 'px' },
        width: { value: 'auto', customValue: 0 },
        height: { value: 'auto', customValue: 0 },
        repeat: 'no-repeat',
      });
    } else {
      onChange(undefined);
    }
  };

  return (
    <Block title={title} control={<Switch checked={enable} onCheckedChange={handleEnableChange} />}>
      {enable && <Content value={value} onChange={onChange} onSrcChange={onSrcChange} />}
    </Block>
  );
}

interface ContentProps {
  value: ImageBackground;
  onSrcChange: (v: string) => void;
  onChange: (v?: ImageBackground) => void;
}

function Content({ value, onChange, onSrcChange }: ContentProps) {
  const { src, metaData } = value;
  const customPositionH = useBoolean(false);
  const customPositionV = useBoolean(false);

  const handleCustomPositionH = (v: 'left' | 'center' | 'right' | 'custom') => {
    if (v === 'custom') customPositionH.onTrue();
    else customPositionH.onFalse();

    onChange({ ...value, positionH: { ...value.positionH, value: v } });
  };

  const handleCustomPositionV = (v: 'top' | 'center' | 'bottom' | 'custom') => {
    if (v === 'custom') customPositionV.onTrue();
    else customPositionV.onFalse();

    onChange({ ...value, positionV: { ...value.positionV, value: v } });
  };

  const renderText = (
    <Input
      placeholder="Image URL"
      value={src}
      onChange={(v) => onSrcChange(v.target.value)}
      className="mt-4"
    />
  );

  const renderProperties = metaData && (
    <div className="mt-4 flex flex-col gap-4">
      <ImageChanger
        src={src}
        metaData={metaData}
        onChange={() => onChange({ ...value, src: '', metaData: undefined })}
        className="p-0"
      />

      <Block title="Background Repeat" className="p-0">
        <Switch
          checked={value.repeat === 'repeat'}
          onCheckedChange={(v) => onChange({ ...value, repeat: v ? 'repeat' : 'no-repeat' })}
        />
      </Block>

      <div className="flex flex-col gap-2">
        <Block title="Horizontal Position" className="p-0">
          <XToggleButtonGroup
            type="single"
            value={value.positionH.value}
            buttons={[
              { value: 'left', icon: 'lucide:align-start-vertical' },
              { value: 'center', icon: 'lucide:align-center-vertical' },
              { value: 'right', icon: 'lucide:align-end-vertical' },
              { value: 'custom', icon: 'akar-icons:settings-horizontal' },
            ]}
            onChange={handleCustomPositionH}
          />
        </Block>

        {value.positionH.value === 'custom' && (
          <div className="flex items-center justify-end gap-2">
            <Input
              value={value.positionH.customValue}
              type="number"
              onChange={(v) =>
                onChange({
                  ...value,
                  positionH: { ...value.positionH, customValue: v.target.valueAsNumber },
                })
              }
              className="w-28"
            />

            <XToggleButtonGroup
              type="single"
              value={value.positionH.customUnit}
              buttons={[
                { value: 'px', title: 'px' },
                { value: '%', title: '%' },
              ]}
              onChange={(v) =>
                onChange({
                  ...value,
                  positionH: { ...value.positionH, customUnit: v },
                })
              }
            />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Block title="Vertical Position" className="p-0">
          <XToggleButtonGroup
            type="single"
            value={value.positionV.value}
            buttons={[
              { value: 'top', icon: 'lucide:align-start-horizontal' },
              { value: 'center', icon: 'lucide:align-center-horizontal' },
              { value: 'bottom', icon: 'lucide:align-end-horizontal' },
              { value: 'custom', icon: 'akar-icons:settings-vertical' },
            ]}
            onChange={handleCustomPositionV}
          />
        </Block>

        {value.positionV.value === 'custom' && (
          <div className="flex items-center justify-end gap-2">
            <Input
              value={value.positionV.customValue}
              type="number"
              onChange={(v) =>
                onChange({
                  ...value,
                  positionV: { ...value.positionV, customValue: v.target.valueAsNumber },
                })
              }
              className="w-28"
            />

            <XToggleButtonGroup
              type="single"
              value={value.positionV.customUnit}
              buttons={[
                { value: 'px', title: 'px' },
                { value: '%', title: '%' },
              ]}
              onChange={(v) =>
                onChange({
                  ...value,
                  positionV: { ...value.positionV, customUnit: v },
                })
              }
            />
          </div>
        )}
      </div>

      <Block title="Background Width" className="p-0">
        <Input
          value={value.width.customValue}
          type="number"
          onChange={(v) =>
            onChange({ ...value, width: { ...value.width, customValue: v.target.valueAsNumber } })
          }
          className={cn(
            'w-24',
            value.width.value === 'px' || value.width.value === '%' ? 'block' : 'hidden'
          )}
        />

        <XSelect
          value={value.width.value}
          options={[
            { id: 'px', name: 'px' },
            { id: '%', name: '%' },
            { id: 'auto', name: 'Auto' },
            { id: 'cover', name: 'Cover' },
            { id: 'contain', name: 'Contain' },
          ]}
          onChange={(v) => v && onChange({ ...value, width: { ...value.width, value: v } })}
          className="w-28"
        />
      </Block>

      <Block title="Background Height" className="p-0">
        <Input
          value={value.height.customValue}
          type="number"
          onChange={(v) =>
            onChange({ ...value, height: { ...value.height, customValue: v.target.valueAsNumber } })
          }
          className={cn(
            'w-24',
            value.height.value === 'px' || value.height.value === '%' ? 'block' : 'hidden'
          )}
        />

        <XSelect
          value={value.height.value}
          options={[
            { id: 'px', name: 'px' },
            { id: '%', name: '%' },
            { id: 'auto', name: 'Auto' },
            { id: 'cover', name: 'Cover' },
            { id: 'contain', name: 'Contain' },
          ]}
          onChange={(v) => v && onChange({ ...value, height: { ...value.height, value: v } })}
          className="w-28"
        />
      </Block>
    </div>
  );

  return metaData ? renderProperties : renderText;
}
