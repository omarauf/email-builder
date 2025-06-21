import type { Theme, SxProps } from '@mui/material';
import { Box, Stack, Popover } from '@mui/material';
import { isLight } from '@/utils/color';
import { useState, useEffect, useCallback } from 'react';
import { usePattern } from './use-pattern';
import { ColorPicker } from './color-picker';

export interface SingleColorPickerProps {
  value: string;
  onChange: (value: string) => void;
  preset?: string[];
  sx?: SxProps<Theme>;
  buttonSx?: SxProps<Theme>;
}

export function SingleColorPicker({
  value,
  preset,
  sx,
  buttonSx,
  onChange,
}: SingleColorPickerProps) {
  const [innerValue, setInnerValue] = useState(value);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleClick = useCallback(
    (event: React.MouseEvent<any>) => setAnchorEl(event.currentTarget),
    []
  );
  const handleClose = useCallback(() => setAnchorEl(null), []);
  const showPicker = Boolean(anchorEl);

  const pattern = usePattern();

  useEffect(() => setInnerValue(value), [value]);

  return (
    <Stack sx={sx}>
      <Box onClick={handleClick}>
        <Box
          sx={{
            padding: '5px',
            borderRadius: 1,
            width: 100,
            textAlign: 'center',
            boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
            display: 'inline-block',
            cursor: 'pointer',
            ...(innerValue === 'transparent'
              ? {
                  backgroundImage: pattern,
                  backgroundSize: '20px 20px',
                  backgroundPosition: '0 0,10px 10px',
                  color: 'transparent',
                }
              : {
                  background: innerValue,
                  color: isLight(innerValue) ? 'black' : 'white',
                }),
            ...buttonSx,
          }}>
          {innerValue}
        </Box>
      </Box>

      <Popover
        open={showPicker}
        anchorEl={anchorEl}
        disablePortal
        onClose={handleClose}
        sx={{ mt: 1 }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}>
        <ColorPicker
          innerValue={innerValue}
          onChange={onChange}
          setInnerValue={setInnerValue}
          preset={preset}
        />
      </Popover>
    </Stack>
  );
}
