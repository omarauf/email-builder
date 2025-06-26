import { Hide } from './hide';
import { Block } from './block';
import { Color } from './color';
import { BorderSetting } from './border';
import { ImageSize } from './image-size';
import { LineHeight } from './line-height';
import { TextStyles } from './text-styles';
import { BottomSpace } from './bottom-space';
import { FontSizeSetting } from './font-size';
import { AlignmentSetting } from './alignment';
import { ButtonHeight } from './button-height';
import { ExternalLink } from './external-link';
import { ImageChanger } from './image-changer';
import { LetterSpacing } from './letter-spacing';
import { MarginPadding } from './margin-padding';
import { FontFamilySetting } from './font-family';
import { ButtonHoverSetting } from './button-hover';
import { HeadingTypeSetting } from './heading-type';
import { StructureLayout } from './structure-layout';
import { BorderRadiusSetting } from './border-radius';
import { TextAlignmentSetting } from './text-alignment';
import { ImageBackgroundSetting } from './image-background';
import { MarginPaddingMinimal } from './margin-padding-minimal';

export { blockStyle } from './block';

export const StyleComponent = {
  Alignment: AlignmentSetting,
  Block,
  BorderRadius: BorderRadiusSetting,
  Border: BorderSetting,
  BottomSpace,
  ButtonHeight,
  ButtonHover: ButtonHoverSetting,
  Color,
  Hide,
  ExternalLink,
  FontFamily: FontFamilySetting,
  FontSize: FontSizeSetting,
  HeadingType: HeadingTypeSetting,
  ImageBackground: ImageBackgroundSetting,
  ImageChanger,
  ImageSize,
  LetterSpacing,
  LineHeight,
  MarginPadding,
  MarginPaddingMinimal,
  StructureLayout,
  TextAlignment: TextAlignmentSetting,
  TextStyles,
};
