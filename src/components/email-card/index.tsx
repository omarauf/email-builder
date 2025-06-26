import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { emailTemplateThumbnail } from '@/utils/thumbnail';
import { Skeleton } from '../ui/skeleton';

interface Prop {
  name?: string;
  html: string;
  thumbnail?: undefined;
  onClick?: VoidFunction;
}

export function EmailTemplateCard({ name, html, thumbnail, onClick, ...other }: Prop) {
  const [loading, setLoading] = useState(html !== undefined);
  const [thumbnailSrc, setThumbnailSrc] = useState<string>(thumbnail || '');

  useEffect(() => {
    if (html === undefined) return;

    emailTemplateThumbnail('desktop', html)
      .then((image) => {
        setThumbnailSrc(image);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching email template:', error);
      });
  }, [html]);

  return (
    <div
      className="h-[300px] w-[200px] rounded-2xl bg-white shadow transition-all hover:shadow-xl"
      {...other}>
      {loading && <Skeleton className="h-[300px]" />}

      {!loading && (
        <div
          aria-hidden="true"
          className={cn(
            'flex h-full w-full items-center',
            onClick ? 'cursor-pointer' : 'cursor-default'
          )}
          onClick={onClick}>
          <img src={thumbnailSrc} className="h-fit w-full object-cover" alt="thumbnail" />

          {name && (
            <div className="bg-muted-foreground absolute right-0 bottom-0 left-0 m-4 rounded-lg p-2 text-center">
              {name && <p className="text-sm">{name}</p>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
