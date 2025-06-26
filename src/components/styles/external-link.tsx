import { Iconify } from '@/components/iconify';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Block } from './block';
import { Input } from '../ui/input';

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

  const handleClick = () => {
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
        <ToggleGroup
          type="single"
          className="gap-0"
          value={value ? 'link' : ''}
          onValueChange={handleClick}>
          <ToggleGroupItem value="link" aria-label="Toggle link">
            <Iconify icon="ph:link" />
          </ToggleGroupItem>
        </ToggleGroup>
      }>
      {show && (
        <div className="flex flex-row items-center gap-2">
          <Input
            value={value || ''}
            placeholder="Enter URL here"
            onChange={(e) => handleChange(e.target.value)}
          />
          <Button
            variant="ghost"
            size="icon"
            disabled={!isValidLink(value)}
            onClick={() => window.open(value, '_blank')}>
            <Iconify icon="majesticons:open" />
          </Button>
        </div>
      )}
    </Block>
  );
}
