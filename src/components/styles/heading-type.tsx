import { Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import type { TextType } from '@/nodes/block-text/type';
import { TextTypeOptions } from '@/constant/heading';
import { Block } from './block';

interface Props {
  value: TextType;
  onChange: (value: TextType) => void;
}

export function HeadingTypeSetting({ value, onChange }: Props) {
  return (
    <Block title="Heading Type" control>
      <Stack direction="row" spacing={1} width={1}>
        <ToggleButtonGroup
          value={value}
          exclusive
          size="small"
          fullWidth
          onChange={(_, a) => a && onChange(a)}>
          {TextTypeOptions.map((o) => (
            <ToggleButton key={o} value={o}>
              {o}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Stack>
    </Block>
  );
}
