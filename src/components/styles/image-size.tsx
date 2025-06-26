import { useCallback } from 'react';
import { Iconify } from '@/components/iconify';
import { getImageDimension } from '@/utils/image';
import { Block } from './block';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { XToggleButtonGroup } from '../x-common';

interface Props {
  title: string;
  maxWidth: number;
  sizeType: 'width' | 'height';
  originalWidth: number;
  originalHeight: number;
  width?: number;
  height?: number;
  onChangeType: (type: 'width' | 'height') => void;
  onChangeValue: (type: 'width' | 'height', value: number) => void;
}

export function ImageSize(props: Props) {
  const {
    title,
    maxWidth,
    originalHeight,
    originalWidth,
    sizeType,
    height,
    width,
    onChangeValue,
    onChangeType,
  } = props;

  const { imageAspectRatio, heightValue, maxHeight, widthValue } = getImageDimension(
    width,
    height,
    originalWidth,
    originalHeight,
    maxWidth
  );

  const max = sizeType === 'width' ? maxWidth : maxHeight;
  const value = sizeType === 'width' ? widthValue : heightValue;

  const fitToAll = useCallback(() => {
    onChangeValue('width', maxWidth);
    onChangeValue('height', maxHeight);
  }, [maxHeight, maxWidth, onChangeValue]);

  return (
    <Block badge title={title}>
      <Button size="icon" variant="outline" onClick={() => fitToAll()}>
        <Iconify icon="fluent:scale-fit-16-regular" />
      </Button>

      <XToggleButtonGroup
        type="single"
        value={sizeType}
        onChange={onChangeType}
        buttons={[
          { value: 'width', icon: 'material-symbols:width' },
          { value: 'height', icon: 'material-symbols:height' },
        ]}
      />

      <Input
        value={value}
        max={max}
        type="number"
        onChange={(e) => {
          const v = e.target.valueAsNumber;
          if (sizeType === 'width') {
            onChangeValue('height', Math.round(v / imageAspectRatio));
            onChangeValue('width', Math.round(v));
          } else {
            onChangeValue('height', Math.round(v));
            onChangeValue('width', Math.round(v * imageAspectRatio));
          }
        }}
        className="w-24"
      />
    </Block>
  );
}
