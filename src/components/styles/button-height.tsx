import { Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Iconify } from '@/components/iconify';
import { XField } from '@/components/input';
import { useBoolean } from '@/hooks/use-boolean';
import { Block } from './block';

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
      control={<XField.Switch value={toggle.value} onChange={onChangeHandler} />}>
      {toggle.value && (
        <Stack direction="row" justifyContent="space-between">
          <XField.Number
            size="small"
            value={height || 80}
            onChange={onHeightChange}
            sx={{ width: 120 }}
          />

          <ToggleButtonGroup
            exclusive
            size="small"
            value={align}
            onChange={(_, v) => {
              if (v === null || v === align) return;
              onAlignChange(v);
            }}>
            <ToggleButton key="top" value="top">
              <Iconify icon="lucide:align-start-horizontal" />
            </ToggleButton>
            <ToggleButton key="middle" value="middle">
              <Iconify icon="lucide:align-center-horizontal" />
            </ToggleButton>
            <ToggleButton key="bottom" value="bottom">
              <Iconify icon="lucide:align-end-horizontal" />
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      )}
    </Block>
  );
}
