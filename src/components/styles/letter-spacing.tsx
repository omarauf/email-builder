import { Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { XField } from '@/components/input';
import { Block } from './block';

interface Props {
  unit: string;
  value: number;
  onValueChange: (value: number) => void;
  onUnitChange: (value: 'px' | 'em') => void;
}

export function LetterSpacing({ unit, value, onValueChange, onUnitChange }: Props) {
  return (
    <Block title="Letter Spacing">
      <Stack direction="row" spacing={1} alignItems="center">
        <XField.Number
          size="small"
          value={value}
          onChange={onValueChange}
          sx={{ width: 120 }}
          steps={1}
        />
        <ToggleButtonGroup
          value={unit}
          sx={{ width: 100 }}
          exclusive
          size="small"
          fullWidth
          onChange={(_, a) => a && onUnitChange(a)}>
          <ToggleButton value="px">px</ToggleButton>

          <ToggleButton value="em">em</ToggleButton>
        </ToggleButtonGroup>
      </Stack>
    </Block>
  );
}
