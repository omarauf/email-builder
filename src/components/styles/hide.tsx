import { XField } from '@/components/input';
import { Box, Alert } from '@mui/material';
import type { Visibility } from '@/types';
import { useBuilderStore } from '@/hooks/use-builder-store';
import { Block, blockStyle } from './block';

interface Props {
  value?: Visibility;
  onChange: (v: Visibility) => void;
}

export function Hide({ value, onChange }: Props) {
  const screen = useBuilderStore((s) => s.screen);

  const otherScreen = screen === 'mobile' ? 'desktop' : 'mobile';

  const isOtherHidden = value?.[otherScreen] === true;

  // make this function to change the value of the visibility
  // both mobile and desktop cannot be true at the same time
  // if mobile is true then desktop should be false and vice versa
  // both values should can be false
  const handleChange = (v: boolean) => {
    const updatedValue = value === undefined ? { mobile: false, desktop: false } : { ...value };

    if (screen === 'mobile') {
      updatedValue.mobile = v;
      if (v) updatedValue.desktop = false; // If mobile is true, desktop must be false
    } else if (screen === 'desktop') {
      updatedValue.desktop = v;
      if (v) updatedValue.mobile = false; // If desktop is true, mobile must be false
    }

    onChange(updatedValue);
  };

  return (
    <>
      {isOtherHidden && (
        <Box sx={blockStyle}>
          <Alert variant="outlined" severity="info">
            The element already hidden on {otherScreen}. Activating this option you turning off
            hidden state for {otherScreen}.
          </Alert>
        </Box>
      )}
      <Block badge title={`Hide ${screen}`} sx={{ pt: isOtherHidden ? 0 : blockStyle.py }}>
        <XField.Switch value={value?.[screen] || false} onChange={handleChange} />
      </Block>
    </>
  );
}
