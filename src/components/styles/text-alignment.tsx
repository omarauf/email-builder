import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Iconify } from '@/components/iconify';
import type { TextAlignment } from '@/types';
import { Block } from './block';

interface Props {
  title: string;
  value: TextAlignment;
  onChange: (value: TextAlignment) => void;
}

// TODO: check its repeated as TextAlignmentEditorSetting
export function TextAlignmentSetting({ title, value, onChange }: Props) {
  const options: { value: TextAlignment; icon: string; title: string }[] = [
    {
      title: 'Left',
      value: 'left',
      icon: 'ic:round-format-align-left',
    },
    {
      title: 'Center',
      value: 'center',
      icon: 'ic:round-format-align-center',
    },
    {
      title: 'Right',
      value: 'right',
      icon: 'ic:round-format-align-right',
    },
    {
      title: 'Justify',
      value: 'justify',
      icon: 'ic:round-format-align-justify',
    },
  ];

  return (
    <Block badge title={title} control>
      <ToggleButtonGroup
        value={value}
        exclusive
        size="small"
        fullWidth
        onChange={(_, a) => a && onChange(a)}>
        {options.map((o) => (
          <ToggleButton key={o.value} value={o.value} title={o.title}>
            <Iconify icon={o.icon} />
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Block>
  );
}
