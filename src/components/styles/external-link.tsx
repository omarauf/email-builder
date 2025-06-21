import { Stack, IconButton, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Iconify } from '@/components/iconify';
import { XField } from '@/components/input';
import { Block } from './block';

interface Props {
  title?: string;
  value: string | undefined;
  onChange: (v: string | undefined) => void;
}

const isValidLink = (link: string) => {
  const linkRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  return linkRegex.test(link);
};

export function ExternalLink({ title, value, onChange }: Props) {
  const show = value !== undefined;

  const handleClick = (_: React.MouseEvent<HTMLDivElement>) => {
    if (value) {
      onChange(undefined);
    } else {
      onChange('https://');
    }
  };

  const handleChange = (v: string) => {
    onChange(v);
  };

  return (
    <Block
      title={title || 'External Link'}
      control={
        <ToggleButtonGroup exclusive size="small" onClick={handleClick} value={value ? 'link' : ''}>
          <ToggleButton key="link" value="link">
            <Iconify icon="ph:link" />
          </ToggleButton>
        </ToggleButtonGroup>
      }>
      {show && (
        <Stack direction="row" spacing={2}>
          <XField.Text
            value={value || ''}
            size="small"
            placeholder="Enter URL here"
            onChange={handleChange}
            sx={{ p: 0 }}
          />
          <IconButton disabled={!isValidLink(value)} onClick={() => window.open(value, '_blank')}>
            <Iconify icon="majesticons:open" />
          </IconButton>
        </Stack>
      )}
    </Block>
  );
}
