import type { Tree } from '../nodes/tree/type';
import type { Styles } from '../styles/type';
import type { Meta } from '../types';

const styles: Styles = {
  general: {
    backgroundColor: '#de568a',
    width: 600,
    alignment: 'center',
    rtl: false,
    list: {
      indent: 40,
      itemsBottomSpace: 15,
      marginY: 15,
      mark: 'disc',
      color: '#333333',
    },
    structurePadding: {
      desktop: [35, 20, 0, 20],
      mobile: [20, 20, 0, 20],
    },
    margin: {
      desktop: [0, 0, 0, 0],
      mobile: [0, 0, 0, 0],
    },
  },
  stripe: {
    fontFamily: 'Courier New',
    lineHeight: {
      desktop: 1.5,
      mobile: 1.5,
    },
    letterSpacing: {
      value: 1,
      unit: 'px',
    },
    header: {
      stripeBackgroundColor: undefined,
      contentBackgroundColor: '#ffffff',
      fontSize: {
        desktop: 20,
        mobile: 14,
      },
      fontColor: '#1c9d26',
      linkColor: '#84da26',
      linkHoverColor: '#1376c8',
      bottomSpace: undefined,
    },
    content: {
      stripeBackgroundColor: undefined,
      contentBackgroundColor: '#ffffff',
      fontSize: {
        desktop: 20,
        mobile: 14,
      },
      fontColor: '#d7ac06',
      linkColor: '#61c4f1',
      linkHoverColor: '#f7104f',
      bottomSpace: undefined,
    },
    footer: {
      stripeBackgroundColor: undefined,
      contentBackgroundColor: '#ffffff',
      fontSize: {
        desktop: 14,
        mobile: 14,
      },
      fontColor: '#333333',
      linkColor: '#1376c8',
      linkHoverColor: '#1376c8',
      bottomSpace: undefined,
    },
    infoArea: {
      stripeBackgroundColor: undefined,
      contentBackgroundColor: '#ffffff',
      fontSize: {
        desktop: 14,
        mobile: 14,
      },
      fontColor: '#333333',
      linkColor: '#1376c8',
      linkHoverColor: '#1376c8',
      bottomSpace: undefined,
    },
  },
  heading: {
    fontFamily: 'Arial',
    letterSpacing: {
      value: 0,
      unit: 'px',
    },
    bottomSpaceEnabled: false,
    h1: {
      fontSize: {
        desktop: 32,
        mobile: 30,
      },
      fontColor: '#b34de6',
      lineHeight: {
        desktop: 1.5,
        mobile: 1.5,
      },
      textStyles: ['italic', 'bold'],
      textAlignment: {
        desktop: 'right',
        mobile: 'left',
      },
      bottomSpace: {
        desktop: 18,
        mobile: 21,
      },
    },
    h2: {
      fontSize: {
        desktop: 24,
        mobile: 24,
      },
      fontColor: '#333333',
      lineHeight: {
        desktop: 1.5,
        mobile: 1.5,
      },
      textStyles: [],
      textAlignment: {
        desktop: 'left',
        mobile: 'left',
      },
      bottomSpace: {
        desktop: 15,
        mobile: 17,
      },
    },
    h3: {
      fontSize: {
        desktop: 20,
        mobile: 20,
      },
      fontColor: '#333333',
      lineHeight: {
        desktop: 1.5,
        mobile: 1.5,
      },
      textStyles: [],
      textAlignment: {
        desktop: 'left',
        mobile: 'left',
      },
      bottomSpace: {
        desktop: 12,
        mobile: 14,
      },
    },
    h4: {
      fontSize: {
        desktop: 24,
        mobile: 24,
      },
      fontColor: '#333333',
      lineHeight: {
        desktop: 1.5,
        mobile: 1.5,
      },
      textStyles: [],
      textAlignment: {
        desktop: 'left',
        mobile: 'left',
      },
      bottomSpace: {
        desktop: 15,
        mobile: 17,
      },
    },
    h5: {
      fontSize: {
        desktop: 20,
        mobile: 20,
      },
      fontColor: '#333333',
      lineHeight: {
        desktop: 1.5,
        mobile: 1.5,
      },
      textStyles: [],
      textAlignment: {
        desktop: 'left',
        mobile: 'left',
      },
      bottomSpace: {
        desktop: 12,
        mobile: 14,
      },
    },
    h6: {
      fontSize: {
        desktop: 16,
        mobile: 16,
      },
      fontColor: '#333333',
      lineHeight: {
        desktop: 1.5,
        mobile: 1.5,
      },
      textStyles: [],
      textAlignment: {
        desktop: 'left',
        mobile: 'left',
      },
      bottomSpace: {
        desktop: 10,
        mobile: 11,
      },
    },
  },
  button: {
    fontFamily: 'Arial',
    fontSize: {
      desktop: 16,
      mobile: 16,
    },
    fontColor: '#ffffff',
    textStyles: [],
    letterSpacing: {
      value: 0,
      unit: 'px',
    },
    buttonColor: '#31cb4b',
    border: {
      width: [2, 2, 2, 2],
      style: 'solid',
      color: '#d60417',
    },
    hover: {
      borderColor: undefined,
      fontColor: undefined,
      buttonColor: '#cb316a',
    },
    borderRadius: [12, 12, 12, 12],
    padding: {
      desktop: [10, 20, 10, 20],
      mobile: [10, 20, 10, 20],
    },
    fullWidth: {
      desktop: false,
      mobile: false,
    },
  },
};

