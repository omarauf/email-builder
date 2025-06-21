import type { HeadingType, HeadingStyle, GlobalHeadingStyle } from './type';

export const defaultGlobalHeadingStyle: () => GlobalHeadingStyle = () => ({
  fontFamily: 'Arial',
  letterSpacing: { value: 0, unit: 'px' },
  bottomSpaceEnabled: false,
  h1: defaultHeadingStyle('h1'),
  h2: defaultHeadingStyle('h2'),
  h3: defaultHeadingStyle('h3'),
  h4: defaultHeadingStyle('h4'),
  h5: defaultHeadingStyle('h5'),
  h6: defaultHeadingStyle('h6'),
});

const defaultHeadingStyle = (type: HeadingType, style?: Partial<HeadingStyle>): HeadingStyle => ({
  fontSize: style?.fontSize || {
    desktop: DEFAULT_HEADING_SIZE[type],
    mobile: DEFAULT_HEADING_SIZE[type],
  },
  fontColor: style?.fontColor || '#333333',
  lineHeight: style?.lineHeight || { desktop: 1.5, mobile: 1.5 },
  textStyles: style?.textStyles || [],
  textAlignment: {
    desktop: style?.textAlignment?.desktop || 'left',
    mobile: style?.textAlignment?.mobile || 'left',
  },
  bottomSpace: DEFAULT_HEADING_BOTTOM_SPACE[type],
});

const DEFAULT_HEADING_SIZE = {
  h1: 30,
  h2: 24,
  h3: 20,
  h4: 24,
  h5: 20,
  h6: 16,
};

export const DEFAULT_HEADING_BOTTOM_SPACE = {
  h1: { desktop: 18, mobile: 21 },
  h2: { desktop: 15, mobile: 17 },
  h3: { desktop: 12, mobile: 14 },
  h4: { desktop: 15, mobile: 17 },
  h5: { desktop: 12, mobile: 14 },
  h6: { desktop: 10, mobile: 11 },
};
