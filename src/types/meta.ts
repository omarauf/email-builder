export interface Meta {
  subject: string;
  preheader: string;
  emailAnnotations: {
    enable: boolean;
    offerBadge?: string;
    promoCode?: string;
    senderLogo?: string;
    promoImage?: string;
    endOfOffer?: string;
  };
  utmParameters: {
    enable: boolean;
    source?: string;
    medium?: string;
    campaign?: string;
    term?: string;
    content?: string;
    custom: { name: string; value: string }[];
  };
}
