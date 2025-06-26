import { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { isLight } from '@/utils/color';
import { usePattern } from './use-pattern';
import { ColorPickerPopover } from './color-picker-popover';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

interface Props {
  value: string;
  onChange: (value: string) => void;
  preset?: string[];
  className?: string;
}

export function ColorPicker({ value, preset, onChange, className }: Props) {
  const [innerValue, setInnerValue] = useState(value);
  const [open, setOpen] = useState(false);

  const pattern = usePattern();

  useEffect(() => setInnerValue(value), [value]);

  const handleButtonClick = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn('h-9 w-24 rounded-md border', className)}
          style={{
            cursor: 'pointer',
            ...(innerValue.toLocaleLowerCase() === 'transparent'
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
          }}
          onClick={handleButtonClick}>
          {innerValue}
        </button>
      </PopoverTrigger>

      <PopoverContent className="mt-2 w-fit p-0" onInteractOutside={handleClose}>
        <ColorPickerPopover
          innerValue={innerValue}
          onChange={onChange}
          setInnerValue={setInnerValue}
          preset={preset}
        />
      </PopoverContent>
    </Popover>
  );
}
