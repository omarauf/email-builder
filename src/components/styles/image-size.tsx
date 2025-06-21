import { XField } from '@/components/input';
import { useCallback } from 'react';
import { IconButton, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Iconify } from '@/components/iconify';
import { getImageDimension } from '@/utils/image';
import { Block } from './block';

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
      <IconButton onClick={() => fitToAll()}>
        <Iconify icon="fluent:scale-fit-16-regular" />
      </IconButton>

      <ToggleButtonGroup
        exclusive
        size="small"
        value={sizeType}
        onChange={(_, v) => {
          if (v === null || v === sizeType) return;
          onChangeType(v);
        }}>
        <ToggleButton key="width" value="width">
          <Iconify icon="material-symbols:width" />
        </ToggleButton>
        <ToggleButton key="height" value="height">
          <Iconify icon="material-symbols:height" />
        </ToggleButton>
      </ToggleButtonGroup>
      <XField.Number
        value={value}
        max={max}
        size="small"
        onChange={(v) => {
          if (sizeType === 'width') {
            onChangeValue('height', Math.round(v / imageAspectRatio));
            onChangeValue('width', Math.round(v));
          } else {
            onChangeValue('height', Math.round(v));
            onChangeValue('width', Math.round(v * imageAspectRatio));
          }
        }}
        sx={{ width: 120 }}
      />
    </Block>
  );
}
