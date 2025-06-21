import { Stack } from '@mui/material';
import { Iconify } from '@/components/iconify';
import { useShallow } from 'zustand/react/shallow';
import { menuItems } from '@/layout/menu/menu';
import { useBuilderStore } from '@/hooks/use-builder-store';
import type { BlockImage } from './type';
import type { StripeType } from '../stripe/type';
import type { BlockIndex } from '../block/type';
import { useImageStyle } from './style';

type Prop = BlockImage & {
  stripeType: StripeType;
  idx: BlockIndex;
};

export function ImageBlock({ stripeType, ...block }: Prop) {
  const [screen] = useBuilderStore(useShallow((s) => [s.screen]));

  const { data } = block;
  const { src, alt, link, image } = data;

  const { imageStyle, imageWrapperStyle } = useImageStyle(block, screen);

  if (!src || !image) {
    const imageItem = menuItems.find((item) => item.type === 'block' && item.blockType === 'image');

    if (!imageItem) throw new Error('Image block not found');

    return {
      element: (
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{
            width: 1,
            height: 92,
            background: 'rgb(250, 250, 250)',
            borderRadius: 0.5,
            border: '1px solid',
            borderColor: 'rgb(237, 237, 237)',
          }}>
          <Iconify icon={imageItem.icon} />
        </Stack>
      ),
      style: {},
    };
  }

  const imageElement = <img alt={alt} src={src} style={imageStyle} />;

  return {
    element: (
      <div style={imageWrapperStyle}>
        {link ? (
          <a href={link} target="_blank" rel="noreferrer" onClick={(e) => e.preventDefault()}>
            {imageElement}
          </a>
        ) : (
          imageElement
        )}
      </div>
    ),
    style: {},
  };
}
