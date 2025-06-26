import type { ImageMetaData } from '@/types';
import { cn } from '@/lib/utils';
import { fSize } from '@/utils/format-number';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import { blockStyle } from './block';

interface Props {
  src: string;
  alt?: string;
  metaData: ImageMetaData;
  onChange: VoidFunction;
  className?: string;
}

export function ImageChanger({ src, alt, metaData, className, onChange }: Props) {
  return (
    <div className={cn('flex gap-4', blockStyle.px, blockStyle.py, className)}>
      <img
        src={src}
        alt={alt}
        style={{
          width: 120,
          aspectRatio: 1,
          borderRadius: 1,
          backgroundPosition: '0 0, 10px 10px',
          backgroundSize: '20px 20px',
          objectFit: 'contain',
          backgroundImage:
            'linear-gradient(45deg, rgba(0, 0, 0, 0.07) 25%, rgba(0, 0, 0, 0) 0px, rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 0.07) 0px), linear-gradient(45deg, rgba(0, 0, 0, 0.07) 25%, rgba(0, 0, 0, 0) 0px, rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 0.07) 0px)',
          boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.1)',
        }}
      />

      <div className="flex flex-col">
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="w-[200px] truncate">{metaData.name}</span>
          </TooltipTrigger>
          <TooltipContent>{metaData.name}</TooltipContent>
        </Tooltip>

        <p className="text-sm">
          {metaData.width} x {metaData.height} px
        </p>

        {metaData.size !== 0 && <p className="text-sm">{fSize(metaData.size)}</p>}

        <div className="flex-grow" />

        <Button variant="outline" onClick={onChange}>
          Change Image
        </Button>
      </div>
    </div>
  );
}
