import { Box, Stack, Divider, TextField, Typography } from '@mui/material';
import { useColorPicker } from './use-color-picker';
import { usePattern } from './use-pattern';

const COLOR_OPTIONS = [
  'transparent',
  '#D0021B',
  '#F5A623',
  '#F8E71C',
  '#8B572A',
  '#7ED321',
  '#417505',
  '#BD10E0',
  '#9013FE',
  '#4A90E2',
  '#50E3C2',
  '#B8E986',
  '#000000',
  '#4A4A4A',
  '#9B9B9B',
  '#FFFFFF',
];

interface Props {
  innerValue: string;
  preset?: string[];
  onChange: (value: string) => void;
  setInnerValue: (value: string) => void;
}

export function ColorPicker({
  preset = COLOR_OPTIONS,
  onChange,
  innerValue,
  setInnerValue,
}: Props) {
  const hook = useColorPicker({ onChange, innerValue, setInnerValue });

  const pattern = usePattern();

  return (
    <Stack sx={{ userSelect: 'none', width: 220, p: 1 }}>
      <Box
        ref={hook.saturationRef}
        position="relative"
        height="100%"
        className="saturation"
        sx={{
          background: 'rgb(255, 0, 0)',
          height: 150,
          borderRadius: 0.5,
        }}
        onMouseDown={(e) => hook.handleMouseDown(e, 'saturation')}>
        <Box
          position="absolute"
          sx={{
            inset: 0,
            borderRadius: 0.5,
            background: 'linear-gradient(to right, #fff, rgba(0, 0, 0, 0))',
          }}
        />
        <Box
          position="absolute"
          sx={{
            inset: 0,
            borderRadius: 0.5,
            background: 'linear-gradient(to top, #000, rgba(0, 0, 0, 0))',
          }}
        />

        <Box
          position="absolute"
          component="span"
          ref={hook.saturationSelectorRef}
          sx={{
            top: '100%',
            left: 0,
            width: 8,
            height: 8,
            boxShadow:
              'rgb(255, 255, 255) 0px 0px 0px 1.5px, rgba(0, 0, 0, .3) 0px 0px 1px 1px inset, rgba(0, 0, 0, .4) 0px 0px 1px 2px',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </Box>

      <Box sx={{ height: 8, my: 1.5 }}>
        <Box
          ref={hook.hueRef}
          onMouseDown={(e) => hook.handleMouseDown(e, 'hue')}
          sx={{
            width: '100%',
            height: '100%',
            position: 'relative',
            borderRadius: 0.5,
            background:
              'linear-gradient(to right, hsl(0, 100%, 50%), hsl(60, 100%, 50%), hsl(120, 100%, 50%), hsl(180, 100%, 50%), hsl(240, 100%, 50%), hsl(300, 100%, 50%), hsl(360, 100%, 50%))',
            display: 'flex',
            alignItems: 'center',
          }}>
          <Box
            component="span"
            ref={hook.hueSelectorRef}
            sx={{
              position: 'absolute',
              width: '8px',
              height: '16px',
              borderRadius: '4px',
              bgcolor: 'text.primary',
            }}
          />
        </Box>
      </Box>

      <Stack direction="row" spacing={1}>
        <Stack sx={{ width: '34%' }} alignItems="center">
          <TextField
            inputRef={hook.inputHexRef}
            size="small"
            variant="standard"
            autoComplete="off"
            onChange={hook.handleHexInput}
            inputProps={{ sx: { fontSize: 12, textAlign: 'center' } }}
          />

          <Typography variant="caption" sx={{ mt: 0.5 }}>
            Hex
          </Typography>
        </Stack>

        <Stack sx={{ width: '22%' }} alignItems="center">
          <TextField
            inputRef={hook.inputRRef}
            size="small"
            variant="standard"
            autoComplete="off"
            onChange={hook.handleRgbInput('r')}
            inputProps={{ sx: { fontSize: 12, textAlign: 'center' } }}
          />

          <Typography variant="caption" sx={{ mt: 0.5 }}>
            R
          </Typography>
        </Stack>

        <Stack sx={{ width: '22%' }} alignItems="center">
          <TextField
            inputRef={hook.inputGRef}
            size="small"
            variant="standard"
            autoComplete="off"
            onChange={hook.handleRgbInput('g')}
            inputProps={{ sx: { fontSize: 12, textAlign: 'center' } }}
          />

          <Typography variant="caption" sx={{ mt: 0.5 }}>
            G
          </Typography>
        </Stack>

        <Stack sx={{ width: '22%' }} alignItems="center">
          <TextField
            inputRef={hook.inputBRef}
            size="small"
            variant="standard"
            autoComplete="off"
            onChange={hook.handleRgbInput('b')}
            inputProps={{ sx: { fontSize: 12, textAlign: 'center' } }}
          />

          <Typography variant="caption" sx={{ mt: 0.5 }}>
            B
          </Typography>
        </Stack>
      </Stack>

      <Divider sx={{ my: 1 }} />

      <Stack spacing={1} display="grid" gridTemplateColumns="1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr">
        {preset.map((color) => (
          <Box
            key={color}
            onClick={() => hook.handleSelect(color)}
            sx={{
              aspectRatio: '1/1',
              borderRadius: '50%',
              border: '1px solid rgba(0, 0, 0, 0.3)',
              cursor: 'pointer',
              ...(color === 'transparent'
                ? {
                    backgroundImage: pattern,
                    backgroundSize: '20px 20px',
                    backgroundPosition: '0 0,10px 10px',
                    color: 'transparent',
                  }
                : {
                    background: color,
                  }),
            }}
          />
        ))}
      </Stack>
    </Stack>
  );
}
