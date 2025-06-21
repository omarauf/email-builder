import type { CardProps } from '@mui/material';
import { Box, Card, Skeleton, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { fDate } from '@/utils/format-time';
import { emailTemplateThumbnail } from '@/utils/thumbnail';

type Prop = CardProps & {
  name?: string;
  date?: string;
  html: string;
  thumbnail?: undefined;
};

export function EmailTemplateCard({ name, date, html, thumbnail, sx, onClick, ...other }: Prop) {
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

  const showBox = !!name || !!date;

  return (
    <Card
      sx={{
        width: 200,
        height: 300,
        boxShadow: 1,
        '&:hover': { boxShadow: 10 },
        backgroundColor: 'white',
        ...sx,
      }}
      {...other}>
      {loading && <Skeleton variant="rounded" height={300} />}

      {!loading && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: 1,
            height: 1,
            cursor: onClick ? 'pointer' : 'default',
          }}
          onClick={onClick}>
          <Box
            component="img"
            src={thumbnailSrc}
            sx={{ width: 1, height: 'fit-content', objectFit: 'cover' }}
          />

          {showBox && (
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                p: 1,
                m: 2,
                textAlign: 'center',
                bgcolor: 'background.paper',
                borderRadius: 1,
              }}>
              {name && <Typography variant="body2">{name}</Typography>}
              {date && <Typography variant="caption">{fDate(date)}</Typography>}
            </Box>
          )}
        </Box>
      )}
    </Card>
  );
}
