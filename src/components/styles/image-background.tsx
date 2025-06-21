import { XField } from '@/components/input';
import { Box, Stack, Button, Typography } from '@mui/material';
import type { ImageBackground } from '@/types';
import { Image as ImageElement } from '@/components/image';
import { useBoolean } from '@/hooks/use-boolean';
import { fSize } from '@/utils/format-number';
import { Block } from './block';
import { XToggleButtonGroup } from '../buttons';

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
    <Block title={title} control={<XField.Switch value={enable} onChange={handleEnableChange} />}>
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
    <XField.Text label="Image URL" value={src} onChange={onSrcChange} size="small" />
  );

  const renderProperties = metaData && (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2}>
        <ImageElement
          src={src}
          sx={{
            width: 120,
            aspectRatio: 1,
            borderRadius: 1,
            backgroundPosition: '0 0, 10px 10px',
            backgroundSize: '20px 20px',
            backgroundImage:
              'linear-gradient(45deg, rgba(0, 0, 0, 0.07) 25%, rgba(0, 0, 0, 0) 0px, rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 0.07) 0px), linear-gradient(45deg, rgba(0, 0, 0, 0.07) 25%, rgba(0, 0, 0, 0) 0px, rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 0.07) 0px)',
            boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.1)',
          }}
          slotProps={{
            image: { objectFit: 'contain' },
          }}
        />

        <Stack>
          <Typography>{metaData.name}</Typography>

          <Typography variant="body2">
            {metaData.width} x {metaData.height} px
          </Typography>

          {metaData.size !== 0 && <Typography variant="body2">{fSize(metaData.size)}</Typography>}

          <Box flexGrow={1} />

          <Button
            variant="outlined"
            onClick={() => onChange({ ...value, src: '', metaData: undefined })}>
            Change Image
          </Button>
        </Stack>
      </Stack>

      <Block title="Background Repeat" sx={{ px: 0, py: 0 }}>
        <XField.Switch
          value={value.repeat === 'repeat'}
          onChange={(v) => onChange({ ...value, repeat: v ? 'repeat' : 'no-repeat' })}
        />
      </Block>

      <Stack spacing={1}>
        <Block title="Horizontal Position" sx={{ px: 0, py: 0 }}>
          <XToggleButtonGroup
            value={value.positionH.value}
            buttons={[
              {
                title: 'Left',
                value: 'left',
                icon: 'lucide:align-start-vertical',
              },
              {
                title: 'Center',
                value: 'center',
                icon: 'lucide:align-center-vertical',
              },
              {
                title: 'Right',
                value: 'right',
                icon: 'lucide:align-end-vertical',
              },
              {
                title: 'Custom',
                value: 'custom',
                icon: 'akar-icons:settings-horizontal',
              },
            ]}
            onChange={handleCustomPositionH}
          />
        </Block>
        {value.positionH.value === 'custom' && (
          <Stack direction="row" justifyContent="end" alignItems="center">
            <XField.Number
              value={value.positionH.customValue}
              onChange={(v) =>
                onChange({
                  ...value,
                  positionH: { ...value.positionH, customValue: v },
                })
              }
              size="small"
              sx={{ width: 110 }}
            />
            <XToggleButtonGroup
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
          </Stack>
        )}
      </Stack>

      <Stack spacing={1}>
        <Block title="Vertical Position" sx={{ px: 0, py: 0 }}>
          <XToggleButtonGroup
            value={value.positionV.value}
            buttons={[
              {
                title: 'Top',
                value: 'top',
                icon: 'lucide:align-start-horizontal',
              },
              {
                title: 'Center',
                value: 'center',
                icon: 'lucide:align-center-horizontal',
              },
              {
                title: 'Bottom',
                value: 'bottom',
                icon: 'lucide:align-end-horizontal',
              },
              {
                title: 'Custom',
                value: 'custom',
                icon: 'akar-icons:settings-vertical',
              },
            ]}
            onChange={handleCustomPositionV}
          />
        </Block>
        {value.positionV.value === 'custom' && (
          <Stack direction="row" justifyContent="end" alignItems="center">
            <XField.Number
              value={value.positionV.customValue}
              onChange={(v) =>
                onChange({
                  ...value,
                  positionV: { ...value.positionV, customValue: v },
                })
              }
              size="small"
              sx={{ width: 110 }}
            />
            <XToggleButtonGroup
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
          </Stack>
        )}
      </Stack>

      <Block title="Background Width" sx={{ px: 0, py: 0 }}>
        <XField.Number
          value={value.width.customValue}
          onChange={(v) => onChange({ ...value, width: { ...value.width, customValue: v } })}
          size="small"
          sx={{
            width: 110,
            display: value.width.value === 'px' || value.width.value === '%' ? 'block' : 'none',
          }}
        />
        <XField.Select
          value={value.width.value}
          options={[
            { id: 'px', name: 'px' },
            { id: '%', name: '%' },
            { id: 'auto', name: 'Auto' },
            { id: 'cover', name: 'Cover' },
            { id: 'contain', name: 'Contain' },
          ]}
          onChange={(v) => v && onChange({ ...value, width: { ...value.width, value: v } })}
          size="small"
          sx={{ width: 80 }}
        />
      </Block>

      <Block title="Background Height" sx={{ px: 0, py: 0 }}>
        <XField.Number
          value={value.height.customValue}
          onChange={(v) => onChange({ ...value, height: { ...value.height, customValue: v } })}
          size="small"
          sx={{
            width: 110,
            display: value.height.value === 'px' || value.height.value === '%' ? 'block' : 'none',
          }}
        />
        <XField.Select
          value={value.height.value}
          options={[
            { id: 'px', name: 'px' },
            { id: '%', name: '%' },
            { id: 'auto', name: 'Auto' },
            { id: 'cover', name: 'Cover' },
            { id: 'contain', name: 'Contain' },
          ]}
          onChange={(v) => v && onChange({ ...value, height: { ...value.height, value: v } })}
          size="small"
          sx={{ width: 80 }}
        />
      </Block>
    </Stack>
  );

  return metaData ? renderProperties : renderText;
}