const tree: Tree = {
  id: 'root',
  type: 'root',
  children: [
    {
      id: 'f86dc3e6-ad03-4d09-9bb1-08614bd2f054',
      type: 'stripe',
      style: {
        backgroundColor: undefined,
        contentBackColor: undefined,
        border: {
          color: '#000000',
          style: 'solid',
          width: [0, 0, 0, 0],
        },
        backgroundImage: undefined,
      },
      data: {
        stripeType: 'header',
        hide: {
          desktop: false,
          mobile: false,
        },
      },
      children: [
        {
          id: '2761e892-f607-4b62-a3f5-698a07acccdb',
          type: 'structure',
          style: {
            borderRadius: [0, 0, 0, 0],
            backgroundColor: undefined,
            gap: {
              desktop: 16,
              mobile: 0,
            },
            padding: {
              desktop: undefined,
              mobile: undefined,
            },
            backgroundImage: undefined,
            responsive: true,
          },
          data: {
            hide: {
              desktop: false,
              mobile: false,
            },
          },
          children: [
            {
              id: 'edb0f253-a9e1-4501-a303-e814741b4b05',
              type: 'container',
              style: {
                width: 560,
                padding: {
                  desktop: undefined,
                  mobile: undefined,
                },
                backgroundColor: undefined,
                border: {
                  color: '#000000',
                  style: 'solid',
                  width: [0, 0, 0, 0],
                },
                borderRadius: [0, 0, 0, 0],
              },
              data: {
                widthLocked: false,
                hide: {
                  desktop: false,
                  mobile: false,
                },
              },
              children: [
                {
                  id: '5bba2f26-bbb2-484b-87dd-81242456f972',
                  type: 'block',
                  blockType: 'divider',
                  data: {
                    hide: {
                      desktop: false,
                      mobile: false,
                    },
                  },
                  style: {
                    blockBackgroundColor: undefined,
                    padding: {
                      desktop: [20, 20, 20, 20],
                      mobile: [20, 20, 20, 20],
                    },
                    alignment: {
                      desktop: 'center',
                      mobile: 'center',
                    },
                    border: 1,
                    borderColor: '#000000',
                    borderStyle: 'solid',
                    width: {
                      desktop: 100,
                      mobile: 100,
                    },
                    widthUnit: {
                      desktop: '%',
                      mobile: '%',
                    },
                  },
                },
              ],
            },
          ],
        },
        {
          id: 'eaa879c3-3743-45d8-9397-99032e7a32cc',
          type: 'structure',
          style: {
            borderRadius: [0, 0, 0, 0],
            backgroundColor: undefined,
            gap: {
              desktop: 16,
              mobile: 0,
            },
            padding: {
              desktop: [20, 20, 20, 20],
              mobile: undefined,
            },
            backgroundImage: undefined,
            responsive: true,
          },
          data: {
            hide: {
              desktop: false,
              mobile: false,
            },
          },
          children: [
            {
              id: 'bc041631-85ba-4e59-8d09-2de908aacfe4',
              type: 'container',
              style: {
                width: 560,
                padding: {
                  desktop: undefined,
                  mobile: undefined,
                },
                backgroundColor: undefined,
                border: {
                  color: '#000000',
                  style: 'solid',
                  width: [0, 0, 0, 0],
                },
                borderRadius: [0, 0, 0, 0],
              },
              data: {
                widthLocked: false,
                hide: {
                  desktop: false,
                  mobile: false,
                },
              },
              children: [
                {
                  id: 'faf62447-bc9a-4e22-8006-9d86788c3eb2',
                  type: 'block',
                  blockType: 'text',
                  data: {
                    text: '<p>Text ONE TWO THREE</p>',
                    hide: {
                      desktop: false,
                      mobile: false,
                    },
                  },
                  style: {
                    padding: {
                      desktop: undefined,
                      mobile: undefined,
                    },
                    blockBackgroundColor: undefined,
                    textAlignment: {
                      desktop: 'center',
                      mobile: undefined,
                    },
                  },
                },
                {
                  id: '01cdc61e-ecc1-4676-959f-cd62e181482d',
                  type: 'block',
                  blockType: 'image',
                  data: {
                    src: 'https://x-media-mapper.s3.amazonaws.com/algorithmx-shop%2Fmedia%2Ftest%24%25.jpg',
                    alt: '',
                    hide: {
                      desktop: false,
                      mobile: false,
                    },
                    sizeType: 'width',
                    image: {
                      name: 'algorithmx-shop%2Fmedia%2Ftest%24%25.jpg',
                      width: 300,
                      height: 300,
                      size: 0,
                    },
                  },
                  style: {
                    blockBackgroundColor: undefined,
                    padding: {
                      desktop: undefined,
                      mobile: undefined,
                    },
                    align: {
                      desktop: 'center',
                      mobile: 'center',
                    },
                    borderRadius: [0, 0, 0, 0],
                    width: {
                      desktop: 300,
                      mobile: 300,
                    },
                    height: {
                      desktop: undefined,
                      mobile: undefined,
                    },
                    responsive: true,
                  },
                },
                {
                  id: 'e207481c-c07d-4b4f-840b-0212ea7b8302',
                  type: 'block',
                  blockType: 'spacer',
                  data: {
                    hide: {
                      desktop: false,
                      mobile: false,
                    },
                  },
                  style: { height: { desktop: 228, mobile: 40 } },
                },
                {
                  id: '1e6d98d7-b3bb-4988-b8d7-37a22b0a54dd',
                  type: 'block',
                  blockType: 'text',
                  data: {
                    text: '<p>Text</p>',
                    hide: {
                      desktop: false,
                      mobile: false,
                    },
                  },
                  style: {
                    padding: {
                      desktop: undefined,
                      mobile: undefined,
                    },
                    blockBackgroundColor: undefined,
                    textAlignment: {
                      desktop: undefined,
                      mobile: undefined,
                    },
                  },
                },
                {
                  id: '3f8e8679-328b-4223-8aec-d2895926e6e6',
                  type: 'block',
                  blockType: 'image',
                  data: {
                    src: 'https://x-media-mapper.s3.amazonaws.com/algorithmx-shop%2Fmedia%2FWhatsApp+Image+2025-05-23+at+17.36.18.jpeg',
                    alt: '',
                    hide: {
                      desktop: false,
                      mobile: false,
                    },
                    sizeType: 'width',
                    image: {
                      name: 'algorithmx-shop%2Fmedia%2FWhatsApp+Image+2025-05-23+at+17.36.18.jpeg',
                      width: 965,
                      height: 681,
                      size: 0,
                    },
                    link: undefined,
                  },
                  style: {
                    blockBackgroundColor: undefined,
                    padding: {
                      desktop: [0, 0, 0, 0],
                      mobile: undefined,
                    },
                    align: {
                      desktop: 'right',
                      mobile: 'left',
                    },
                    borderRadius: [14, 14, 14, 14],
                    width: {
                      desktop: 560,
                      mobile: 340,
                    },
                    height: {
                      desktop: 395,
                      mobile: 240,
                    },
                    responsive: false,
                  },
                },
              ],
            },
          ],
        },
      ],
    },
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
