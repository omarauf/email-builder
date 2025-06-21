import type { CSSProperties } from 'react';
import { converter } from '@/utils/converter';
import type { BlockImage } from './type';

export function useImageStyle(imageBlock: BlockImage, screen: 'mobile' | 'desktop') {
  const { style, data } = imageBlock;
  const { sizeType } = data;
  const { align, height, padding, width, responsive, borderRadius } = style;

  const imageWrapperStyle: CSSProperties = {
    padding: converter.inset(padding?.[screen] || padding?.desktop, 'px'),
    display: 'flex',
    justifyContent: align?.[screen],
  };

  const imageStyle: CSSProperties = {
    borderRadius: converter.inset(borderRadius, 'px'),
    width: sizeType === 'width' ? `${width?.[screen]}px` : 'auto',
    height: sizeType === 'height' ? `${height?.[screen]}px` : 'auto',
  };

  if (responsive === false && screen === 'mobile') {
    imageStyle.width = `${width?.mobile}px`;
  }

  return { imageWrapperStyle, imageStyle };
}
