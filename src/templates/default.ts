import { v4 as uuidv4 } from 'uuid';
import { defaultGlobalStripeStyle } from '@/styles/stripe/blueprint';
import { defaultGlobalHeadingStyle } from '@/styles/heading/blueprint';
import type { Meta } from '../types';
import type { Styles } from '../styles/type';
import type { Tree } from '../nodes/tree/type';
import { defaultStripe } from '../nodes/stripe/blueprint';
import { defaultStructure } from '../nodes/structure/blueprint';
import { defaultContainer } from '../nodes/container/blueprint';

const styles: Styles = {
  general: {
    backgroundColor: '#464646',
    width: 600,
    alignment: 'center',
    rtl: false,
    list: { indent: 40, itemsBottomSpace: 15, marginY: 15, mark: 'disc', color: '#333333' },
    structurePadding: {
      desktop: [20, 20, 0, 20],
      mobile: [20, 20, 0, 20],
    },
    margin: {
      desktop: [0, 0, 0, 0],
      mobile: [0, 0, 0, 0],
    },
  },
  stripe: defaultGlobalStripeStyle(),
  heading: defaultGlobalHeadingStyle(),
  button: {
    fontFamily: 'Arial',
    fontSize: { desktop: 16, mobile: 16 },
    fontColor: '#ffffff',
    textStyles: [],
    letterSpacing: { value: 0, unit: 'px' },
    buttonColor: '#31cb4b',
    border: {
      width: [0, 0, 2, 0],
      style: 'solid',
      color: '#2cb543',
    },
    hover: {
      buttonColor: '#31cb4b',
      fontColor: '#ffffff',
      borderColor: '#2cb543',
    },
    borderRadius: [30, 30, 30, 30],
    padding: {
      desktop: [10, 20, 10, 20],
      mobile: [10, 20, 10, 20],
    },
    fullWidth: { desktop: false, mobile: false },
  },
};

const tree: Tree = {
  id: 'root',
  type: 'root',
  children: [
    defaultStripe({
      id: uuidv4(),
      data: { stripeType: 'header' },
      style: {},
      children: [
        defaultStructure({
          id: uuidv4(),
          style: {},
          children: [
            defaultContainer({
              id: uuidv4(),
              style: { width: 272 },
              children: [],
            }),
            defaultContainer({
              id: uuidv4(),
              style: { width: 272 },
              children: [],
            }),
          ],
        }),
      ],
    }),

    defaultStripe({
      id: uuidv4(),
      data: { stripeType: 'content' },
      style: {},
      children: [
        defaultStructure({
          id: uuidv4(),
          style: {},
          children: [
            defaultContainer({
              id: uuidv4(),
              style: { width: 560 },
              children: [],
            }),
          ],
        }),
        defaultStructure({
          id: uuidv4(),
          style: {},
          children: [
            defaultContainer({
              id: uuidv4(),
              style: { width: 272 },
              children: [],
            }),

            defaultContainer({
              id: uuidv4(),
              style: { width: 272 },
              children: [],
            }),
          ],
        }),
      ],
    }),
  ],
};

const meta: Meta = {
  subject: '',
  preheader: '',
  emailAnnotations: {
    enable: false,
    offerBadge: undefined,
    promoCode: undefined,
    senderLogo: undefined,
    promoImage: undefined,
    endOfOffer: undefined,
  },
  utmParameters: {
    enable: false,
    custom: [],
  },
};

export { tree, meta, styles };
