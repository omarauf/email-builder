import type { CSSProperties } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { Iconify } from '@/components/iconify';
import { menuItems } from '@/layout/menu/menu';
import { useBuilderStore } from '@/hooks/use-builder-store';
import type { BlockImage } from './type';
import type { BlockIndex } from '../block/type';
import type { StripeType } from '../stripe/type';
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
        <div className="border-lg flex h-[92px] w-full items-center justify-center rounded border border-[#d4d4d4] bg-[#fafafa]">
          <Iconify icon={imageItem.icon} />
        </div>
      ),
      style: {} as CSSProperties,
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
